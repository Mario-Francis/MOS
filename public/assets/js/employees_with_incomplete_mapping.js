$(() => {
    // initialize datatable
    var batchTable = $('#employeesTable').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: $base + 'employees/IncompleteMappingDataTable',
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
                        + `<a class="dropdown-item" href="${$base + 'employees/' + row.personNumber + '/reviewers'}" >View Reviewers</a>`
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

});



