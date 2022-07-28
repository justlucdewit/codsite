<?php
    // POST: api.codlang.com/compile
    
    // Enable errors
    error_reporting(E_ALL);
    ini_set('display_errors', 'on');

    // Open the API end point to anyone
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    // JSON result
    header("Content-Type: application/json");

    // Generate a random UUID
    $process_uuid = uniqid('', true);
    $code = $_POST["code"];
    $success = false;
    $compilerOutput = "";

    // Write the code to a temporary file in processes/{uuid}.cod
    // create file if not exist
    $file = fopen("processes/{$process_uuid}.cod", "w");
    fwrite($file, $code);
    fclose($file);

    // Compile
    shell_exec("cod processes/{$process_uuid}.cod -o processes/{$process_uuid} -d");

    // Check if the file exists
    if (file_exists("processes/{$process_uuid}")) {
        $success = true;

        // Get the contents of the file
        $file = fopen("processes/{$process_uuid}.c", "r");
        $compilerOutput = fread($file, filesize("processes/{$process_uuid}.c"));

        // Replace all "%llu" with "%lu" in compiler output
        $compilerOutput = str_replace("\"%llu\"", "\"%lu\"", $compilerOutput);

        // Delete the file
        unlink("processes/{$process_uuid}");
        unlink("processes/{$process_uuid}.cod");
        unlink("processes/{$process_uuid}.c");
        unlink("processes/{$process_uuid}.ast.json");
    }
    
    // Test result
    echo json_encode([
        "process_id" => $process_uuid,
        "success" => $success,
        "compilerOutput" => $compilerOutput
    ])
?>