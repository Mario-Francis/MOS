<?php

namespace App\Libraries;

use App\Models\AddressModel;
use App\Models\ApplicantModel;
use App\Models\ApplicationApplianceModel;
use App\Models\ApplicationModel;
use App\Models\ApplicationStatusLogModel;
use App\Models\AvailableAreaModel;

class ApplicationService
{
    protected $address_model;
    protected $applicant_model;
    protected $application_appliance_model;
    protected $application_model;
    protected $application_status_log_model;

    public function __construct(
        AddressModel $address_model,
        ApplicantModel $applicant_model,
        ApplicationApplianceModel $application_appliance_model,
        ApplicationModel $application_model,
        ApplicationStatusLogModel $application_status_log_model
    ) {
        $this->address_model = $address_model;
        $this->applicant_model = $applicant_model;
        $this->application_appliance_model = $application_appliance_model;
        $this->application_model = $application_model;
        $this->application_status_log_model = $application_status_log_model;
    }

    public function create_application($applicant_data, $application_data, $address_data, $appliances_data){
        // insert aplpicant
        $applicant_data['updated_by'] = $applicant_data['email'];
        $applicant_id = $this->applicant_model->insert($applicant_data);

        // insert address
        $address_data['applicant_id'] = $applicant_id;
        $address_data['updated_by'] = $applicant_data['email'];
        $address_id = $this->address_model->insert($address_data);

        // insert application
        $application_data['applicant_id'] = $applicant_id;
        $application_data['updated_by'] = $applicant_data['email'];
        $application_id = $this->application_model->insert($application_data);

        // insert appliances
        for($i=0;$i<count($appliances_data);$i++){
            $appliances_data[$i]['application_id'] = $application_id;
        }
        $this->application_appliance_model->insertBatch($appliances_data);

        // update track no
        $trackno = $this->generate_trackno($application_id);
        $this->application_model->update($application_id, ['track_no'=> $trackno]);

        return ['trackno'=>$trackno, 'application_id'=>$application_id];
    }


    public function update_status($application_id, $status){
        $this->application_model->update($application_id, ['status'=> $status]);
    }

    private function generate_trackno($application_id){
        return random_string('alnum', 5) . $application_id . random_string('alnum', 5);
    }

}
