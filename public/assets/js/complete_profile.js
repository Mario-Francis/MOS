$(()=>{
    customize_dropdowns($('#bank'));

    // on form submit
  $("#saveBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    try {
      let form = $("#profileForm")[0];
      if (validateForm(form)) {
        let fname = $.trim($("#fname").val());
        let lname = $.trim($("#lname").val());
        let oname = $.trim($("#oname").val());
        let gender = $.trim($("#gender").val());
        let relationship = $.trim($("#relationship").val());
        let phone = $.trim($("#phone").val());
        let email = $.trim($("#email").val());
        let address = $.trim($("#address").val());

        let bank_id = $.trim($("#bank").val());
        let account_type = $.trim($("#acc_type").val());
        let account_name = $.trim($("#acc_name").val());
        let account_number = $.trim($("#acc_number").val());
       

        if (
          fname == "" || lname == "" || gender == "" || relationship =='' || phone == "" || address == "" || 
          bank_id == "" || account_type == "" || account_name == "" || account_number == "")
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
            bank_id,
            account_type,
            account_name,
            account_number
          };
          
          $("#fieldset").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Saving...');
          let url = $base + "/investor/api-complete-profile";
          $.ajax({
            type: "POST",
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            success: (response) => {
              if (response.success) {
                notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Redirecting...', "success");
                form.reset();
                setTimeout(() => {
                    location.replace($base+'/investor/profile');
                  }, 2000);
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> &nbsp;Save');
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
                btn.html('<i class="fa fa-check-circle"></i> &nbsp;Save');
              $("#fieldset").prop("disabled", false);
            },
          });
        }
      }
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> &nbsp;Save');
      $("#fieldset").prop("disabled", false);
    }
  });
});