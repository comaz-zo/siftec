<?php
    require_once('../PhpConsole.phar'); // autoload will be initialized automatically
    $connector = PhpConsole\Connector::getInstance();
    $handler = PhpConsole\Handler::getInstance();
    $handler->start();
    $handler->debug('start', 'sif360.login.php');

    require("../db_con.php"); // #1

    session_start(); // #2

    $login = $_POST['login']; // #3
    $pwd = $_POST['pwd']; // #4

    $login = stripslashes($login); // #5
    $pwd = md5(stripslashes($pwd));         // #6

    $sql = "SELECT * FROM utente WHERE login='$login' and pwd='$pwd'"; // #9
    $result = array(); // #10

    if ($resultdb = $db->query($sql)) { // #11

      //$result->setFetchMode(PDO::FETCH_ASSOC);


      $rowcount = $resultdb->rowCount() ; // #12


      if($rowcount==1){

        $result = $resultdb->fetch();


        $result['success'] = true; // #15
        $result['msg'] = 'User authenticated!'; // #16

      } else {

        $result['success'] = false; // #17
        $result['msg'] = 'Incorrect user or password.'; // #18
      }



    } else {
        die("Error executing the query login");
    }

    echo json_encode($result); // #21

    $handler->debug($result, 'sif360.login.php');
?>
