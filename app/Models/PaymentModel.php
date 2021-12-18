<?php

namespace App\Models;

use CodeIgniter\Model;

class PaymentModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'payments';
        $this->returnType = 'array';
        $this->allowedFields = [
            'application_id', 'amount', 'is_paid', 'date_paid'
        ];
    }
}
