<?
	include 'db.php';
	$db= new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHARSET, DB_USER, DB_PASS);
	include 'genre.php';
	include 'movie.php';
	include 'nav.php';
	include 'user.php';
?>