<?php
    header('Content-Type: application/json');

    $secret = "mySecretKey";
    $url = "https://www.google.com/recaptcha/api/siteverify";

    $title = 'Robot détecté';
    $message = 'Google m\'informe que vous êtes sceptible d\'ête un robot';
    $statusName = 'error';

    if(isset($_POST) && isset($_POST['response'])) {
        $response = file_get_contents($url.'?secret='.$secret."&response=".$_POST['response']);
        echo $response;
    } else {
        echo json_encode(array('statusName' => $statusName, 'title' => $title, 'message' => $message));
    }
