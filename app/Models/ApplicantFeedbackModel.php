<?php

namespace App\Models;

use CodeIgniter\Model;

class ApplicantFeedbackModel extends BaseModel
{
    public function initialize()
    {
        $this->table = 'applicant_feedbacks';
        $this->returnType = 'array';
        $this->allowedFields = [
            'applicant_id', 'application_id', 'rating', 'comment'
        ];
    }
}
