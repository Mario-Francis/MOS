<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title><?= $title ?> | MOS</title>
    <link href="<?= base_url('assets/lib/animate.css/animate.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/css/styles.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/lib/boxicons/css/boxicons.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/lib/font-awesome/css/all.css'); ?>" rel="stylesheet" />
    <!-- <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
    <link href="<?= base_url('assets/lib/Zebra_datepicker/css/bootstrap/zebra_datepicker.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/lib/selectize.js/css/selectize.bootstrap4.css'); ?>" rel="stylesheet" /> -->

    <?= $this->renderSection('css') ?>

    <link href="<?= base_url('assets/css/fonts.css'); ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/css/main.css'); ?>" rel="stylesheet" />
</head>

<body class="dashboard-bg">

    <div class="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="#">
                <img src="<?= base_url('assets/img/eraskorp_logo.png'); ?>" style="" class="d-inline-block align-top" alt="">

            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <!-- <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled">Disabled</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> -->
            </div>
        </nav>
        <div class="row" style="min-height:calc(100vh - 200px);">
            <div class="col-12">
                <div class="container p-0">
                <?= $this->renderSection('body') ?>
                </div>
            </div>
            
        </div>
        

        <div class="text-white p-3 f14 mt-5" style="bottom:0;">
            <p class="text-center">Copyright &copy; 2021 Eraskorp. All rights reserved.</p>
        </div>
    </div>
    <script src="<?= base_url('assets/lib/jquery/jquery.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/twitter-bootstrap/js/bootstrap.bundle.js'); ?>"></script>
    <script src="<?= base_url('assets/js/scripts.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/bootstrap-notify/bootstrap-notify.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/sweetalert2/dist/sweetalert2.all.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/bootbox.js/bootbox.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/js-cookie/js.cookie.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/accounting.js/accounting.js'); ?>"></script>
    <script src="<?= base_url('assets/js/notify.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/Zebra_datepicker/zebra_datepicker.min.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/selectize.js/js/standalone/selectize.js'); ?>"></script>
    <script src="<?= base_url('assets/lib/moment.js/moment.js'); ?>"></script>
    <script src="<?= base_url('assets/js/utilities.js'); ?>"></script>
    <script src="<?= base_url('assets/js/culture.js'); ?>"></script>
    <script src="https://js.paystack.co/v1/inline.js"></script>
    <script>
        $base = '<?= base_url(); ?>';
        // roles
    </script>
<?= $this->renderSection('js') ?>
</body>

</html>