<?php
header('Content-Type: application/json');

$successMessage = "Votre message a bien été envoyé !";
$errorMessage = "Il y a eu une erreur... Réessayez plus tard !";

if(isset($_POST) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
    extract($_POST);

    if(!empty($name) && $name!="" && !empty($email) && $email!="" && !empty ($message) && $message!=""){
        $message=str_replace("/'","'",$message);
        $destinataire="manuel.taraud@gmail.com";
        $sujet="Portfolio - Un nouveau message !";
        $message="Nom : $name \n
        Email : $email \n
        Message : $message";
        $entete="FROM : $name \n REPLY-TO : $email";
        if(mail($destinataire, $sujet, $message, $entete)) {
            echo json_encode(array('status' => 'success', 'title' => 'Merci :)', 'message' => $successMessage));
        }else{
            echo json_encode(array('status' => 'error', 'title' => 'Oups... :(', 'message' => $errorMessage));
        }
    } else {
        echo json_encode(array('status' => 'error', 'title' => 'Oups... :(', 'message' => $errorMessage));
    }
} else {
    echo json_encode(array('status' => 'error', 'title' => 'Oups... :(', 'message' => $errorMessage));
}
