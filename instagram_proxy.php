<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// New access token - replace this with your new token
$access_token = 'YOUR_NEW_ACCESS_TOKEN';

// Initialize cURL session
$ch = curl_init();

// Set cURL options
$url = "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=" . $access_token;
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

// Execute cURL session
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo json_encode([
        'error' => true,
        'message' => 'Curl error: ' . curl_error($ch)
    ]);
} else {
    // Decode the response to check for API errors
    $responseData = json_decode($response, true);
    
    if (isset($responseData['error'])) {
        echo json_encode([
            'error' => true,
            'message' => 'Instagram API Error: ' . $responseData['error']['message']
        ]);
    } else {
        // Return the Instagram API response
        echo $response;
    }
}

// Close cURL session
curl_close($ch);
?> 