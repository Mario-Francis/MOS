<?= $this->extend('shared/home_layout') ?>

<?= $this->section('body') ?>
<div class="row" style="margin-top: 15vh;">
    <div class="col-sm-12">
        <div class="p-3" style="border-left: 5px solid #1C5B91;">
            <h1 class="roboto text-white f50 font-weight-bold">PREPAID METER <br />APPLICATION PORTAL</h1>
            <a href="<?= base_url('application/apply') ?>" class="btn btn-success btn-lg px-5 mt-4">Apply Now</a>
        </div>
    </div>
</div>
<div class="row" style="margin-top: 20px;">
    <div class="col-sm-12">
        <hr style="border-top: 1px solid #777;" class="w-50 ml-0" />
        <h5 class="text-light open-sans">Already applied?</h5>
        <div class="row">
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <!-- <label for="tno"></label> -->
                        <input type="text" id="tno" class="form-control" placeholder="Enter tracking number" />
                        <p class="text-right mt-2">
                            <button type="submit" id="trackBtn" class="btn btn-primary px-3">Track application</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?= $this->endSection() ?>

<?= $this->section('css') ?>
<!-- <link href="~/lib/datatables.net-bs4/css/dataTables.bootstrap4.css" rel="stylesheet" /> -->
<!-- <link href="<?= base_url('assets/lib/chosen_v1.8.7/chosen.min.css') ?>" rel="stylesheet" /> -->
<?= $this->endSection() ?>

<?= $this->section('js') ?>
<!-- <script src="~/lib/Chart.js/chart.js"></script>
<script src="~/lib/chartjs-plugin-datalabels/chartjs-plugin-datalabels.js"></script>
<script src="~/lib/datatables.net/jquery.dataTables.js"></script>
<script src="~/lib/datatables.net-bs4/js/dataTables.bootstrap4.js"></script> -->
<!-- <script src="<?= base_url('assets/lib/chosen_v1.8.7/chosen.jquery.min.js') ?>"></script>
<script src="<?= base_url('assets/js/complete_profile.js') ?>"></script> -->
<?= $this->endSection() ?>