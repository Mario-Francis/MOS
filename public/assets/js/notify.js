//=================== Bootstrap Notify ========================
function notify(message, type = 'info', title = null, timeout = null) {
    let _icon = getIcon(type);
    let _title = title != null ? title : getTitle(type);
    let _delay = timeout != null ? timeout : 10000;
    $.notify({
        // options
        icon: 'font-weight-bold f16 ' + _icon,
        title: '<b class="f14">' + _title + '</b><br />',
        message: '<p class="f14">' + message + '</p>',
        // url: 'https://github.com/mouse0270/bootstrap-notify',
        // target: '_blank'
    }, {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 3031,
        delay: _delay,
        timer: 1000,
        // url_target: '_blank',
        // mouse_over: null,
        animate: {
            enter: 'animate__animated animate__fadeInDown animate__faster',
            exit: 'animate__animated animate__fadeOutUp animate__faster'
        },
        // onShow: null,
        // onShown: null,
        // onClose: null,
        // onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-11 col-md-4 col-sm-7 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close f16" style="position:absolute;top:6px;right:6px;" data-notify="dismiss"><i class="fa fa-times"></i></button>' +
            '<div class="d-flex">' +
            '<div class="">' +
            '<span data-notify="icon"></span> ' +
            '</div><div class="flex-fill px-2">' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div></div>' +
            '</div>'
    });
}

function getIcon(type) {
    var icon = '';
    switch (type) {
        case 'info':
            icon = 'fa fa-info-circle';
            break;
        case 'success':
            icon = 'fa fa-check-circle';
            break;
        case 'warning':
            icon = 'fa fa-exclamation-triangle';
            break;
        case 'danger':
            icon = 'fa fa-times-circle';
            break;
        default:
            icon = 'fa fa-info-circle';
            break;
    }
    return icon;
}

function getTitle(type) {
    var title = '';
    switch (type) {
        case 'info':
            title = 'Information';
            break;
        case 'success':
            title = 'Success';
            break;
        case 'warning':
            title = 'Warning';
            break;
        case 'danger':
            title = 'Error';
            break;
        default:
            title = 'Information';
            break;
    }
    return title;
}
// ======================== ENd Bootstrap Notify ============================

//================ BOOT BOX =======================
function bootConfirm(message, { title = 'Confirm Action', size = 'small', okBtnText = 'OK', cancelBtnText = 'Cancel', callback = null }) {
    bootbox.confirm({
        title: '<i class="fa fa-question-circle f16"></i> &nbsp;' + title,
        message: message,
        size: size,
        centerVertical: true,
        buttons: {
            confirm: {
                label: '<i class="fa fa-check-circle"></i> &nbsp;' + okBtnText,
                className: 'btn-primary btn-sm px-3 f12'
            },
            cancel: {
                label: '<i class="fa fa-times-circle"></i> &nbsp;' + cancelBtnText,
                className: 'btn-outline-secondary btn-sm px-3 f12'
            }
        },
        callback: callback
    });
}

function bootAlert(message, { title = null, size = 'small', btnText = 'OK' }) {
    bootbox.alert({
        centerVertical: true,
        size: size,
        title: title,
        message: message,
        backdrop: true,
        buttons: {
            ok: {
                label: btnText,
                className: 'btn-primary btn-sm px-4 f12'
            }
        },
    });
}

function bootLoaderDialog(message){
    var dialog = bootbox.dialog({
        message: '<p class="text-center mb-0"><i class="fa fa-circle-notch fa-spin"></i> '+message+'</p>',
        closeButton: false,
        centerVertical: true,
    });
    dialog.hide = ()=>{
        setTimeout(() => {
            dialog.modal('hide');
        }, 500);
    };
    return dialog;
}

function bootPrompt(fieldName='Input', { message = 'Enter value', type=null, size='medium', required=true }) {
    var promise = new Promise((resolve, reject) => {
        try {
            bootbox.prompt({
                centerVertical: true,
                title: message,
                inputType: type,
                size: size,
                buttons: {
                    confirm: {
                        label: '<i class="fa fa-check-circle"></i> &nbsp;OK',
                        className: 'btn-primary btn-sm px-3 f12'
                    },
                    cancel: {
                        label: '<i class="fa fa-times-circle"></i> &nbsp;Cancel',
                        className: 'btn-secondary btn-sm px-3 f12'
                    }
                },
                callback: function (result) {
                    if (result != null) {
                        if ($.trim(result) == '' && required) {
                            notify(`${fieldName} is required.`, 'warning');
                            return false;
                        } else {
                            resolve({ success: true, data: result });
                        }
                    } else {
                        resolve({ success: false, data: result });
                    }
                }
            });
        } catch (ex) {
            reject(ex.message);
        }
    });
    return promise;
}
//============================ END BOOT BOX ============================ 