<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'applications';
        $this->returnType = 'array';
        $this->allowedFields = [
            'applicant_id', 'has_pets', 'pets_count', 'meter_id', 
            'house_type_id',  'rooms_count', 'track_no', 'status', 'updated_by'
        ];
    }
}
