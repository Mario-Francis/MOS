<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationApplianceModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'application_appliances';
        $this->returnType = 'array';
        $this->allowedFields = [
            'application_id', 'appliance', 'count'
        ];
    }
}
