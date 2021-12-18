var employeePN = $('#employeePN').val();
var selectizedd;
$(() => {
    selectizedd = initializeReviewerDropdown();

    // initialize datatable
    var reviewersTable = $('#reviewersTable').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: $base + 'employees/EmployeeReviewersDataTable?personNumber=' + employeePN,
            type: "POST"
        },
        "order": [[2, "asc"]],
        "lengthMenu": [10, 15, 20, 25, 30],
        "paging": true,
        autoWidth: false,
        //rowId: 'id',
        columns: [
            {
                data: {
                    "filter": "Id",
                    "display": "id"
                }, "orderable": true, "render": function (data, type, row, meta) {
                    return (meta.row + 1 + meta.settings._iDisplayStart) + '.';
                }
            },
            {
                data: {
                    "filter": "ReviewerName",
                    "display": "reviewerName"
                }, visible: true
            },
            {
                data: {
                    "filter": "ReviewerEmail",
                    "display": "reviewerEmail"
                }
            },
            {
                data: {
                    "filter": "ReviewerCategoryName",
                    "display": "reviewerCategoryName"
                }
            },
            {
                data: {
                    "filter": "CreatedDate",
                    "display": "createdDate"
                }, visible: false
            },
            {
                data: {
                    "filter": "FormattedCreatedDate",
                    "display": "formattedCreatedDate"
                }, orderData: 4
            },
            {
                data: {
                    "filter": "UpdatedDate",
                    "display": "updatedDate"
                }, visible: false
            },
            {
                data: {
                    "filter": "FormattedUpdatedDate",
                    "display": "formattedUpdatedDate"
                }, orderData: 6
            },
            {
                data: {
                    "filter": "Id",
                    "display": "id"
                }, "orderable": false, "render": function (data, type, row, meta) {
                    return row.reviewerCategoryId == 1 || row.reviewerCategoryId==2?'':`<div class="dropdown f14">
                                <button type="button" class="btn px-3 text-dark" data-toggle="dropdown">
                                    <i class="fa fa-ellipsis-v"></i>
                                </button>
                                <div class="dropdown-menu f14">
                                    <a class="dropdown-item edit" href="javascript:void(0)" rid="${data}">Edit</a>
                                    <a class="dropdown-item remove" href="javascript:void(0);" rid="${data}">Remove</a>

                                    <!--<div class="dropdown-divider"></div>
                                        <a class="dropdown-item remove" href="javascript:void(0);" rid="@r.Id">Remove</a>-->
                                </div>
                            </div>`;
                }
            },
        ]
    }).on('preXhr.dt', (e, settings, data) => {
        //data.sessionId = $('#sessionId').val();
        //data.startDate = $('#start').val() == '' ? null : $('#start').val();
        //data.endDate = $('#end').val() == '' ? null : $('#end').val();
    });


    $('#addBtn').on('click', (e) => {
        $('#addModal').modal({ backdrop: 'static', keyboard: false }, 'show');
    });

    // on add
    $('#createBtn').on('click', (e) => {
        e.preventDefault();
        let btn = $(e.currentTarget);
        try {
            let form = $("form")[0];
            if (validateForm(form)) {
                let reviewerCategoryId = $.trim($('#categoryId').val());
                let reviewerPersonNumber = $('#reviewerPN').val();

                if (reviewerCategoryId == '' || reviewerPersonNumber == '') {
                    notify('All fields are required', 'warning');
                } else {
                    $('fieldset').prop('disabled', true);
                    btn.html('<i class="fa fa-circle-notch fa-spin"></i> Adding reviewer...');
                    let url = $base + 'employees/AddEmployeeReviewer';
                    let data = {
                        reviewerCategoryId,
                        reviewerPersonNumber,
                        employeePersonNumber: employeePN
                    };
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: data,
                        success: (response) => {
                            if (response.isSuccess) {
                                reviewersTable.ajax.reload();
                                notify(response.message +'.', 'success');
                                //notify(response.message + '<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', 'success');
                                form.reset();
                                selectizedd[0].selectize.clear();
                                $('#addModal').modal('hide');
                                //setTimeout(() => {
                                //    location.reload();
                                //}, 1500);

                            } else {
                                notify(response.message, 'danger');
                            }
                            btn.html('<i class="fa fa-check-circle"></i> &nbsp;Submit');
                            $('fieldset').prop('disabled', false);
                        },
                        error: (req, status, err) => {
                            let res = req.responseJSON;
                            if (req.status == 401) {
                                notify(res.message, 'danger', "Unauthorized");
                            } else if (req.status == 400) {
                                let eItems = '';
                                if (res.errorItems != null) {
                                    eItems = '<ul>';
                                    res.errorItems.forEach((v, i) => {
                                        eItems += `<li>${i + 1}. ${v}</li>`;
                                    });
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
                            btn.html('<i class="fa fa-check-circle"></i> &nbsp;Submit');
                            $('fieldset').prop('disabled', false);
                        }
                    });
                }
            }
        } catch (ex) {
            console.error(ex);
            notify(ex.message, 'danger');
            btn.html('<i class="fa fa-check-circle"></i> &nbsp;Submit');
            $('fieldset').prop('disabled', false);
        }
    });

    // on edit
    $(document).on('click', '.edit', async (e) => {
        let rid = $(e.currentTarget).attr('rid');
        let loader = bootLoaderDialog('Fetching reviewer...');
        let reviewer = await getEmployeeReviewer(rid);
        loader.hide();

        $('#ecategoryId').val(reviewer.reviewerCategoryId);
        $selectize = selectizedd[1].selectize;
        $selectize.addOption(reviewer.reviewer);
        $selectize.addItem(reviewer.reviewer.personNumber);
        $selectize.setValue(reviewer.reviewer.personNumber);

        $('#updateBtn').attr('rid', rid);

        setTimeout(() => {
            $('#editModal').modal({ backdrop: 'static', keyboard: false }, 'show');
        }, 700);
    });

    // on update
    $('#updateBtn').on('click', (e) => {
        e.preventDefault();
        let btn = $(e.currentTarget);
        let rid = btn.attr('rid');
        try {
            let form = $("form")[1];
            if (validateForm(form)) {
                let reviewerCategoryId = $.trim($('#ecategoryId').val());
                let reviewerPersonNumber = $('#ereviewerPN').val();

                if (reviewerCategoryId == '' || reviewerPersonNumber == '') {
                    notify('All fields are required', 'warning');
                } else {
                    $('fieldset').prop('disabled', true);
                    btn.html('<i class="fa fa-circle-notch fa-spin"></i> Updating reviewer...');
                    let url = $base + 'employees/UpdateEmployeeReviewer';
                    let data = {
                        id:rid,
                        reviewerCategoryId,
                        reviewerPersonNumber,
                        employeePersonNumber: employeePN
                    };
                    $.ajax({
                        type: 'POST',
                        url: url,
                        data: data,
                        success: (response) => {
                            if (response.isSuccess) {
                                notify(response.message + '.', 'success');
                                reviewersTable.ajax.reload();
                                //notify(response.message + '<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', 'success');
                                form.reset();
                                selectizedd[1].selectize.clear();
                                $('#editModal').modal('hide');
                                //setTimeout(() => {
                                //    location.reload();
                                //}, 1500);

                            } else {
                                notify(response.message, 'danger');
                            }
                            btn.html('<i class="fa fa-check-circle"></i> &nbsp;Update');
                            $('fieldset').prop('disabled', false);
                        },
                        error: (req, status, err) => {
                            let res = req.responseJSON;
                            if (req.status == 401) {
                                notify(res.message, 'danger', "Unauthorized");
                            } else if (req.status == 400) {
                                let eItems = '';
                                if (res.errorItems != null) {
                                    eItems = '<ul>';
                                    res.errorItems.forEach((v, i) => {
                                        eItems += `<li>${i + 1}. ${v}</li>`;
                                    });
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
                            $('fieldset').prop('disabled', false);
                        }
                    });
                }
            }
        } catch (ex) {
            console.error(ex);
            notify(ex.message, 'danger');
            btn.html('<i class="fa fa-check-circle"></i> &nbsp;Submit');
            $('fieldset').prop('disabled', false);
        }
    });

    // on remove
    $(document).on('click', '.remove', async (e) => {
        let loader;
        let rid = $(e.currentTarget).attr('rid');
        bootConfirm('Are you sure you want to remove reviewer?', {
            title: 'Confirm Action', size: 'small', callback: async (res) => {
                if (res) {
                    try {
                       
                        loader = bootLoaderDialog('Removing reviewer...');
                        console.log(rid);
                        let message = await removeEmployeeReviewer(rid);
                        loader.hide();

                        notify(message + '.', 'success');
                        reviewersTable.ajax.reload();
                        //notify(message + '<br /><i class="fa fa-circle-notch fa-spin"></i> Refreshing...', 'success');
                        //setTimeout(() => {
                        //    location.reload();
                        //}, 1500);
                    } catch (ex) {
                        loader.hide();
                        console.error(ex);
                        notify(ex, 'danger');
                    }
                }
            }
        });

    });

});
function initializeReviewerDropdown() {
    var _select = $(".reviewerPN").selectize({
        valueField: "personNumber",
        searchField: ["email", "personNumber", "firstName", "lastName", "middleName"],
        placeholder: '- Search reviewer -',
        dropdownParent: 'body',
        create: false,
        preload:true,
        render: {
            option: function (item, escape) {
                return (
                    ` <div class="d-flex flex-row px-3 py-2 border-top">
                        <div>
                            <div class="rounded-circle p-1 mr-1 bg-blue" style="height:30px;width:30px;">
                                <p class="m-0 f14 text-center">${getInitial(item, escape)}</p>
                            </div>
                        </div>
                        <div class="flex-fill">
                            <p class="f14 mt-n1 font-weight-bold text-dark">${capitalize(escape(item.firstName).trim())} ${capitalize(escape(item.lastName).trim())}</p>
                            <p class="f12 mt-n1">${escape(item.email).trim()}</p>
                        </div>
                    </div>`
                );
            },
            item: function (item, escape) {
                return (
                    ` <div class="d-flex flex-row p-1">
                        <div>
                            <div class="rounded-circle p-1 mr-1 bg-blue" style="height:30px;width:30px;">
                                <p class="m-0 f14 text-center">${getInitial(item, escape)}</p>
                            </div>
                        </div>
                        <div class="flex-fill">
                            <p class="f14 mt-n1 font-weight-bold text-dark">${capitalize(escape(item.firstName).trim())} ${capitalize(escape(item.lastName).trim())}</p>
                            <p class="f12 mt-n1">${escape(item.email).trim()}</p>
                        </div>
                    </div>`
                );
            },
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: $base + 'employees/search?max=50&query=' + encodeURIComponent(query),
                type: "GET",
                error: function (err) {
                    console.log(err);
                    callback();
                },
                success: function (res) {
                    callback(res.data.filter(d => d.personNumber != employeePN));
                },
            });
        },
    });
    return _select;
}

