<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'users';
        $this->returnType = 'array';
        $this->allowedFields = [
            'role_id', 'first_name',  'last_name', 'code', 'email', 'phone_number', 'password', 
            'is_active', 'created_by', 'updated_by'
        ];
    }
}
