<?php

namespace Config;

use App\Libraries\ApplicationService;
use App\Libraries\ListService;
use App\Libraries\MeterService;
use App\Libraries\PaymentService;
use App\Models\AddressModel;
use App\Models\ApplicantFeedbackModel;
use App\Models\ApplicantModel;
use App\Models\ApplicationApplianceModel;
use App\Models\ApplicationModel;
use App\Models\ApplicationStatusLogModel;
use App\Models\ApplicationStatusModel;
use App\Models\AvailableAreaModel;
use App\Models\ElectricApplianceModel;
use App\Models\HouseTypeModel;
use App\Models\MeterModel;
use App\Models\PaymentLogModel;
use App\Models\PaymentModel;
use App\Models\RoleModel;
use App\Models\UserModel;
use CodeIgniter\Config\BaseService;

/**
 * Services Configuration file.
 *
 * Services are simply other classes/libraries that the system uses
 * to do its job. This is used by CodeIgniter to allow the core of the
 * framework to be swapped out easily without affecting the usage within
 * the rest of your application.
 *
 * This file holds any application-specific services, or service overrides
 * that you might need. An example has been included with the general
 * method format you should use for your service methods. For more examples,
 * see the core Services file at system/Config/Services.php.
 */
class Services extends BaseService
{
    /*
     * public static function example($getShared = true)
     * {
     *     if ($getShared) {
     *         return static::getSharedInstance('example');
     *     }
     *
     *     return new \CodeIgniter\Example();
     * }
     */

    // ============= models ======================
    public static function address_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('address_model');
        }

        return new AddressModel();
    }

    public static function applicant_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('applicant_model');
        }

        return new ApplicantModel();
    }

    public static function applicant_feedback_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('applicant_feedback_model');
        }

        return new ApplicantFeedbackModel();
    }
    public static function application_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('application_model');
        }

        return new ApplicationModel();
    }

    public static function application_appliance_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('application_appliance_model');
        }

        return new ApplicationApplianceModel();
    }

    public static function application_status_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('application_status_model');
        }

        return new ApplicationStatusModel();
    }

    public static function application_status_log_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('application_status_log_model');
        }

        return new ApplicationStatusLogModel();
    }

    public static function available_area_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('available_area_model');
        }

        return new AvailableAreaModel();
    }

    public static function electric_appliance_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('electric_appliance_model');
        }

        return new ElectricApplianceModel();
    }

    public static function house_type_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('house_type_model');
        }

        return new HouseTypeModel();
    }

    public static function meter_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('meter_model');
        }

        return new MeterModel();
    }

    public static function payment_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('payment_model');
        }

        return new PaymentModel();
    }

    public static function payment_log_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('payment_log_model');
        }

        return new PaymentLogModel();
    }

    public static function role_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('role_model');
        }

        return new RoleModel();
    }

    public static function user_model($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('user_model');
        }

        return new UserModel();
    }

    //===========  services ===========
    public static function application_service($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('application_service');
        }

        return new ApplicationService(
            static::address_model(),
            static::applicant_model(),
            static::application_appliance_model(),
            static::application_model(),
            static::application_status_log_model()
        );
    }

    public static function list_service($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('list_service');
        }

        return new ListService(
            static::application_status_model(),
            static::available_area_model(),
            static::electric_appliance_model(),
            static::house_type_model(),
            static::meter_model(),
            static::role_model()
        );
    }

    public static function meter_service($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('meter_service');
        }

        return new MeterService(static::meter_model());
    }

    public static function payment_service($getShared = true)
    {
        if ($getShared) {
            return static::getSharedInstance('payment_service');
        }

        return new PaymentService(static::payment_model(), static::payment_log_model());
    }
}
