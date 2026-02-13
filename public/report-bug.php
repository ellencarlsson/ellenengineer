<?php
/**
 * Receives bug reports and sends them to Telegram.
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

$input = json_decode(file_get_contents('php://input'), true);

$category = $input['category'] ?? '';
$page = $input['page'] ?? '';
$message = $input['message'] ?? '';

if (empty($category) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$BOT_TOKEN = '8270041578:AAFdwf5skP5Brnys5W-_lMJqt1sC3bgHWf8';
$CHAT_ID = '7993207864';

$pageInfo = $page ? " ($page)" : '';
$text = "🐛 Buggrapport

Kategori: $category$pageInfo

$message";

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
