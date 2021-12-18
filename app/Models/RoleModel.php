<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'roles';
        $this->returnType = 'array';
        $this->allowedFields = [
            'name'
        ];
    }
}
