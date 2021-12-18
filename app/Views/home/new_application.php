<?= $this->extend('shared/home_layout') ?>

<?= $this->section('body') ?>
<div class="row">
    <div class="col-12">
        <div class="px-3 py-2" style="border-left: 3px solid #1C5B91;">
            <h6 class="roboto text-white f18 font-weight-bold">PREPAID METER <br />APPLICATION PORTAL</h1>
        </div>
    </div>
</div>
<div class="row" style="margin-top: 5vh;">
    <div class="col-sm-12">
        <div class="card shadow">
            <div class="card-header">
                <h5 class="m-0">Application Form <span class="float-right f16 text-danger mt-2" style="cursor:pointer;" title="Quit application"><i class="fa fa-times"></i></span></h5>
            </div>
            <div class="card-body">
                <div class="border-bottom mb-2">
                    <ul id="progressbar" class="p-0 mb-2">
                        <li class="active" id="stage1">
                            <p class="text-center f12 d-none d-md-block">Basic Info</p>
                        </li>
                        <li id="stage2">
                            <p class="text-center f12 d-none d-md-block">House Description</p>
                        </li>
                        <li id="stage3">
                            <p class="text-center f12 d-none d-md-block">Appliances</p>
                        </li>
                        <li id="stage4">
                            <p class="text-center f12 d-none d-md-block">Payment</p>
                        </li>
                        <li id="stage5">
                            <p class="text-center f12 d-none d-md-block">Finish</p>
                        </li>
                    </ul>
                </div>
                <div id="stage1_div" class="px-3 py-2">
                    <form id="form1">
                        <h5>Basic Info</h4>
                            <fieldset>
                                <legend class="f14 font-weight-bold">Personal Details</legend>
                                <hr class="mt-0 mb-2 w-50 ml-0" />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="fname" class="f14">* First Name</label>
                                            <input type="text" id="fname" class="form-control" placeholder="Enter first name" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="lname" class="f14">* Last Name</label>
                                            <input type="text" id="lname" class="form-control" placeholder="Enter last name" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="email" class="f14">* Email</label>
                                            <input type="email" id="email" class="form-control" placeholder="Enter email" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="phone" class="f14">* Phone Number</label>
                                            <input type="tel" id="phone" class="form-control" placeholder="Enter phone number" required />
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend class="f14 font-weight-bold">Address</legend>
                                <hr class="mt-0 mb-2 w-50 ml-0" />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="area" class="f14">* Region/Area</label>
                                            <select id="area" class="form-control custom-select" required>
                                                <option value="">- Select area/region -</option>
                                                <?php foreach ($areas as $a) : ?>
                                                    <option value="<?= $a['id'] ?>"><?= $a['name'] ?></option>
                                                <?php endforeach ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="street" class="f14">* Street</label>
                                            <input type="text" id="street" class="form-control" placeholder="Enter street" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="houseno" class="f14">* House/Block Number</label>
                                            <input type="text" id="houseno" class="form-control" placeholder="Enter house/block number" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="apartno" class="f14">Apartment Number</label>
                                            <input type="text" id="apartno" class="form-control" placeholder="Enter apartment number" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="landmark" class="f14">* Landmark/Nearest bus stop</label>
                                            <input type="text" id="landmark" class="form-control" placeholder="Enter landmark/nearest bus stop" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="descrip" class="f14">Description</label>
                                            <textarea id="descrip" class="form-control" placeholder="Provide more  information to help in locating you" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <!-- <hr class="my-2" />
                        <div class="">

                        </div> -->
                    </form>
                </div>
                <div id="stage2_div" class="px-3 py-2" style="display: none;">
                    <form id="form2">
                        <h5>House Description</h4>
                            <fieldset>
                                <legend class="f14 font-weight-bold">Meter</legend>
                                <hr class="mt-0 mb-2 w-50 ml-0" />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="meter" class="f14">* Meter type of choice</label>
                                            <select id="meter" class="form-control custom-select" required>
                                                <option value="">- Select meter type -</option>
                                                <?php foreach ($meters as $m) : ?>
                                                    <option value="<?= $m['id'] ?>"><?= $m['name'] ?></option>
                                                <?php endforeach ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend class="f14 font-weight-bold">House Features</legend>
                                <hr class="mt-0 mb-2 w-50 ml-0" />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="housetype" class="f14">* What type of house do you live in?</label>
                                            <select id="housetype" class="form-control custom-select" required>
                                                <option value="">- Select house type -</option>
                                                <?php foreach ($house_types as $h) : ?>
                                                    <option value="<?= $h['id'] ?>"><?= $h['name'] ?></option>
                                                <?php endforeach ?>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="roomcount" class="f14">* Number of rooms</label>
                                            <input type="number" id="roomcount" class="form-control" placeholder="Enter number of rooms" min="1" max="50" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="haspet" class="f14">* Do you have pets?</label>
                                            <select id="haspet" class="form-control custom-select" required>
                                                <option value="">- Select option -</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 petcount" style="display: none;">
                                        <div class="form-group">
                                            <label for="petcount" class="f14">* If yes, how many?</label>
                                            <input type="number" id="petcount" class="form-control" placeholder="Enter number of pets" min="1" max="50" />
                                        </div>
                                    </div>

                                </div>
                            </fieldset>

                            <!-- <hr class="my-2" />
                        <div class="">

                        </div> -->

                    </form>
                </div>
                <div id="stage3_div" class="px-3 py-2" style="display: none;">
                    <form id="form3">
                        <h5>Appliances</h4>
                            <fieldset>
                                <legend class="f14 font-weight-bold">Choose/enter appliances that applies to you and the number for each</legend>
                                <hr class="mt-0 mb-2 w-50 ml-0" />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="appliance" class="f14">* Electric appliances</label>
                                            <select id="appliance" class="form-control custom-select" required>
                                                <option value="">- Select appliance -</option>
                                                <?php foreach ($appliances as $a) : ?>
                                                    <option value="<?= $a['name'] ?>"><?= $a['name'] ?></option>
                                                <?php endforeach ?>
                                            </select>
                                            <input type="text" id="other_appliance" style="display: none;" class="form-control mt-1" placeholder="Enter appliance name" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="appliance_count" class="f14">* Number of appliance</label>
                                            <input type="number" id="appliance_count" class="form-control" placeholder="Enter number of appliance" min="1" max="20" required />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <hr class="mt-1 mb-2" />
                                        <p class="text-right">
                                            <button type="button" id="addApplianceBtn" class="btn btn-primary btn-sm f12"><i class="fa fa-plus-circle"></i> &nbsp;Add Appliance</button>
                                        </p>
                                    </div>
                                    <div class="col-md-12">
                                        <!-- <hr class="my-2" /> -->
                                        <div class="table-responsive mt-3">
                                            <table id="appliancesTable" class="table table-sm f14 table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Appliance</th>
                                                        <th>Count</th>
                                                        <th style="width:120px;">&nbsp;</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>

                            <!-- <hr class="my-2" />
                        <div class="">

                        </div> -->
                    </form>
                </div>
                <div id="stage4_div" class="px-3 py-2" style="display: none;">
                    <form id="form4">
                        <div class="row">
                            <div class="offset-md-2 offset-lg-3 col-lg-6 col-md-8">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th colspan="2">
                                                    <h5 class="m-0">Payment</h4>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Meter of choice</th>
                                                <td id="meter_sp"></td>
                                            </tr>
                                            <tr>
                                                <th>Total amount due</th>
                                                <td>&#8358;<span id="amount_sp"></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p class="text-right">
                                    <button type="button" id="payBtn" class="btn btn-sm px-3 btn-primary"><i class="fa fa-info-circle"></i> Pay Now</button>
                                </p>
                            </div>
                        </div>


                        <!-- <hr class="my-2" />
                        <div class="">

                        </div> -->
                    </form>
                </div>
                <div id="stage5_div" class="px-3 py-2" style="display: none;">
                    <div class="row">
                        <div class="offset-md-2 offset-lg-3 col-lg-6 col-md-8">
                            <p class="text-center text-success">
                                <i class="fa fa-check-circle fa-8x"></i>
                            </p>
                            <h4 class="text-center mt-3">Completed successfully!</h4>
                            <div class="alert alert-info">
                                Your application has been received and your tracking number is <b><span id="tracknosp"></span></b>. One of our agent will reach out to you for meter delivery and installation within 3 to 4 business days. Please note you will not be charged for installation.
                            </div>
                            <p class="text-center">
                                <button type="button" id="okBtn" class="btn btn-sm px-3 btn-primary"><i class="fa fa-check-circle"></i> OK</button>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="card-footer d-flex flex-row">
                <input type="hidden" id="key" value="<?= $pay_key ?>" />
                <div>
                    <button type="button" class="btn btn-danger btn-sm px-3" id="cancelBtn"><i class="fa fa-times"></i> Cancel</button>
                    <button type="button" class="btn btn-primary btn-sm px-3" id="prevBtn"><i class="fa fa-chevron-left"></i> &nbsp;Previous</button>
                </div>
                <div class="ml-auto">
                    <button type="button" class="btn btn-primary btn-sm px-3" id="nextBtn">Next &nbsp;<i class="fa fa-chevron-right"></i></button>
                    <button type="button" class="btn btn-success btn-sm px-3 d-none" id="finishBtn"><i class="fa fa-check-circle"></i> &nbsp;Finish</button>
                </div>
            </div>
        </div>
    </div>
</div>

<?= $this->endSection() ?>

<?= $this->section('css') ?>
<link href="<?= base_url('assets/lib/datatables.net-bs4/css/dataTables.bootstrap4.css') ?>" rel="stylesheet" />
<!-- <link href="<?= base_url('assets/lib/chosen_v1.8.7/chosen.min.css') ?>" rel="stylesheet" /> -->
<?= $this->endSection() ?>

<?= $this->section('js') ?>
<!-- <script src="~/lib/Chart.js/chart.js"></script>
<script src="~/lib/chartjs-plugin-datalabels/chartjs-plugin-datalabels.js"></script> -->
<script src="<?= base_url('assets/lib/datatables.net/jquery.dataTables.js') ?>"></script>
<script src="<?= base_url('assets/lib/datatables.net-bs4/js/dataTables.bootstrap4.js') ?>"></script>

<!-- <script src="<?= base_url('assets/lib/chosen_v1.8.7/chosen.jquery.min.js') ?>"></script>
<script src="<?= base_url('assets/js/complete_profile.js') ?>"></script> -->

<script src="<?= base_url('assets/js/new_application.js') ?>"></script>
<?= $this->endSection() ?>