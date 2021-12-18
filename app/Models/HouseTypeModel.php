<?php

namespace App\Models;

use CodeIgniter\Model;

class HouseTypeModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'house_types';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name'
        ];
    }
}
