$(() => {
    // transfer confirmation
    $("#transferBtn").on("click", (e) => {
      e.preventDefault();
      let btn = $(e.currentTarget);
      try {
            btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating payment status...');
            let url = $base + "/payments/api-reg-payment-by-transfer";
            $.ajax({
              type: "POST",
              url: url,
              contentType: "application/json",
              success: (response) => {
                if (response.success) {
                  notify(response.message+'<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', "success");
                  setTimeout(() => {
                    location.reload();
                  }, 1500);
                } else {
                  notify(response.message, "danger");
                }
                btn.html('<i class="fa fa-check-circle"></i> I have made payments');
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
              },
            });
          
      } catch (ex) {
        console.error(ex);
        notify(ex.message, "danger");
        btn.html('<i class="fa fa-check-circle"></i> I have made payments');
      }
    });
  });
  