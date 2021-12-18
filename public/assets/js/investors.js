$(() => {
    // initialize datatable
    let onboardingTable = $("#onboardingTable").DataTable({
      processing: true,
      serverSide: true,
      ajax: $base + "/backoffice/investors/api-onboarding-dt",
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
        { targets: 1, data: 2 },
        { targets: 2, data: 3 },
        { targets: 3, data: 1 },
        { targets: 4, data: 4 },
        { targets: 5, data: 5 },
        { targets: 6, data: 7 },
        {
          targets: 7,
          data: 0,
          orderable: false,
          render: (data, type, row, meta) => {
            //console.log(row);
            return `<a href="${$base}/backoffice/investors/${data}" class="btn btn-primary btn-sm f10 confirm" style="min-width: 70px;">View <i class="fa fa-chevron-right"></i></a>`;
          },
        },
      ],
    });

    let onboardedTable = $("#onboardedTable").DataTable({
        processing: true,
        serverSide: true,
        ajax: $base + "/backoffice/investors/api-onboarded-dt",
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
          { targets: 1, data: 2 },
          { targets: 2, data: 3 },
          { targets: 3, data: 1 },
          { targets: 4, data: 4 },
          { targets: 5, data: 5 },
          { targets: 6, data: 7 },
          {
            targets: 7,
            data: 0,
            orderable: false,
            render: (data, type, row, meta) => {
              //console.log(row);
              return `<a href="${$base}/backoffice/investors/${data}" class="btn btn-primary btn-sm f10 confirm" style="min-width: 70px;">View <i class="fa fa-chevron-right"></i></a>`;
            },
          },
        ],
      });
  
    
  });
  