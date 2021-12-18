$(() => {
  $("#prevBtn").on("click", (e) => {
    if (maxStage >= currentStage && currentStage > 1) {
      navigate(currentStage, currentStage - 1);
      setCompletedStage(currentStage);
      currentStage = currentStage - 1;
      setActiveStage(currentStage);
      $(".card-footer").addClass("d-flex").removeClass("d-none");
    }
  });

  $("#nextBtn").on("click", async (e) => {
    if (currentStage < maxStage) {
      if (!validateStage(currentStage)) {
        if (currentStage == 3) {
          notify("Please specify at least 5 appliances", "warning");
        } else if (currentStage == 4) {
          notify("You have not made any payments", "warning");
        }
      } else {
        let _continue = true;
        if (currentStage + 1 == 4) {
          try {
            let data = await submitApplication();
            amount = data.amount;
            $("#amount_sp").html(amount);
            $("#meter_sp").html(
              $(
                $("#meter")[0].options[$("#meter")[0].options.selectedIndex]
              ).text()
            );
            trackNumber = data.track_no;
            paymentId = data.payment_id;
          } catch (ex) {
            _continue = false;
            if (ex != null) {
              console.error(ex);
              notify(ex);
            }
          }
        }
        if (_continue) {
          navigate(currentStage, currentStage + 1);
          setCompletedStage(currentStage);
          currentStage = currentStage + 1;
          setActiveStage(currentStage);
          if (currentStage == maxStage) {
            $(".card-footer").removeClass("d-flex").addClass("d-none");
          }
        }
      }
    }
  });

  appliancesTable = $("#appliancesTable").DataTable({
    order: [[0, "asc"]],
    lengthMenu: [10],
    paging: true,
    autoWidth: false,
    //rowId: 'id',
    columns: [
      {
        data: {
          filter: "Id",
          display: "id",
        },
        orderable: true,
        render: function (data, type, row, meta) {
          return meta.row + 1 + meta.settings._iDisplayStart + ".";
        },
      },
      {
        data: "name",
      },
      {
        data: "count",
      },
      {
        data: "id",
        orderable: false,
        render: function (data, type, row, meta) {
          return `<a href="javascript:void(0)" class="btn btn-danger btn-sm px-2 py-0 f12 remove"><i class="fa fa-times"></i> Remove</a>`;
        },
      },
    ],
  });

  // on appliance change
  $("#appliance").on("change", (e) => {
    let dd = $(e.currentTarget);
    let val = dd.val();
    if (val == "Other") {
      $("#other_appliance").show().attr("required", true);
    } else {
      $("#other_appliance").val("").hide().attr("required", false);
    }
  });

  // on add appliance
  $("#addApplianceBtn").on("click", (e) => {
    let appliance = $("#appliance").val();
    let other = $("#other_appliance").val();
    let count = $("#appliance_count").val();

    if (validateForm($("#form3")[0])) {
      if (appliance == "") {
        notify("Please select appliance", "warning");
      } else if (count == "" || count == 0) {
        notify("Please enter number of appliance", "warning");
      } else if (appliance == "Other" && other == "") {
        notify("Other appliance field is required", "warning");
      } else {
        let _appliance = appliance == "Other" ? other : appliance;
        if (
          Array.from(appliancesTable.rows().data()).some(
            (d) => d.name == _appliance
          )
        ) {
          notify("Appliance already exists in list", "warning");
        } else {
          let listCount = appliancesTable.rows().data().length;
          appliancesTable.row
            .add({
              id: listCount,
              name: _appliance,
              count: count,
            })
            .draw();

          $("#appliance").val("");
          $("#other_appliance").val("");
          $("#appliance_count").val("");
        }
      }
    }
  });

  // on remove
  $(document).on("click", ".remove", (e) => {
    let tr = $(e.currentTarget).parents("tr")[0];
    bootConfirm("Are you sure you want to remove appliance?", {
      title: "Confirm Action",
      size: "small",
      okBtnText: "Yes",
      cancelBtnText: "No",
      callback: async (res) => {
        if (res) {
          appliancesTable.row(tr).remove().draw();
        }
      },
    });
  });

  $("#haspet").on("change", (e) => {
    let val = $(e.currentTarget).val();
    if (val == "true") {
      $("#petcount").attr("required", true);
      $(".petcount").show();
    } else {
      $("#petcount").attr("required", false);
      $(".petcount").hide();
    }
  });

  $("#okBtn").on("click", (e) => {
    location.replace($base);
  });

  $("#payBtn").on("click", (e) => {
    payWithPaystack($(e.currentTarget));
  });
});

var maxStage = 5;
var currentStage = 1;
var trackNumber, paymentId, amount;
var isPaid = false;
var appliancesTable;

function navigate(from, to) {
  let fromDiv = $(`#stage${from}_div`);
  let toDiv = $(`#stage${to}_div`);

  fromDiv.fadeOut(300, () => {
    toDiv.fadeIn(300);
  });
}

function setActiveStage(stage) {
  $("#progressbar li").removeClass("active");
  $(`#stage${stage}`).addClass("active");
}

function setCompletedStage(stage) {
  $(`#stage${stage}`).addClass("completed");
}

function validateStage(stage) {
  // return bool
  if (stage == 1) {
    let form = $("#form1")[0];
    return validateForm(form);
  } else if (stage == 2) {
    let form = $("#form2")[0];
    return validateForm(form);
  } else if (stage == 3) {
    return appliancesTable.rows().data().length >= 5;
  } else if (stage == 4) {
    return isPaid;
  }
}

