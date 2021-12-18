<?php

namespace App\Models;

use CodeIgniter\Model;

class ElectricApplianceModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'electric_appliances';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name'
        ];
    }
}
