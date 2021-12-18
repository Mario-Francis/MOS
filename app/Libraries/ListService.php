<?php

namespace App\Libraries;

use App\Models\ApplicationStatusModel;
use App\Models\AvailableAreaModel;
use App\Models\ElectricApplianceModel;
use App\Models\HouseTypeModel;
use App\Models\MeterModel;
use App\Models\RoleModel;

class ListService
{
    protected $application_status_model;
    protected $area_model;
    protected $appliance_model;
    protected $house_type_model;
    protected $meter_model;
    protected $role_model;

    public function __construct(
        ApplicationStatusModel $application_status_model,
        AvailableAreaModel $area_model,
        ElectricApplianceModel $appliance_model,
        HouseTypeModel $house_type_model,
        MeterModel $meter_model,
        RoleModel $role_model
    ) {
        $this->application_status_model=$application_status_model;
        $this->area_model=$area_model;
        $this-> appliance_model=$appliance_model;
        $this->house_type_model=$house_type_model;
        $this->meter_model=$meter_model;
        $this->role_model=$role_model;
    }

    public function get_areas(){
        return $this->area_model->orderBy('name', 'asc')->findAll();
    }

    public function get_appliances(){
        return $this->appliance_model->orderBy('name', 'asc')->findAll();
    }

    public function get_house_types(){
        return $this->house_type_model->orderBy('id', 'asc')->findAll();
    }

    public function get_meters(){
        return $this->meter_model->orderBy('id', 'asc')->findAll();
    }
    public function get_roles(){
        return $this->role_model->orderBy('id', 'asc')->findAll();
    }
}
