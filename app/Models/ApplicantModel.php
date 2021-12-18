<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicantModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'applicants';
        $this->returnType = 'array';
        $this->allowedFields = [
            'first_name', 'last_name', 'email', 'phone_number', 
            'updated_by'
        ];
    }
}
