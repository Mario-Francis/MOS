$(() => {
  // on form submit
  $("#submitBtn").on("click", (e) => {
    e.preventDefault();
    let btn = $(e.currentTarget);
    try {
      let form = $("#registerForm")[0];
      if (validateForm(form)) {
        // basic details
        let fname = $.trim($("#fname").val());
        let lname = $.trim($("#lname").val());
        let oname = $.trim($("#oname").val());
        let gender = $.trim($("#gender").val());
        let phone = $.trim($("#phone").val());
        let email = $.trim($("#email").val());
        let pswd = $("#password").val();
        let cpswd = $("#cpassword").val();

        if (
          fname == "" ||
          lname == "" ||
          gender == "" ||
          phone == "" ||
          email == "" ||
          pswd == "" ||
          cpswd == ""
        ) {
          notify("All fields with the '*' prefix are required", "warning");
        } else if (!validateEmail(email)) {
          notify("Email is invalid", "warning");
        } else if (!validatePassword(pswd)) {
          notify(
            "Password is not valid! Password must contain at least one(1) uppercase letter, lowercase letter, digit, special character and must be up to eight(8) characters in length.",
            "warning"
          );
        } else if (pswd != cpswd) {
          notify("Passwords don't match.", "warning");
        } else {
          let data = {
            first_name: fname,
            last_name: lname,
            other_name: oname,
            gender,
            phone_number: phone,
            email,
            password: pswd,
            confirm_password: cpswd,
          };
          
          $("#fieldset").prop("disabled", true);
          btn.html('<i class="fa fa-circle-notch fa-spin"></i> Submitting...');
          let url = $base + "/auth/api-register";
          $.ajax({
            type: "POST",
            url: url,
            data:JSON.stringify(data),
            contentType: "application/json",
            // contentType: false,
            // cache: false,
            // processData: false,
            success: (response) => {
              if (response.success) {
                notify(response.message, "success");
                form.reset();
              } else {
                notify(response.message, "danger");
              }
              btn.html('<i class="fa fa-check-circle"></i> Submit');
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
                btn.html('<i class="fa fa-check-circle"></i> Submit');
              $("#fieldset").prop("disabled", false);
            },
          });
        }
      }
    } catch (ex) {
      console.error(ex);
      notify(ex.message, "danger");
      btn.html('<i class="fa fa-check-circle"></i> Submit');
      $("#fieldset").prop("disabled", false);
    }
  });
});
