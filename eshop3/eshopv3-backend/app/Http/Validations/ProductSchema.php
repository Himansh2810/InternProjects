<?php 

return [

    'addProduct'=>[
        "title"=>'required|min:4',
        "category"=>'required|min:2',
        "price"=>'required|numeric|min:0',
        "description"=>'required|min:8',
        "rating"=>'required|regex:/^[0-5](\.[0-9])?$/',
        "ratingCount"=>'required|numeric|min:0',
        "imageUrl"=>'required'    
    ]
];