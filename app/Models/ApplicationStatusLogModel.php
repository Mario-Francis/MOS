<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicationStatusLogModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'application_status_logs';
        $this->returnType = 'array';
        $this->allowedFields = [
            'application_id',  'action_by', 'status', 'comment'
        ];
    }
}
