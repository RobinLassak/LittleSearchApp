<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Získání dat z frontendu
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);
$keyword = $data['keyword'] ?? null;

if (!$keyword) {
    echo json_encode(["error" => "Chybí keyword"]);
    exit;
}

// Ziskani prihlasovacich udaju ze souboru login.php
$loginData = require "login.php";
$apiKey = $loginData['apiKey']; //Api key
$cseId = $loginData['cseId']; // CSE ID

//Dotaz na hledane klicove slovo
$query = urlencode($keyword);

//URL adresa vyhledavani
$url = "https://www.googleapis.com/customsearch/v1?q=$query&key=$apiKey&cx=$cseId";


$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_URL => $url,
]);

$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

// Chyba připojení
if ($error) {
    echo json_encode(["error" => "cURL error: $error"]);
    exit;
}

// Převod vysledku hledani na pole
$results = json_decode($response, true);

//Vypiš chybu z Google API, pokud existuje
if (isset($results['error'])) {
    echo json_encode(["error" => "Google API error: " . $results['error']['message']]);
    exit;
}

//Nejsou položky = žádné výsledky
if (!isset($results['items']) || count($results['items']) === 0) {
    echo json_encode(["error" => "Žádné výsledky nebyly nalezeny."]);
    exit;
}

//Vytvoření výstupniho pole
$output = [];
foreach ($results['items'] as $item) {
    $output[] = [
        "title" => $item['title'],
        "link" => $item['link'],
        "snippet" => $item['snippet']
    ];
}

//Odpověď do frontendu
echo json_encode($output);
?>