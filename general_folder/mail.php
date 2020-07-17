<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $today = date("j.m.Y");
        $now = date("G:i:s");
        $name = trim($_POST['name1']);
        $email = trim($_POST['email']);
        $message = trim($_POST['text']);

        $token = "856008473:AAFTCGJfub7CoaTvO0IEXtRnGghiBm1p42U";
        $chat_id = "-328962600";

        $order_data = array(
            "Дата: " => $today,
            "Час: " => $now,
            "Ім'я: " => $name,
            "Електронна пошта: " => $email,
            "Текс повідомлення: " => $message,
        );
        foreach($order_data as $key => $value) {
            $txt .= "<b>".$key."</b> ".$value."%0A";
        };
        $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

        if ($sendToTelegram) {
            echo "Thank you";
        } else {
            echo "Error";
        }
    }
?>
