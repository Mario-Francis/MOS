$(() => {
  // initialize datatable
  let singleTable = $("#singleTable").DataTable({
    processing: true,
    serverSide: true,
    ajax: $base + "/backoffice/payments/api-pending-single-dt",
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
      { targets: 1, data: 7 },
      { targets: 2, data: 8 },
      { targets: 3, data: 5 },
      { targets: 4, data: 9 },
      { targets: 5, data: 4 },
      { targets: 6, data: 6 },
      {
        targets: 7,
        data: 0,
        orderable: false,
        render: (data, type, row, meta) => {
          console.log(row);
          return `<a href="javascript:void(0)" pid="${data}" class="btn btn-primary btn-sm f10 confirm" style="min-width: 70px;">Confirm <i class="icofont-simple-right"></i></a>`;
        },
      },
    ],
  });

  $(document).on("click", ".confirm", async (e) => {
    let btn = $(e.currentTarget);
    var pid = btn.attr("pid");
    var loader;

    bootConfirm("Have you received this transfered payment?", {
      okBtnText: "Yes",
      cancelBtnText: "No",
      callback: async (res) => {
        if (res != null) {
          try {
            loader = bootLoaderDialog("Confirming payment...");
            let message = "";
            if (res) {
              message = await confirmPayment(pid, "CONFIRM");
            } else {
              message = await confirmPayment(pid, "DECLINE");
            }

            setTimeout(() => {
              notify(message, "success");
              singleTable.ajax.reload();
              loader.hide();
            }, 700);
          } catch (ex) {
            console.error(ex);
            notify(ex, "danger");
            loader.hide();
          }
        }
      },
    });
  });
});

function confirmPayment(paymentId, action) {
  var promise = new Promise((resolve, reject) => {
    try {
      if (paymentId == undefined || paymentId == "" || paymentId == 0) {
        reject("Invalid payment id");
      } else if (action == undefined || action == "" || action == null) {
        reject("Invalid review action");
      } else {
        let url =
          $base +
          "/backoffice/payments/api-confirm-payment-by-transfer/" +
          paymentId +
          "?action=" +
          action;
        $.ajax({
          type: "POST",
          url: url,
          success: (response) => {
            if (response.success) {
              resolve(response.message);
            } else {
              reject(response.message);
            }
          },
          error: (req, status, err) => {
            let res = req.responseJSON;
            if (req.status == 400) {
              let eItems = "";
              if (res.errorItems != null) {
                eItems = "<ul>";
                res.errorItems.forEach((v, i) => {
                  eItems += `<li>${i + 1}. ${v}</li>`;
                });
                eItems += "</ul>";
              }
              reject(res.message + eItems);
              //notify(res.message + eItems, 'danger', "Validation Error");
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
      }
    } catch (ex) {
      console.error(ex);
      //notify(ex.message, 'danger');
      reject(ex.message);
    }
  });
  return promise;
}
