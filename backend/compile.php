<?php
    // api.codlang.com/compile
    
    // Open the API end point to anyone
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    // Generate a random UUID
    $process_uuid = uniqid('', true);

    // Test result
    var_dump($_POST);
?>