<?php
    header('Content-Type: application/json');

    $successTitle = "Merci :)";
    $successStatus = "success";
    $successMessage = "Votre message a bien été envoyé !";

    $errorTitle = "Oups... :(";
    $errorStatus = "error";
    $errorMessage = "Il y a eu une erreur... Réessayez plus tard !";

    if(isset($_POST) && isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])){
        extract($_POST);

        if(!empty($name) && $name!="" && !empty($email) && !empty($subject) && $email!="" && !empty ($message) && $message!=""){
            $name=stripslashes($name);
            $email=stripslashes($email);
            $subject=stripslashes($subject);
            $message=stripslashes($message);
            $destinataire="youremail@example.com";
            $sujet="Portfolio - ".$subject;
            $message="Nom : ".$name." \n
            Email : ".$email." \n
            Sujet : ".$subject." \n
            Message : ".$message;
            $entete="FROM : ".$email." \nREPLY-TO : ".$email;
            if(mail($destinataire, $sujet, $message, $entete)) {
                echo json_encode(array('statusName' => $successStatus, 'title' => $successTitle, 'message' => $successMessage));
            }else{
                echo json_encode(array('statusName' => $errorStatus, 'title' => $errorTitle, 'message' => $errorMessage));
            }
        } else {
            echo json_encode(array('statusName' => $errorStatus, 'title' => $errorTitle, 'message' => $errorMessage));
        }
    } else {
        echo json_encode(array('statusName' => $errorStatus, 'title' => $errorTitle, 'message' => $errorMessage));
    }
