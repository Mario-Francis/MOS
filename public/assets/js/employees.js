$(() => {
    // initialize datatable
    var batchTable = $('#employeesTable').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: $base + 'employees/EmployeesDataTable',
            type: "POST"
        },
        "order": [[2, "asc"]],
        "lengthMenu": [10, 20, 30, 50, 100],
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
                    "filter": "PersonNumber",
                    "display": "personNumber"
                }, visible: false
            },
            {
                data: {
                    "filter": "FirstName",
                    "display": "firstName"
                }
            },
            {
                data: {
                    "filter": "MiddleName",
                    "display": "middleName"
                }
            },
            {
                data: {
                    "filter": "LastName",
                    "display": "lastName"
                }
            },
            {
                data: {
                    "filter": "Email",
                    "display": "email"
                }
            },
            {
                data: {
                    "filter": "Gender",
                    "display": "gender"
                }
            },
            //{
            //    data: {
            //        "filter": "JobGrade",
            //        "display": "jobGrade"
            //    }
            //},
            //{
            //    data: {
            //        "filter": "CareerLevel",
            //        "display": "careerLevel"
            //    }
            //},
            {
                data: {
                    "filter": "CadreLevel",
                    "display": "cadreLevel"
                }
            },
            //{
            //    data: {
            //        "filter": "LegalEntity",
            //        "display": "legalEntity"
            //    }
            //},
            {
                data: {
                    "filter": "IsActive",
                    "display": "isActive"
                }, "render": function (data, type, row, meta) {
                    return data ? 'Active' : 'Inactive';
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
                }, orderData: 9
            },
            {
                data: {
                    "filter": "Id",
                    "display": "id"
                }, "orderable": false, "render": function (data, type, row, meta) {
                    return '<div class="dropdown f14">'
                        + '<button type="button" class="btn px-3" data-toggle="dropdown">'
                        + '<i class="fa fa-ellipsis-v"></i>'
                        + '</button>'
                        + '<div class="dropdown-menu f14">'
                        + `<a class="dropdown-item" href="${$base + 'employees/' + row.personNumber}" >View Details</a>`
                        + `<a class="dropdown-item" href="${$base + 'employees/' + row.personNumber+'/reviewers'}" >View Reviewers</a>`
                        + '</div>'
                        + '</div>';
                }
            },
        ]
    }).on('preXhr.dt', (e, settings, data) => {
        //data.sessionId = $('#sessionId').val();
        //data.startDate = $('#start').val() == '' ? null : $('#start').val();
        //data.endDate = $('#end').val() == '' ? null : $('#end').val();
    });

    // filterbtn click
    //$('#filterBtn').on('click', (e) => {
    //    batchTable.ajax.reload();
    //});

    //// on submit
    //$(document).on('click', '.submit', (e) => {
    //    bootConfirm('You will not be able to make any modification to this batch after submission. Do you wish to continue?', {
    //        title: 'Confirm Submission', okBtnText: 'Yes', cancelBtnText: 'No', callback: async (res) => {
    //            if (res) {
    //                let id = $(e.target).attr('bid');
    //                let loader = bootLoaderDialog('Submitting batch...');
    //                try {
    //                    let data = await updateBatchStatus(id, BATCH_STATUS_SUBMITTED);
    //                    loader.hide();

    //                    setTimeout(() => {
    //                        if (data.success) {
    //                            notify('Batch was submitted successfully.', 'success');
    //                            batchTable.ajax.reload();
    //                        } else {
    //                            notify(data.message, 'danger');
    //                        }
    //                    }, 700);
    //                } catch (ex) {
    //                    console.error(ex);
    //                    loader.hide();
    //                    notify(ex.message, 'danger');
    //                }
    //            }
    //        }
    //    });
    //});

    //// get batch comment
    //$(document).on('click', '.comment', async (e) => {
    //    let id = $(e.target).attr('bid');
    //    let loader = bootLoaderDialog('Fetching comment...');
    //    try {
    //        let data = await getBatchComment(id);
    //        loader.hide();

    //        setTimeout(() => {
    //            if (data.success) {
    //                bootAlert(data.comment, { title: `Rejection Comment for Batch #${pad('000000', id, true)}`, size: 'medium' })
    //            } else {
    //                notify(data.message, 'danger');
    //            }
    //        }, 700);
    //    } catch (ex) {
    //        console.error(ex);
    //        loader.hide();
    //        notify(ex.message, 'danger');
    //    }
    //});

    //// on reject
    //$(document).on('click', '.reject', (e) => {
    //    bootConfirm('Do you wish to reject this batch?', {
    //        title: 'Confirm Action', okBtnText: 'Yes', cancelBtnText: 'No', callback: async (res) => {
    //            if (res) {
    //                try {
    //                    var promptResult = await bootPrompt('Comment', { message: 'Enter rejection comment', type: 'textarea' });
    //                    if (promptResult.success) {
    //                        var comment = promptResult.data;
    //                        let id = $(e.target).attr('bid');
    //                        let loader = bootLoaderDialog('Rejecting batch...');
    //                        try {
    //                            let data = await updateBatchStatus(id, BATCH_STATUS_REJECTED, { comment: comment });
    //                            loader.hide();

    //                            setTimeout(() => {
    //                                if (data.success) {
    //                                    notify('Batch was rejected successfully.', 'success');
    //                                    batchTable.ajax.reload();
    //                                } else {
    //                                    notify(data.message, 'danger');
    //                                }
    //                            }, 700);
    //                        } catch (ex) {
    //                            console.error(ex);
    //                            loader.hide();
    //                            notify(ex.message, 'danger');
    //                        }
    //                    }
    //                } catch (ex) {
    //                    console.error(ex);
    //                    notify(ex.message, 'danger');
    //                }

    //            }
    //        }
    //    });
    //});

    //// on authorize
    //$(document).on('click', '.authorize', (e) => {
    //    bootConfirm('Do you wish to authorize this batch?', {
    //        title: 'Confirm Action', okBtnText: 'Yes', cancelBtnText: 'No', callback: async (res) => {
    //            if (res) {
    //                let id = $(e.target).attr('bid');
    //                let loader = bootLoaderDialog('Authorizing batch...');
    //                try {
    //                    let data = await updateBatchStatus(id, BATCH_STATUS_AUTHORIZED);
    //                    loader.hide();

    //                    setTimeout(() => {
    //                        if (data.success) {
    //                            notify('Batch was authorized successfully.', 'success');
    //                            batchTable.ajax.reload();
    //                        } else {
    //                            notify(data.message, 'danger');
    //                        }
    //                    }, 700);
    //                } catch (ex) {
    //                    console.error(ex);
    //                    loader.hide();
    //                    notify(ex.message, 'danger');
    //                }
    //            }
    //        }
    //    });
    //});


});



