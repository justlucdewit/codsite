<?php
    // POST: api.codlang.com/compile
    
    // Enable errors
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');

    // Open the API end point to anyone
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    // Generate a random UUID
    $process_uuid = uniqid('', true);
    $code = $_POST["code"];

    // Write the code to a temporary file in processes/{uuid}.cod
    $file = fopen("processes/$process_uuid.cod", "w");
    fwrite($file, $code);
    fclose($file);

    // Test result
    echo $code;
?>