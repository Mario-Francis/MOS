$(() => {
    // initialize datatable
    var historyTable = $('#historyTable').DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: $base + 'employees/MappingUploadHistoryDataTable',
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
                    "filter": "FileName",
                    "display": "fileName"
                }
            },
            {
                data: {
                    "filter": "FilePath",
                    "display": "filePath"
                }, visible: false
            },
            {
                data: {
                    "filter": "DateUploaded",
                    "display": "dateUploaded"
                }, visible: false
            },
            {
                data: {
                    "filter": "FormattedDateUploaded",
                    "display": "formattedDateUploaded"
                }, orderData: 3
            },
            {
                data: {
                    "filter": "CreatedBy",
                    "display": "createdBy"
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
                }, orderData: 6
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
                        + `<a class="dropdown-item" href="${$base  + ''+row.filePath}" >Download</a>`
                        //+ `<a class="dropdown-item" href="${$base + 'employees/' + row.personNumber + '/reviewers'}" >View Reviewers</a>`
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



