<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\CustomError;

class UserValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$file,$schemaType): Response
    {

        $validationSchema = $this->loadValidationRules($file, $schemaType); 

     
         $validated = validator($request->all(),$validationSchema); //$request->validate($validationSchema);

         if ($validated->fails()) {
            $message = $validated->errors()->first();
            throw new CustomError(422, $message,$validated);
         }

         return $next($request);
               
    }

    private function loadValidationRules($file, $schema)
    {
        $filePath = app_path("Http/Validations/$file.php");

        if (file_exists($filePath)) {
            
            $rules = require $filePath;

            return $rules[$schema] ?? [];
        }

        

        return [];
    }
}
