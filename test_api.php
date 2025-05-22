<?php
function testSearchApi($keyword) {
    $url = "http://localhost/search.php"; // URL hlavniho php skriptu

    $data = json_encode(['keyword' => $keyword]);

    //Volani URL adresy
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json']
    ]);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        echo "Test selhal: $error\n";
        return;
    }

    $result = json_decode($response, true);
    
    if (isset($result['error'])) {
        echo "API odpovědělo chybou: " . $result['error'] . "\n";
    } elseif (is_array($result) && isset($result[0]['title'])) {
        echo "Test prošel: Výsledky byly vráceny\n";
    } else {
        echo "Neočekávaná odpověď: " . $response . "\n";
    }
}

// Spusť test s testovacím klíčovým slovem
testSearchApi("w3school");