function getEmployeeReviewer(id) {
    var promise = new Promise((resolve, reject) => {
        try {
            if (id == undefined || id == '' || id == 0) {
                reject('Invalid employee reviewer id');
            } else {
                let url = $base + 'employees/GetEmployeeReviewer/' + id;
                $.ajax({
                    type: 'GET',
                    url: url,
                    success: (response) => {
                        if (response.isSuccess) {
                            resolve(response.data);
                        } else {
                            reject(response.message);
                        }
                    },
                    error: (req, status, err) => {
                        let res = req.responseJSON;
                        if (req.status == 400) {
                            let eItems = '<ul>';
                            res.errorItems.forEach((v, i) => {
                                eItems += `<li>${i + 1}. ${v}</li>`;
                            });
                            eItems += '</ul>';
                            //notify(res.message + eItems, 'danger', "Validation Error");
                            reject(res.message);
                        } else if (req.status == 500) {
                            //notify(res.message, 'danger');
                            console.log(res.errorDetail);
                            reject(res.message);
                        } else {
                            reject('Something went wrong! Please try again.');
                            //notify('Something went wrong while submitting your request. Please refresh your browser and try again.', 'danger');
                            console.error(req);
                        }
                    }
                });
            }

        } catch (ex) {
            console.error(ex);
            //notify(ex.message, 'danger');
            reject(ex.message);
        }
    });
    return promise;
}

