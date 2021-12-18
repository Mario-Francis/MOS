<?php

namespace App\Libraries;

use App\Models\MeterModel;

class MeterService
{
    protected $meter_model;

    public function __construct(MeterModel $meter_model) {
        $this->meter_model=$meter_model;
    }

    public function get_meter($id){
        return $this->meter_model->find($id);
    }

}
