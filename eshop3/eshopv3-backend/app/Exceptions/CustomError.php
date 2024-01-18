<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Contracts\Validation\Validator;

class CustomError extends Exception
{
   
   protected $statusCode;
   protected $validator;
   protected $extraErrorInfo;

   public function __construct($statusCode, $message = null, Validator $validator=null, $code = 0, Exception $previous = null)
   {
        $this->statusCode = $statusCode;
        $this->validator = $validator;
        $this->extraErrorInfo = $previous?->getMessage();

        parent::__construct($message, $code, $previous);
   }

   public function getStatusCode()
   {
        return $this->statusCode;
   }

    public function getValidator()
    {
        return $this->validator;
    }

    public function getExtraErrorInfo($code){
        return  json_encode(["code"=>$code,"error"=>$this->extraErrorInfo]);
    }
}