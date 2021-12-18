function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regex);
}

function validatePassword(password) {
    return (password.match(/[a-z]/g) && // at least 1 lowercase
        password.match(/[A-Z]/g) && // at least 1 uppercase
        password.match(/[0-9]/g) &&  // at least 1 digit
        password.match(/[^a-zA-Z\d]/g) &&  // at least 1 special char
        password.length >= 8);
}

function validateForm(form) {
    if (!form.checkValidity()) {
        if (form.reportValidity) {
            form.reportValidity();
            notify('All fields with asteriks (*) are required!', 'warning');
        } else {
            //warn IE users somehow
            notify('Form validation failed! Kindly fill form fields appropriately and try again.', 'warning');
        }
        return false;
    }
    return true;
}

// use chosen.js to customize dropdown
function customize_dropdowns(elem) {
    if (elem.chosen) {
        elem.chosen({
            disable_search_threshold: 10,
            no_results_text: "No match  found for: ",
            width: '100%'
        });
        $('.chosen-single b').attr('style', 'background-image:url(' + $base + '/assets/img/caret.png' + ') !important;background-repeat:no-repeat !important;background-position:right !important;background-size:18px 18px !important;opacity:.7');
    }
}

//populate lgas
function fill_lgas(data, $dd) {
    $dd.html('');
    $dd.append($('<option />').val('').text('Select LGA'));
    $.each(data, function (d, i) {
        $dd.append($('<option />').val(this.id).text(this.name));
    });
    $dd.val($dd.attr('value'));
    $dd.trigger('chosen:updated');
}

//=========== PHOTO UPLOAD FUNCTIONS ================
// handle file selection
function handleFilesSelect(files, from = 'input') {
    if (files.length > 1) {
        notify('Only one image is required!', 'warning');
        // set to default state
        setFileFieldsToDefault();
    } else {
        var file = files[0];
        $ext = file.name.split('.').pop().toLowerCase();
        if (file.size > (100 * 1024 * 1024)) {
            notify('File too large! Size should not exceed 100MB', 'warning');
            // set to default state
            setFileFieldsToDefault();
        } else if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
            notify('Invalid file selected! Supported file type includes .jpg, .jpeg and .png', 'warning');
            // set to default state
            setFileFieldsToDefault();
        } else {
            // set file value
            setFileValue(files, from);
        }
    }
}

function setFileFieldsToDefault() {
    $('.photo-upload-container .file').val('');
    $('.photo-upload-container .file-text').val('');
    $('.photo-upload-container .file')[0].files = null;
    $('.photo-upload-container .photo-upload img').attr('src', $base + 'assets/img/avatar.png');
    if (!$('.photo-upload-container .photo-upload img').hasClass('empty')) {
        $('.photo-upload-container .photo-upload img').addClass('empty');
    }
    if ($('.photo-upload-container .photo-upload p').hasClass('d-none')) {
        $('.photo-upload-container .photo-upload p').removeClass('d-none');
    }
}
function getDataTransferObject(files) {
    var dt = new DataTransfer();
    $.each(files, (i, f) => {
        dt.items.add(f);
    });
    //console.log(dt);
    return dt;
}
function setFileValue(files, from) {
    //console.log(files);
    $('.photo-upload-container .file-text').val(files[0].name);
    preview(files[0], $('.photo-upload-container .photo-upload img'));
    if (from == 'input') {
        $('.photo-upload-container .file')[0].files = getDataTransferObject(files).files;
    } else {
        $('.photo-upload-container .file')[0].files = files;
    }

    if ($('.photo-upload-container .photo-upload img').hasClass('empty')) {
        $('.photo-upload-container .photo-upload img').removeClass('empty');
    }
    if (!$('.photo-upload-container .photo-upload p').hasClass('d-none')) {
        $('.photo-upload-container .photo-upload p').addClass('d-none');
    }
}

function preview(file, img) {
    var reader = new FileReader();
    reader.onload = function (e) {
        img.attr('src', e.target.result);
    };
    reader.readAsDataURL(file);
}
//========== END OF PHOTO UPLOAD FUNCTIONS ==========

// money input keyup event handler
// naira code point 0x20A6
function moneyInputKeyupEventHandler(event) {
    // 1.
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }
    // 2.
    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
        return;
    }
    var input = $(event.currentTarget);
    var symbol = input.attr('symbol') == undefined ? '' : input.attr('symbol');
    $val = $.trim(input.val());
    if ($val != '') {
        var result = formatMoney(input.val(), { symbol: String.fromCodePoint(symbol) });
        input.val(result);
    }
}

// format string to money using accounting.js
function formatMoney(input, {dp = 2, forceDp = false, symbol = '\u20A6' }) {
    var arr = input.split('.');
    var whole = arr.shift();
    var dec = arr.length > 0 ? arr.join('') : null;

    whole = whole.replace(/[\D\s\._\-]+/g, "");
    whole = whole ? parseInt(whole, 10) : 0;
    if (dec != null) {
        dec = dec.replace(/[\D\s\._\-]+/g, "");
        dec = (dec + '00').slice(0, 2);
    }

    var result = whole.toString();
    if (dec != null)
        result = result + '.' + dec;
    var decimalPlaces = (result.includes('.') ? dp : (forceDp ? dp : 0));
    return (result == 0) ? "" : accounting.formatMoney(result, symbol, decimalPlaces);
}

