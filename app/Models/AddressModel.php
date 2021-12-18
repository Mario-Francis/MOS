<?php

namespace App\Models;

use CodeIgniter\Model;

class AddressModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'addresses';
        $this->returnType = 'array';
        $this->allowedFields = [
            'applicant_id', 'area', 'street', 'house_no', 
            'apartment_no', 'landmark', 'description', 'updated_by'
        ];
    }
}
