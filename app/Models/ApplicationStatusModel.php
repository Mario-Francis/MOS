<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationStatusModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'application_statuses';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name'
        ];
    }
}
