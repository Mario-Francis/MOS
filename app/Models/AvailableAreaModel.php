<?php

namespace App\Models;

use CodeIgniter\Model;

class AvailableAreaModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'available_areas';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name'
        ];
    }
}
