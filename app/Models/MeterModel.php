<?php

namespace App\Models;

use CodeIgniter\Model;

class MeterModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'meters';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name', 'description', 'amount', 'image_path'
        ];
    }
}
