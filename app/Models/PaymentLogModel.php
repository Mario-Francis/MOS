<?php

namespace App\Models;

use CodeIgniter\Model;

class PaymentLogModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'payment_logs';
        $this->returnType = 'array';
        $this->allowedFields = [
            'payment_id', 'payment_ref', 'is_success'
        ];
    }
}
