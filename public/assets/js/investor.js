var investorId = null;
$(() => {
  investorId = $("#investorId").val();
  // initialize datatable
  let accountsTable = $("#accountsTable").DataTable({
    processing: true,
    serverSide: true,
    ajax: $base + `/backoffice/investors/${investorId}/api-accounts-dt`,
    lengthChange: true,
    autoWidth: false,
    dom:
      "<'row'<'col-sm-12 col-lg-2'l><'col-sm-12 col-md-6 col-lg-5'B><'col-sm-12 col-md-6 col-lg-5'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    columnDefs: [
      {
        targets: 0,
        render: (data, type, row, meta) => {
          return meta.row + 1 + meta.settings._iDisplayStart + ".";
        },
      },
      { targets: 1, data: 1 },
      { targets: 2, data: 2 },
      { targets: 3, data: 3 },
      {
        targets: 4,
        data: 4,
        render: (data, type, row, meta) => {
          return formatStatus(data);
        },
      },
      {
        targets: 5,
        data: 5,
        render: (data, type, row, meta) => {
          return data==1?'Yes':'No';
        },
      },
      {
        targets: 6,
        data: 6,
        render: (data, type, row, meta) => {
            return data==1?'Yes':'No';
        },
      },
      { targets: 7, data: 7 },
      { targets: 8, data: 8 },
      { targets: 9, data: 9 },
      {
        targets: 10,
        data: 0,
        orderable: false,
        render: (data, type, row, meta) => {
          //console.log(row);
          return `<a href="${$base}/backoffice/accounts/${data}/payments" class="btn btn-primary btn-sm f10 confirm" style="min-width: 100px;">View Payments <i class="fa fa-chevron-right"></i></a>`;
        },
      },
    ],
  });

  let paymentsTable = $("#paymentsTable").DataTable({
    processing: true,
    serverSide: true,
    ajax: $base + `/backoffice/payments/api-investor-payments-dt/${investorId}`,
    lengthChange: true,
    autoWidth: false,
    dom:
      "<'row'<'col-sm-12 col-lg-2'l><'col-sm-12 col-md-6 col-lg-5'B><'col-sm-12 col-md-6 col-lg-5'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    columnDefs: [
      {
        targets: 0,
        render: (data, type, row, meta) => {
          return meta.row + 1 + meta.settings._iDisplayStart + ".";
        },
      },
      { targets: 1, data: 1 },
      { targets: 2, data: 2 },
      { targets: 3, data: 3 },
      {
        targets: 4,
        data: 4,
        render: (data, type, row, meta) => {
          return data;
        },
      },
      {
        targets: 5,
        data: 5,
        render: (data, type, row, meta) => {
          return data;
        },
      },
      {
        targets: 6,
        data: 6,
        render: (data, type, row, meta) => {
            return data;
        },
      },
      { targets: 7, data: 7 },
      { targets: 8, data: 8,render: (data, type, row, meta) => {
        //console.log(row);
        return formatPayStatus(data);
      }, },
      { targets: 9, data: 9 },
      { targets: 10, data: 10 },
      {
        targets: 11,
        data: 0,
        orderable: false,
        render: (data, type, row, meta) => {
          //console.log(row);
          return `<a href="${$base}/backoffice/payments/${data}" class="btn btn-primary btn-sm f10 confirm" style="min-width: 100px;">View Details <i class="fa fa-chevron-right"></i></a>`;
        },
      },
    ],
  });

});

function formatStatus(status) {
  switch (status) {
    case "ACTIVE":
      return '<span class="badge badge-success rounded-pill p-2">Active</span>';
      break;
    case "INACTIVE":
      return '<span class="badge badge-secondary rounded-pill p-2">Inactive</span>';
      break;
      case "CLOSED":
      return '<span class="badge badge-info rounded-pill p-2">Closed</span>';
      break;
      case "SUSPENDED":
      return '<span class="badge badge-danger rounded-pill p-2">Suspended</span>';
      break;
  }
}

function formatPayStatus(status) {
    switch (status) {
      case "PAID":
        return '<span class="badge badge-success rounded-pill p-2">Paid <i class="fa fa-check-circle"></i></span>';
        break;
      case "UNPAID":
        return '<span class="badge badge-info rounded-pill p-2">Unpaid <i class="fa fa-info-circle"></i></span>';
        break;
        case "PENDING_CONFIRMATION":
        return '<span class="badge badge-secondary rounded-pill p-2">Pending <i class="fa fa-history"></i></span>';
        break;
        case "NOT_RECEIVED":
        return '<span class="badge badge-danger rounded-pill p-2">Not Received <i class="fa fa-times-circle"></i></span>';
        break;
    }
  }
