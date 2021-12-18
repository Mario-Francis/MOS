$(() => {
  $("#editBasicBtn").on("click", async (e) => {
    //$("#basicModal").modal({ backdrop: "static", keyboard: false }, "show");
    // on edit
        let loader = bootLoaderDialog('Fetching personal details...');
        let data = await getProfile();
        loader.hide();

        $('#fname').val(data.user.first_name);
        $('#lname').val(data.user.last_name);
        $('#oname').val(data.user.other_name);
        $('#gender').val(data.user.gender);
        $('#email').val(data.user.email);
        $('#phone').val(data.user.phone_number);
        $('#settlement').val(data.investor.settlement_method);
        

        //$('#basicUpdateBtn').attr('rid', rid);

        setTimeout(() => {
            $('#basicModal').modal({ backdrop: 'static', keyboard: false }, 'show');
        }, 700);
  });

  $("#basicUpdateBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    try {
      let form = $("#basicForm")[0];
      if (validateForm(form)) {
        let fname = $.trim($("#fname").val());
        let lname = $.trim($("#lname").val());
        let oname = $.trim($("#oname").val());
        let gender = $.trim($("#gender").val());
        let phone = $.trim($("#phone").val());
        let email = $.trim($("#email").val());
        let settlement = $.trim($("#settlement").val());

        if (
          fname == "" || lname == "" || gender == "" || phone == "" || email == "" || 
          settlement == "" )
        {
          notify("All fields with the '*' prefix are required", "warning");
        }else {
          let data = {
            first_name: fname,
            last_name: lname,
            other_name: oname,
            gender,
            phone_number: phone,
            email,
            settlement
          };
          
          $("#fieldset").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating...');
          let url = $base + "/investor/api-update-profile";
          $.ajax({
            type: "POST",
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            success: (response) => {
              if (response.success) {
                notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', "success");
                form.reset();
                setTimeout(() => {
                    location.reload();
                  }, 2000);
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
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
                btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
              $("#fieldset").prop("disabled", false);
            },
          });
        }
      }
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
      $("#fieldset").prop("disabled", false);
    }
  });

  $("#editBankBtn").on("click", async (e) => {
    //$("#bankModal").modal({ backdrop: "static", keyboard: false }, "show");
    let loader = bootLoaderDialog('Fetching bank details...');
    let data = await getBankDetail();
    loader.hide();

    $('#bank').val(data.bank_detail.bank_id);
    $('#acc_type').val(data.bank_detail.account_type);
    $('#acc_name').val(data.bank_detail.account_name);
    $('#acc_number').val(data.bank_detail.account_number);

    //$('#bankUpdateBtn').attr('rid', rid);

    setTimeout(() => {
        $('#bankModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }, 700);
  });

  $("#bankUpdateBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    try {
      let form = $("#bankForm")[0];
      if (validateForm(form)) {
        let bank_id = $.trim($("#bank").val());
        let account_type = $.trim($("#acc_type").val());
        let account_name = $.trim($("#acc_name").val());
        let account_number = $.trim($("#acc_number").val());

        if (bank_id == "" || account_type == "" || account_name == "" || account_number == "")
        {
          notify("All fields with the '*' prefix are required", "warning");
        }else {
          let data = {
            bank_id,
            account_type,
            account_name,
            account_number
          };
          
          $("#fieldset2").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating...');
          let url = $base + "/investor/api-update-bank-details";
          $.ajax({
            type: "POST",
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            success: (response) => {
              if (response.success) {
                notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', "success");
                form.reset();
                setTimeout(() => {
                    location.reload();
                  }, 2000);
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
              $("#fieldset2").prop("disabled", false);
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
                btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
              $("#fieldset2").prop("disabled", false);
            },
          });
        }
      }
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
      $("#fieldset2").prop("disabled", false);
    }
  });

  $("#editNokBtn").on("click", async(e) => {
    //$("#nokModal").modal({ backdrop: "static", keyboard: false }, "show");
    let loader = bootLoaderDialog('Fetching next of kin details...');
    let data = await getNOK();
    loader.hide();

    $('#nfname').val(data.nok.first_name);
    $('#nlname').val(data.nok.last_name);
    $('#noname').val(data.nok.other_name);
    $('#ngender').val(data.nok.gender);
    $('#nrelationship').val(data.nok.relationship);
    $('#nemail').val(data.nok.email);
    $('#nphone').val(data.nok.phone_number);
    $('#naddress').val(data.nok.address);

    //$('#bankUpdateBtn').attr('rid', rid);

    setTimeout(() => {
        $('#nokModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    }, 700);
  });

  $("#nokUpdateBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    try {
      let form = $("#nokForm")[0];
      if (validateForm(form)) {
        let fname = $.trim($("#nfname").val());
        let lname = $.trim($("#nlname").val());
        let oname = $.trim($("#noname").val());
        let gender = $.trim($("#ngender").val());
        let relationship = $.trim($("#nrelationship").val());
        let phone = $.trim($("#nphone").val());
        let email = $.trim($("#nemail").val());
        let address = $.trim($("#naddress").val());

        if (fname == "" || lname == "" || gender == "" || relationship =='' || phone == "" || address == "")
        {
          notify("All fields with the '*' prefix are required", "warning");
        }else {
          let data = {
            first_name: fname,
            last_name: lname,
            other_name: oname,
            gender,
            relationship,
            phone_number: phone,
            email,
            address,
          };
          
          $("#fieldset3").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating...');
          let url = $base + "/investor/api-update-nok";
          $.ajax({
            type: "POST",
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            success: (response) => {
              if (response.success) {
                notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', "success");
                form.reset();
                setTimeout(() => {
                    location.reload();
                  }, 2000);
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
              $("#fieldset3").prop("disabled", false);
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
                btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
              $("#fieldset3").prop("disabled", false);
            },
          });
        }
      }
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
      $("#fieldset3").prop("disabled", false);
    }
  });

});

function getProfile() {
  var promise = new Promise((resolve, reject) => {
    try {
      let url = $base + "/investor/api-get-profile";
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

function getBankDetail() {
    var promise = new Promise((resolve, reject) => {
      try {
        let url = $base + "/investor/api-get-bank-detail";
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

  function getNOK() {
    var promise = new Promise((resolve, reject) => {
      try {
        let url = $base + "/investor/api-get-nok";
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
  