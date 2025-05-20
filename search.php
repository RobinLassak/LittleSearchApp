 <?php
    //Hlavicka
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    //Prijeti dat z js
    $rawData = file_get_contents("php://input");
    $data = json_decode($rawData, true);

    echo json_encode($data)
 
 ?>