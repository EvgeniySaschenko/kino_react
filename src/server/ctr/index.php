<?
	header('Access-Control-Allow-Origin: *');
	session_start();
	session_set_cookie_params(108000);
	include '../model/index.php';
	include '_'.$_GET['ctr'].'.php';
?>