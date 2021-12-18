var accountId = null;
$(() => {
    accountId = $("#accountId").val();
  // initialize datatable
  let paymentsTable = $("#paymentsTable").DataTable({
    processing: true,
    serverSide: true,
    ajax: $base + `/investor/accounts/${accountId}/payments-dt`,
    lengthChange: true,
    autoWidth: false,
    dom:
      "<'row'<'col-sm-12 col-lg-2'l><'col-sm-12 col-md-6 col-lg-5'B><'col-sm-12 col-md-6 col-lg-5'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    columnDefs: [
      {
        targets: 0,
        render: (data, type, row, meta) => {
          return meta.row + 1 + meta.settings._iDisplayStart + ".";
        },
      },
      { targets: 1, data: 1, visible:false },
      { targets: 2, data: 2 },
      { targets: 3, data: 3 },
      {
        targets: 4,
        data: 4,
        render: (data, type, row, meta) => {
          return data;
        },
      },
      {
        targets: 5,
        data: 5,
        render: (data, type, row, meta) => {
          return data;
        },
      },
      {
        targets: 6,
        data: 6,
        render: (data, type, row, meta) => {
            return data;
        },
      },
      { targets: 7, data: 7 },
      { targets: 8, data: 8,render: (data, type, row, meta) => {
        //console.log(row);
        return formatPayStatus(data);
      }, },
      { targets: 9, data: 9 },
      { targets: 10, data: 10 },
      {
        targets: 11,
        data: 0,
        orderable: false,
        render: (data, type, row, meta) => {
          //console.log(row);
          return '<div class="dropdown f14">'
          + '<button type="button" class="btn px-3" data-toggle="dropdown">'
          + '<i class="fa fa-ellipsis-v"></i>'
          + '</button>'
          + '<div class="dropdown-menu f14">'
          + (row[8] == 'UNPAID' || row[8] == 'NOT_RECEIVED' ? `<a class="dropdown-item pay" href="javascript:void(0)" pid="${row[0]}">Pay</a>` : '')
          
          + `<div class="dropdown-divider"></div>`
          + `<a href="${$base}/investor/payments/${data}" class="dropdown-item" style="min-width: 100px;">View Details</a>`
         
          + '</div>'
          + '</div>';
        },
      },
    ],
  });


  $(document).on("click", '.pay', async(e) => {
      let btn = $(e.currentTarget);
      console.log(btn);
      let id = btn.attr('pid');
    let loader = bootLoaderDialog('Fetching payment...');
    let data = await getPayment(id);
    loader.hide();

    $('#fee').html(data.fee);
    $('#amount').val(formatMoney(data.amount, {}));
    $('#transferBtn').attr('pid', data.id);

    //$('#bankUpdateBtn').attr('rid', rid);

    setTimeout(() => {
        $('#payModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }, 700);
  });

  $('#pay_method').on('change', (e)=>{
    let pay_method = $(e.currentTarget).val();
    if(pay_method==''){
        $('#infoDiv').slideUp();
    }else if(pay_method == 'TRANSFER'){
        $('#infoDiv').slideDown();
    }
  });

  $("#transferBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    let id = btn.attr('pid');
    try {
      let form = $("#payForm")[0];

          $("#fieldset").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating payment status...');
          let url = $base + "/investor/payments/api_payment_by_transfer/"+id;
          $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            success: (response) => {
              if (response.success) {
                notify(response.message, "success");
                form.reset();
                $('#pay_method').val('');
                $('#pay_method').trigger('change');
                paymentsTable.ajax.reload();

                $('#payModal').modal('hide');
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> I have made payments');
              $("#fieldset").prop("disabled", false);
            },
            error: (req, status, err) => {
                let res = req.responseJSON;
                if (req.status == 401) {
                    notify(res.message, 'danger', "Unauthorized");
                } else if (req.status == 400) {
                    let eItems='';
                    console.log(res.error_list);
                    if(res.error_list !=null){
                        eItems = '<ul>';
                        for(let k in res.error_list){
                            eItems += `<li>${k}. ${res.error_list[k]}</li>`;
                        }
                        eItems += '</ul>';
                    }
                    notify(res.message + eItems, 'danger', "Validation Error");
                } else if (req.status == 500) {
                    notify(res.message, 'danger');
                    console.log(res.errorDetail)
                } else {
                    notify('Something went wrong while submitting your request. Please refresh your browser and try again.', 'danger');
                    console.error(req);
                }
                btn.html('<i class="fa fa-check-circle"></i> I have made payments');
              $("#fieldset").prop("disabled", false);
            },
          });
        
      
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> I have made payments');
      $("#fieldset").prop("disabled", false);
    }
  });

});

function formatPayStatus(status) {
    switch (status) {
      case "PAID":
        return '<span class="badge badge-success rounded-pill p-2">Paid <i class="fa fa-check-circle"></i></span>';
        break;
      case "UNPAID":
        return '<span class="badge badge-info rounded-pill p-2">Unpaid <i class="fa fa-info-circle"></i></span>';
        break;
        case "PENDING_CONFIRMATION":
        return '<span class="badge badge-secondary rounded-pill p-2">Pending <i class="fa fa-history"></i></span>';
        break;
        case "NOT_RECEIVED":
        return '<span class="badge badge-danger rounded-pill p-2">Not Received <i class="fa fa-times-circle"></i></span>';
        break;
    }
  }

  function getPayment(id) {
    var promise = new Promise((resolve, reject) => {
      try {
        let url = $base + "/investor/payments/" + id;
        $.ajax({
          type: "GET",
          url: url,
          success: (response) => {
            if (response.success) {
              resolve(response.data);
            } else {
              reject(response.message);
            }
          },
          error: (req, status, err) => {
            let res = req.responseJSON;
            if (req.status == 400) {
              let eItems = "<ul>";
              res.errorItems.forEach((v, i) => {
                eItems += `<li>${i + 1}. ${v}</li>`;
              });
              eItems += "</ul>";
              //notify(res.message + eItems, 'danger', "Validation Error");
              reject(res.message);
            } else if (req.status == 500) {
              //notify(res.message, 'danger');
              console.log(res.errorDetail);
              reject(res.message);
            } else {
              reject("Something went wrong! Please try again.");
              //notify('Something went wrong while submitting your request. Please refresh your browser and try again.', 'danger');
              console.error(req);
            }
          },
        });
      } catch (ex) {
        console.error(ex);
        //notify(ex.message, 'danger');
        reject(ex.message);
      }
    });
    return promise;
  }