function removeEmployeeReviewer(id) {
    var promise = new Promise((resolve, reject) => {
        try {
            if (id == undefined || id == '' || id == 0) {
                reject('Invalid employee reviewer id');
            } else {
                let url = $base + 'employees/RemoveEmployeeReviewer/' + id;
                $.ajax({
                    type: 'GET',
                    url: url,
                    success: (response) => {
                        if (response.isSuccess) {
                            resolve(response.message);
                        } else {
                            reject(response.message);
                        }
                    },
                    error: (req, status, err) => {
                        let res = req.responseJSON;
                        if (req.status == 400) {
                            let eItems = '';
                            if (res.errorItems != null) {
                                eItems = '<ul>';
                                res.errorItems.forEach((v, i) => {
                                    eItems += `<li>${i + 1}. ${v}</li>`;
                                });
                                eItems += '</ul>';
                            }
                            reject(res.message + eItems);
                            //notify(res.message + eItems, 'danger', "Validation Error");
                        } else if (req.status == 500) {
                            //notify(res.message, 'danger');
                            console.log(res.errorDetail);
                            reject(res.message);
                        } else {
                            reject('Something went wrong! Please try again.');
                            //notify('Something went wrong while submitting your request. Please refresh your browser and try again.', 'danger');
                            console.error(req);
                        }
                    }
                });
            }

        } catch (ex) {
            console.error(ex);
            //notify(ex.message, 'danger');
            reject(ex.message);
        }
    });
    return promise;
}


function getInitial(item, escape) {
    var l1 = item.firstName == null ? "" : escape(item.firstName.trim())[0];
    var l2 = item.lastName == null ? "" : escape(item.lastName.trim())[0];
    return l1 + l2;
}

function capitalize(word) {
    var delimeters = [' ', '-', '(', ')'];
    if (word != null) {
        word = word.toLowerCase();
        delimeters.forEach(d => {
            word = word.split(d)
                .map((w, index) => {
                    if (w.length > 0) {
                        w = w[0].toUpperCase() + w.slice(1);
                        return w;
                    }
                }).join(d);
        });
    }
    return word;
}