function submitApplication() {
  // submit and return payment id and trackno and amount
  let first_name = $("#fname").val().trim();
  let last_name = $("#lname").val().trim();
  let email = $("#email").val().trim();
  let phone_number = $("#phone").val().trim();
  let area = $("#area").val().trim();
  let street = $("#street").val().trim();
  let house_no = $("#houseno").val().trim();
  let apartment_no = $("#apartno").val().trim();
  let landmark = $("#landmark").val().trim();
  let description = $("#descrip").val().trim();

  let meter_id = $("#meter").val().trim();
  let house_type_id = $("#housetype").val().trim();
  let rooms_count = $("#roomcount").val().trim();
  let has_pets = $("#haspet").val().trim() == "true" ? true : false;
  let pets_count = $("#petcount").val().trim();

  let appliances = Array.from(appliancesTable.rows().data()).map((a) => ({
    appliance: a.name,
    count: a.count,
  }));

  let data = {
    first_name,
    last_name,
    email,
    phone_number,
    area,
    street,
    house_no,
    apartment_no,
    landmark,
    description,
    meter_id,
    house_type_id,
    rooms_count,
    has_pets,
    pets_count,
    appliances,
  };
  var promise = new Promise((resolve, reject) => {
    try {
      var loader = bootLoaderDialog("Loading...");
      let url = $base + "/application/submit";
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
          if (response.success) {
            //notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Redirecting...', "success");
            //   form.reset();
            //   setTimeout(() => {
            //       location.replace($base+'/investor/profile');
            //     }, 2000);
            console.log(response);
            resolve(response.data);
          } else {
            notify(response.message, "danger");
            reject(response.message);
          }
          loader.hide();
        },
        error: (req, status, err) => {
          loader.hide();
          let res = req.responseJSON;
          if (req.status == 401) {
            notify(res.message, "danger");
          } else if (req.status == 400) {
            let eItems = "";
            console.log(res.error_list);
            if (res.error_list != null) {
              eItems = "<ul>";
              for (let k in res.error_list) {
                eItems += `<li>${k}. ${res.error_list[k]}</li>`;
              }
              eItems += "</ul>";
            }
            notify(res.message + eItems, "danger", "Validation Error");
          } else if (req.status == 500) {
            notify(res.message, "danger");
            console.log(res.errorDetail);
          } else {
            notify(
              "Something went wrong while submitting your request. Please refresh your browser and try again.",
              "danger"
            );
            console.error(req);
          }
          reject(null);
        },
      });
    } catch (ex) {
      loader.hide();
      console.log(ex);
      reject(ex.message);
    }
  });
  return promise;
}

function confirmPayment(payment_id, payment_ref) {
  let promise = new Promise((resolve, reject) => {
    try {
      var loader = bootLoaderDialog("Verifying payment...");
      let url = $base + "/payments/verify";
      let data = { payment_id, payment_ref };
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
          if (response.success) {
            notify(response.message + ".", "success");
            console.log(response);
            resolve(true);
          } else {
            notify(response.message, "danger");
            reject(null);
          }
          loader.hide();
        },
        error: (req, status, err) => {
          loader.hide();
          let res = req.responseJSON;
          if (req.status == 401) {
            notify(res.message, "danger");
          } else if (req.status == 400) {
            let eItems = "";
            console.log(res.error_list);
            if (res.error_list != null) {
              eItems = "<ul>";
              for (let k in res.error_list) {
                eItems += `<li>${k}. ${res.error_list[k]}</li>`;
              }
              eItems += "</ul>";
            }
            notify(res.message + eItems, "danger", "Validation Error");
          } else if (req.status == 500) {
            notify(res.message, "danger");
            console.log(res.errorDetail);
          } else {
            notify(
              "Something went wrong while submitting your request. Please refresh your browser and try again.",
              "danger"
            );
            console.error(req);
          }
          reject(null);
        },
      });
    } catch (ex) {
      loader.hide();
      console.log(ex);
      reject(ex.message);
    }
  });
  return promise;
}

function payWithPaystack(btn) {
  $email = $("#email").val().trim();
  $amt = parseFloat(amount.replace(",", "").replace('.', ''));
  $phno = $("#phone").val().trim();
  $key = $("#key").val();

  var handler = PaystackPop.setup({
    key: $key, //'pk_test_df6a8eefb7a8e41643083cd2ca83f2a78c102d39',
    email: $email,
    amount: $amt,
    //ref:$tid,
    //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
      order_id: paymentId + "_" + trackNumber,
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: $phno,
        },
        {
          display_name: "Tracking Number",
          variable_name: "mtrack_number",
          value: trackNumber,
        },
      ],
    },
    callback: function (response) {
      //alert('success. transaction ref is ' + response.reference);
      try {
        console.log(response);
        confirmPayment(paymentId, response.reference).then((res) => {
          isPaid = true;
          $("#tracknosp").html(trackNumber);
          $("#nextBtn").trigger("click");
        });
      } catch {}
    },
    onClose: function () {
      //alert('window closed');//ckick on pay now to try agian
      //$('#cModal').modal('show');
      // if(isPaid){
      //     $('#tracknosp').html(trackNumber);
      //     $('#nextBtn').trigger('click');
      // }
    },
  });
  handler.openIframe();
}
//function updatePaymentStatus() {}
