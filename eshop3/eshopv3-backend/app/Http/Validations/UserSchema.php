<?php 

return [
    'createUser'=>[
             'name'=> ['required','min:2','max:40','regex:/^[A-Za-z ]+$/'],
             'username'=>['required','min:3','max:20','regex:/^[A-Za-z0-9_.]+$/'],
             'password'=>['required','min:8','regex:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@._$#])[A-Za-z\d@._$#]+$/']    
    ],

    'loginUser'=>[
        'username'=> 'required|min:3',
        'password'=>'required|min:8'
    ],

     'adminLogin'=>[
        'username'=> 'required|regex:/^eshop_admin.007$/',
        'password'=>'required|regex:/^eshop@admin.pass#007$/'
    ]
];