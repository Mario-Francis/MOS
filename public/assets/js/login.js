$(() => {
    // on form submit
    $("#loginBtn").on("click", (e) => {
      e.preventDefault();
      let btn = $(e.currentTarget);
      try {
        let form = $("#loginForm")[0];
        if (validateForm(form)) {
          // basic details
          let email = $.trim($("#email").val());
          let pswd = $("#password").val();
  
          if (email == "" || pswd == "" ) {
            notify("All fields with the '*' prefix are required", "warning");
          } else {
            let data = {
              email,
              password: pswd,
            };
            
            $("#fieldset").prop("disabled", true);
            btn.html('<i class="fa fa-circle-notch fa-spin"></i> Logging in...');
            let url = $base + "/auth/api-login";
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
                    location.replace($base+'/dashboard');
                  }, 2000);
                } else {
                  notify(response.message, "danger");
                }
                btn.html('<i class="fa fa-sign-in-alt"></i> &nbsp;Log In');
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
                  btn.html('<i class="fa fa-sign-in-alt"></i> &nbsp;Log In');
                $("#fieldset").prop("disabled", false);
              },
            });
          }
        }
      } catch (ex) {
        console.error(ex);
        notify(ex.message, "danger");
        btn.html('<i class="fa fa-sign-in-alt"></i> &nbsp;Log In');
        $("#fieldset").prop("disabled", false);
      }
    });
  });
  