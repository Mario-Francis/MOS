$(() => {
    $('.culture').on('click', (e) => {
        let btn = $(e.currentTarget);
        let value = btn.attr('culture');
        let text = btn.html();
        let currentCulture = $('#culture').val();

        let loader = null;
        if (value != currentCulture) {
            bootConfirm(`The page will be refreshed and you might lose the current state of your form fields. <br /><br /><b>Do you wish to switch to ${text}?</b>`, {
                title: 'Confirm', size: 'small', callback: (res) => {
                    if (res) {
                        loader = bootLoaderDialog(`Switching to ${text}...`);
                        let url = $base + 'culture/setCultureAjax';
                        $.ajax({
                            type: 'POST',
                            url: url,
                            data: {
                                culture: value
                            },
                            success: (response) => {
                                loader.hide();
                                if (response.isSuccess) {
                                    console.log(response.message);
                                    notify('<i class="fa fa-circle-notch fa-spin"></i> Refreshing...');
                                    setTimeout(() => {
                                        location.reload();
                                    }, 1300);
                                } else {
                                    notify(response.message, 'danger');
                                }
                            },
                            error: (req, status, err) => {
                                loader.hide();
                                let res = req.responseJSON;
                                if (req.status == 401) {
                                    notify(res.message, 'danger', "Unauthorized");
                                } else if (req.status == 400) {
                                    let eItems = '<ul>';
                                    res.errorItems.forEach((v, i) => {
                                        eItems += `<li>${i + 1}. ${v}</li>`;
                                    });
                                    eItems += '</ul>';
                                    notify(res.message + eItems, 'danger', "Validation Error");
                                } else if (req.status == 500) {
                                    notify(res.message, 'danger');
                                    console.log(res.errorDetail)
                                } else {
                                    notify('Something went wrong while submitting your request. Please refresh your browser and try again.', 'danger');
                                    console.error(req);
                                }
                            }
                        });
                    }
                }
            });
        }
    });
});