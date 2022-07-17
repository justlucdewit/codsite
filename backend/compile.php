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

    // Write the code to a temporary file in processes/{uuid}.cod
    // create file if not exist
    $file = fopen("processes/{$process_uuid}.cod", "w");
    fwrite($file, $code);
    fclose($file);

    // Compile the file using the cod compiler
    $is_on_windows = PHP_OS_FAMILY === "Windows";
    $executable_name = $is_on_windows ? "{$process_uuid}" : "{$process_uuid}";

    // Compile
    shell_exec("cod processes/{$process_uuid}.cod -o processes/{$executable_name} -d");

    // Check if the file exists
    if (file_exists("processes/{$executable_name}")) {
        $success = true;

        // Get the contents of the file

        // Delete the file
        unlink("processes/{$executable_name}");
    }
    
    
    // Remove the temporary file
    unlink("processes/{$process_uuid}.cod");
    
    // Return the output
    echo json_encode(array("output" => $output));

    // Test result
    echo json_encode([
        "process_id" => $process_uuid,
        "success" => $success
    ])
?>