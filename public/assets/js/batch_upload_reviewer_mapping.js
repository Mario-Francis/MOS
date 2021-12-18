var connection = null;
var isSignalConnected = false;
function signalRConnect() {
    connection = new signalR.HubConnectionBuilder().withUrl("/notifyHub", { accessTokenFactory: () => getCookie('.Ecoperformance.AuthToken') }).build();

    //Disable send button until connection is established
    //document.getElementById("sendButton").disabled = true;

    connection.on("ReceiveUploadProgress", function (progressObj) {
        console.log(progressObj);
        if (progressObj.status == 0) {
            updateProgress(progressObj.progress, progressObj.message);
        } else if (progressObj.status == 2) {
            showError(progressObj.message, progressObj.errorItems);
            let form = $("form")[0];
            form.reset();
            $('fieldset').prop('disabled', false);
        } else if (progressObj.status == 1) {
            showSuccess(progressObj.message, progressObj.pendingMappingCount);
            let form = $("form")[0];
            form.reset();
            $('fieldset').prop('disabled', false);
        }
    });

    connection.start().then(function () {
        //document.getElementById("sendButton").disabled = false;
        isSignalConnected = true;
    }).catch(function (err) {
        return console.error(err.toString());
    });

    //document.getElementById("sendButton").addEventListener("click", function (event) {
    //    var user = 'Mario';
    //    var message = 'Hello bro!';
    //    connection.invoke("SendMessage", user, message).catch(function (err) {
    //        return console.error(err.toString());
    //    });
    //    event.preventDefault();
    //});

    //$('#test').on('click', (e) => {
    //    fetch('/dashboard/test', { method: 'get' }).then((r) => {
    //        console.log(r);
    //    }).catch((er) => {
    //        console.log(er);
    //    });
    //});
}

function resetProgress() {
    $('#progressBar').width(0).html('0%');
    $('#progressMessage').html('Processing...');
}

function updateProgress(percentage, message) {
    $('#progressBar').width(percentage + '%').html(percentage + '%');
    $('#progressMessage').html(message);
}

function showSuccess(message, report) {
    $('#progressDiv').hide();
    var successAlert = `<div class="alert alert-success alert-dismissible fade show pr-4" role="alert" id="successAlert">
                            <h6 class="font-weight-bold"><i class="fa fa-check-circle"></i> &nbsp;Success</h6>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div>
                                <p id="message">
                                    <!--Uploaded file was processed and mapping completed successfully!-->
                                     ${message}
                                </p>
                                <hr />
                                <p id="report" class="f14">Kindly note there are still <b>${report}</b> employees pending mapping completion.</p>
                            </div>
                        </div>`;
    $('#alertsDiv').html(successAlert)
}

function showError(message, errorList) {
    $('#progressDiv').hide();
    let list = '';
    if (!(errorList==null || errorList.length == 0)) {
        var lis = errorList.map((err) => `<li>${err}</li>`).join('');
        list = `<hr />
                <div class="f14" style="max-height:400px;overflow-y:auto;" id="errorList">
                    <p>Error Items</p>
                    <ul>
                       ${lis}
                    </ul>
                </div>`;
    }
    var errorAlert = `<div class="alert alert-danger alert-dismissible fade show pr-4" role="alert" id="errorAlert">
                        <h6 class="font-weight-bold"><i class="fa fa-times-circle"></i> &nbsp;Failed</h6>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div>
                            <p id="message">
                                ${message}
                            </p>
                           ${list}
                        </div>
                    </div>`;
    $('#alertsDiv').html(errorAlert);
}

$(() => {
    resetProgress();
    signalRConnect();

    $('#submitBtn').on('click', (e) => {
        e.preventDefault();
        let btn = $(e.currentTarget);
        try {
            let form = $("form")[0];
            if (validateForm(form)) {
                let files = $('#file')[0].files;

                if (files.length == 0) {
                    notify('No file selected! Kindly select a valid excel file.', 'warning');
                } else {
                    let formData = new FormData();
                    formData.append('file', files[0]);
                    formData.append('processInBackground', isSignalConnected);

                    $('fieldset').prop('disabled', true);
                    btn.html('<i class="fa fa-circle-notch fa-spin"></i> Uploading file...');
                    let url = $base + 'employees/batchuploadreviewermapping';

                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: (response) => {
                            if (response.isSuccess) {
                                if (!isSignalConnected) {
                                    notify(response.message + '.', 'success');
                                    form.reset();
                                    $('fieldset').prop('disabled', false);
                                } else {
                                    notify(response.message + '.<br /><i class="fa fa-circle-notch fa-spin"></i> Now processing...', 'success', 'Success', 3000);
                                    $('#progressDiv').show();
                                }
                            } else {
                                notify(response.message, 'danger');
                                $('fieldset').prop('disabled', false);
                            }
                            btn.html('<i class="fa fa-upload"></i> &nbsp; Upload file');

                        },
                        error: (req, status, err) => {
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
                            btn.html('<i class="fa fa-upload"></i> &nbsp; Upload file');
                            $('fieldset').prop('disabled', false);
                        }
                    });
                }
            }
        } catch (ex) {
            console.error(ex);
            notify(ex.message, 'danger');
            btn.html('<i class="fa fa-upload"></i> &nbsp; Upload file');
            $('fieldset').prop('disabled', false);
        }
    });
});