// get raw figure
function unformatMoney($money) {
    return accounting.unformat($money);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode < 48 || charCode > 57))
        return false;

    return true;
}
function isNumberWithDecimalKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
// Number fields on keyup handler
function integerInputKeyupEventHandler(event) {
    // 1.
    var selection = window.getSelection().toString();
    if (selection !== '') {
        return;
    }
    // 2.
    if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
        return;
    }

    if (!isNumberKey(event))
        event.preventDefault();
}
function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function pad(pad, str, padLeft) {
    if (typeof str === 'undefined')
        return pad;
    if (padLeft) {
        return (pad + str).slice(-pad.length);
    } else {
        return (str + pad).substring(0, pad.length);
    }
}

function setCookie(key, value) {
    Cookies.set(key, value);
}

function getCookie(key) {
    Cookies.get(key);
}

// on document ready
$(() => {
    // initialize dropdowns
    customize_dropdowns($('.state'));
    customize_dropdowns($('.lga'));
    customize_dropdowns($('#mstatus'));
    customize_dropdowns($('.dd'));

    // initialize money fields
    // handle avg amount change on keyup
    $('.money').on('keyup', moneyInputKeyupEventHandler);
    $('.integer').on('keypress', integerInputKeyupEventHandler);

    // initialize custom date picker
    if ($('.date').Zebra_DatePicker) {
        $('.date').Zebra_DatePicker({
            direction: null,
            default_position: 'below',
            format: 'Y-m-d',
            onSelect: (formattedDate, defaultDate, dateObject) => {
                $('.date').trigger('change');
            },
            onClear: () => {
                $('.date').trigger('change');
            }
        });
    }

    if ($('.dob').Zebra_DatePicker) {
        $('.dob').Zebra_DatePicker({
            direction: false,
            default_position: 'below',
            format: 'Y-m-d',
            onSelect: (formattedDate, defaultDate, dateObject) => {
                $('.dob').trigger('change');
            },
            onClear: () => {
                $('.dob').trigger('change');
            }
        });
    }

    // initiate popover
    $('[data-toggle="popover"]').popover();

    if (window.matchMedia("(max-width: 767px)").matches) {
        // The viewport is less than 768 pixels wide
        $('.password-btn').on('click', (e) => {
            let btn = $(e.currentTarget);
            $input = $('#' + btn.attr('input-id'));
            if ($input.attr('type') == 'text') {
                $input.attr('type', 'password');
                btn.html('<i class="fa fa-eye-slash"></i>');
            } else {
                $input.attr('type', 'text');
                btn.html('<i class="fa fa-eye"></i>');
            }
            
        });
    } else {
        // The viewport is at least 768 pixels wide
        // hanlde on passwordbtn click
        $('.password-btn').on('mousedown', (e) => {
            let btn = $(e.currentTarget);
            $input = $('#' + btn.attr('input-id'));
            $input.attr('type', 'text');
            btn.html('<i class="fa fa-eye"></i>');
        });
        $('.password-btn').on('mouseup mouseleave', (e) => {
            let btn = $(e.currentTarget);
            $input = $('#' + btn.attr('input-id'));
            $input.attr('type', 'password');
            btn.html('<i class="fa fa-eye-slash"></i>');
        });
    }

   

    // state select change
    $('.state').on('change', (e) => {
        $statedd = $(e.currentTarget);
        $lgadd = $('#' + $statedd.attr('lga'));
        $state = $statedd.val();
        if ($state != '') {
            $lgadd.prop('disabled', true);
            $url = $base + 'loader/api_fetch_lgas/' + $state;
            $.ajax({
                type: 'GET',
                url: $url,
                success: function (response) {
                    if (response.success) {
                        fill_lgas(response.data, $lgadd);
                    }
                    $lgadd.prop('disabled', false).trigger("chosen:updated");
                },
                error: (req, status, err) => {
                    console.error('Error: ' + req.responseText);
                    console.error(req);
                    console.error(status);
                    console.error(err);
                    $lgadd.prop('disabled', false).trigger("chosen:updated");
                }
            });
        }
    });

    // =========== PHOTO UPLOAD ====================
    $('.photo-upload-container .photo-upload').on('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    $('.photo-upload-container .photo-upload').on('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        //========
        $('.photo-upload-container .photo-upload').addClass('drag-hover');
    });
    $('.photo-upload-container .photo-upload').on('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        //==========
        $('.photo-upload-container .photo-upload').removeClass('drag-hover');
    });

    // on drop
    $('.photo-upload-container .photo-upload').on('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        //=======================
        $('.photo-upload-container .photo-upload').removeClass('drag-hover');
        $files = e.originalEvent.dataTransfer.files;
        if ($files.length > 0) {
            handleFilesSelect($files, 'drop');
        }
    });

    // handle photo file input change
    $('.photo-upload-container .file').on('change', (e) => {
        if (e.currentTarget.files.length > 0) {
            var files = e.currentTarget.files;
            handleFilesSelect(files);
        }
    });
    //========= END OF PHOTO UPLOAD================

    $('.custom_file .file').on('change', (e) => {
        let txtInput = $('#' + $(e.currentTarget).attr('file-text-id'));
        let fileInput = e.currentTarget;
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            $ext = file.name.split('.').pop().toLowerCase();
            if (file.size > (50 * 1024 * 1024)) {
                notify('File too large! Size should not exceed 50MB', 'warning');
                // set to default state
                txtInput.val('').attr('title', '');
                fileInput.files = null;
            } else if ($ext != 'xls' && $ext != 'xlsx') {
                notify('Invalid file selected! Supported file type includes .xls and .xlsx', 'warning');
                // set to default state
                txtInput.val('');
                fileInput.files = null;
            } else {
                // set file value
                txtInput.val(file.name).attr('title', file.name);
            }
        }
    });

    // uses js-cookie plugin
    // set current time zone offset
    var offset = (new Date().getTimezoneOffset()) * -1;
    Cookies.set('clientTimeZoneOffset', offset);
});