<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function errorLog($mes){
        Log::channel('errorLog')->error($mes);
    }
    
    
    public function render($request, Throwable $exception)
    {  
        if ($exception instanceof CustomError) {
            $extraErrorInfo=json_decode($exception->getExtraErrorInfo($exception->getCode()));

             $this->errorLog($exception->getMessage());
             $this->errorLog($exception->getStatusCode());
             $this->errorLog(json_encode($extraErrorInfo));
             

            if($extraErrorInfo->error != null){
               return new JsonResponse(['message' => $exception->getMessage(),'extraErrorInfo'=>$extraErrorInfo], $exception->getStatusCode());
            }
            return new JsonResponse(['message' => $exception->getMessage()], $exception->getStatusCode());
        }

        return parent::render($request, $exception);
    }

    
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
