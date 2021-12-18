<?php

namespace App\Libraries;

use App\Models\MeterModel;
use App\Models\PaymentLogModel;
use App\Models\PaymentModel;

class PaymentService
{
    protected $payment_model;
    protected $payment_log_model;

    public function __construct(PaymentModel $payment_model, PaymentLogModel $payment_log_model) {
        $this->payment_model=$payment_model;
        $this->payment_log_model=$payment_log_model;
    }

    public function add_payment($application_id, $amount){
        $data=[
            'application_id'=>$application_id,
            'amount'=>$amount
        ];
        return $this->payment_model->insert($data);
    }

    //verify transaction
    public function verify_payment($payment_ref, $payment_id)
    {
        $is_success = false;
        $skey = env('paystack.skey'); //'sk_test_389e14457e1881a6ab59325b716670e6fa88d87b';
        $result = array();
        //The parameter after verify/ is the transaction reference to be verified
        $url = 'https://api.paystack.co/transaction/verify/' . $payment_ref;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt(
            $ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $skey]
        );
        $request = curl_exec($ch);
        curl_close($ch);

        if ($request) {
            $result = json_decode($request, true);
            if ($result) {
                if (isset($result['data'])) {
                    //something came in
                    if ($result['data']['status'] == 'success') {
                        // the transaction was successful, you can deliver value
                        /*
                        @ also remember that if this was a card transaction, you can store the
                        @ card authorization to enable you charge the customer subsequently.
                        @ The card authorization is in:
                        @ $result['data']['authorization']['authorization_code'];
                        @ PS: Store the authorization with this email address used for this transaction.
                        @ The authorization will only work with this particular email.
                        @ If the user changes his email on your system, it will be unusable
                         */
                        //echo "Transaction was successful";
                        $is_success=true;
                       $this->payment_model->update($payment_id, ['is_paid'=>true, 'date_paid'=>date('Y-m-d H:i:s')]);
                       $this->payment_log_model->insert(['payment_id'=>$payment_id, 'payment_ref'=>$payment_ref, 'is_success'=>true]);
                    } else {
                        // the transaction was not successful, do not deliver value'
                        // print_r($result);  //uncomment this line to inspect the result, to check why it failed.
                        //echo "Transaction was not successful: Last gateway response was: " . $result['data']['gateway_response'];
                       
                        // $res['msg']="Transaction was not successful: Last gateway response was: " . $result['data']['gateway_response'];
                        $this->payment_log_model->insert(['payment_id'=>$payment_id, 'payment_ref'=>$payment_ref, 'is_success'=>false]);
                    }
                } else {
                    $this->payment_log_model->insert(['payment_id'=>$payment_id, 'payment_ref'=>$payment_ref, 'is_success'=>false]);
                }

            } else {
                //print_r($result);
                //die("Something went wrong while trying to convert the request variable to json. Uncomment the print_r command to see what is in the result variable.");
               
                $this->payment_log_model->insert(['payment_id'=>$payment_id, 'payment_ref'=>$payment_ref, 'is_success'=>false]);
            }
        } else {
            //var_dump($request);
            //die("Something went wrong while executing curl. Uncomment the var_dump line above this line to see what the issue is. Please check your CURL command to make sure everything is ok");
            $this->payment_log_model->insert(['payment_id'=>$payment_id, 'payment_ref'=>$payment_ref, 'is_success'=>false]);
        }
        return $is_success;
    }

    public function get_payment($id){
        return $this->payment_model->find($id);
    }
}
