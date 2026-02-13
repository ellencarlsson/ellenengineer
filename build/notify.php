<?php
/**
 * Sends a Telegram notification when someone visits the site.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$BOT_TOKEN = '8497319941:AAG2PX1Ll3uU9ctKLxLTtBpLHqAJZnC20O0';
$CHAT_ID = '7993207864';

// Get visitor IP
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (strpos($ip, ',') !== false) {
    $ip = trim(explode(',', $ip)[0]);
}

// Get location from IP (DB-IP first, fallback to ip-api)
$location = 'Okänd plats';
$geoData = @file_get_contents("https://api.db-ip.com/v2/free/$ip");
if ($geoData) {
    $geo = json_decode($geoData, true);
    if (!empty($geo['city'])) {
        $region = $geo['stateProv'] ?? '';
        $location = $geo['city'] . ', ' . $region;
    }
}
// Fallback if DB-IP fails
if ($location === 'Okänd plats') {
    $geoData2 = @file_get_contents("http://ip-api.com/json/$ip?fields=city,regionName");
    if ($geoData2) {
        $geo2 = json_decode($geoData2, true);
        if (!empty($geo2['city'])) {
            $location = $geo2['city'] . ', ' . ($geo2['regionName'] ?? '');
        }
    }
}

// Detect device type
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$isMobile = preg_match('/Mobile|Android|iPhone|iPad/i', $userAgent);
$device = $isMobile ? '📱 Mobil' : '💻 Dator';

$text = "👋 Besökare på ellenengineer.com!

$device
📍 $location
🌐 $ip";

$url = "https://api.telegram.org/bot$BOT_TOKEN/sendMessage";
$data = [
    'chat_id' => $CHAT_ID,
    'text' => $text
];

$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send']);
    exit;
}

echo json_encode(['ok' => true]);
