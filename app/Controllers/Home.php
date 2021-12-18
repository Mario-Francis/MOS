<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        $data['title'] = 'Home';

        return $this->view('index', $data);
    }

    public function new_application()
    {
        $data['title'] = 'New Application';
        $data['areas'] = $this->list_service->get_areas();
        $data['meters'] = $this->list_service->get_meters();
        $data['house_types'] = $this->list_service->get_house_types();
        $data['appliances'] = $this->list_service->get_appliances();
        $data['pay_key'] = env('paystack.pkey');

        return $this->view('new_application', $data);
    }

    private function view($page = 'index', $data = [])
    {
        if (!is_file(APPPATH . '/Views/home/' . $page . '.php')) {
            throw new \CodeIgniter\Exceptions\PageNotFoundException($page);
        }

        //$data['session'] = $this->session;
        echo view('home/' . $page, $data);
    }

    // ================ API functions =====================
    public function api_save_application()
    {
        try {
            if (!$this->validate([
                'first_name' => 'required|min_length[2]|max_length[255]',
                'last_name'  => 'required|min_length[2]|max_length[255]',
                'email'  => 'valid_email',
                'phone_number'  => 'required',
                'area'  => 'required',
                'street'  => 'required',
                'house_no'  => 'required',
                'landmark'  => 'required',
                'meter_id'  => 'required',
                'house_type_id'  => 'required',

                'rooms_count'  => 'required',
                'appliances'  => 'required'
            ])) {
                return $this->response->setStatusCode(400)->setJSON(
                    [
                        'success' => false,
                        'message' => 'Validation failed',
                        'error_list' => $this->validator->getErrors()
                    ]
                );
            } else {
                $applicant_data = [
                    'first_name' => $this->request->getJsonVar('first_name'),
                    'last_name'  => $this->request->getJsonVar('last_name'),
                    'email'  => $this->request->getJsonVar('email'),
                    'phone_number'  => $this->request->getJsonVar('phone_number')
                ];

                $application_data = [
                    'has_pets' => $this->request->getJsonVar('has_pets'),
                    'pets_count' => $this->request->getJsonVar('pets_count'),
                    'meter_id' => $this->request->getJsonVar('meter_id'),
                    'house_type_id' => $this->request->getJsonVar('house_type_id'),
                    'rooms_count' => $this->request->getJsonVar('rooms_count'),
                    'status' => 1,
                ];

                $address_data = [
                    'area'  => $this->request->getJsonVar('area'),
                    'street'  => $this->request->getJsonVar('street'),
                    'house_no'  => $this->request->getJsonVar('house_no'),
                    'apartment_no'  => $this->request->getJsonVar('apartment_no') == '' ? null : $this->request->getJsonVar('apartment_no'),
                    'landmark'  => $this->request->getJsonVar('landmark'),
                    'description'  => $this->request->getJsonVar('description') == '' ? null : $this->request->getJsonVar('description'),
                ];

                //print_r($this->request->getJSON(true)['appliances']);die();
                $appliances_data = $this->request->getJSON(true)['appliances'];

                $application_res = $this->application_service->create_application($applicant_data, $application_data, $address_data, $appliances_data);
                $trackno = $application_res['trackno'];
                $application_id = $application_res['application_id'];
                $amount = $this->meter_service->get_meter($application_data['meter_id'])['amount'];

                $payment_id = $this->payment_service->add_payment($application_id, $amount);
                return $this->response->setStatusCode(200)->setJSON(
                    [
                        'success' => true,
                        'message' => 'Application submitted successfully',
                        'data' => [
                            'track_no' => $trackno,
                            'payment_id' => $payment_id,
                            'amount' => number_format($amount, 2)
                        ]
                    ]
                );
            }
        } catch (\Exception $ex) {
            $err = $ex->getMessage();
            log_message('error', $err);
            return $this->response->setStatusCode(500)->setJSON(
                [
                    'success' => false,
                    'message' => $err
                ]
            );
        }
    }

    public function api_verify_payment()
    {
        try {
            $payment_id = $this->request->getJsonVar('payment_id');
            $payment_ref = $this->request->getJsonVar('payment_ref');

            if ($payment_id == '' || $payment_ref == '') {
                return $this->response->setStatusCode(400)->setJSON(
                    [
                        'success' => false,
                        'message' => 'Payment id and payment ref required',
                        'error_list' => null
                    ]
                );
            } else {
                $is_success = $this->payment_service->verify_payment($payment_ref, $payment_id);
                if ($is_success) {
                    $application_id = $this->payment_service->get_payment($payment_id)['application_id'];
                    $this->application_service->update_status($application_id, 2);

                    return $this->response->setStatusCode(200)->setJSON(
                        [
                            'success' => true,
                            'message' => 'Payment successful'
                        ]
                    );
                } else{
                    return $this->response->setStatusCode(200)->setJSON(
                        [
                            'success' => false,
                            'message' => 'Payment not successful'
                        ]
                    );
                }

                
            }
        } catch (\Exception $ex) {
            $err = $ex->getMessage();
            log_message('error', $err);
            return $this->response->setStatusCode(500)->setJSON(
                [
                    'success' => false,
                    'message' => $err
                ]
            );
        }
    }
}
