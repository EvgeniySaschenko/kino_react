<?
	$ip= $_SERVER['REMOTE_ADDR'];

	switch($_GET['action']){
		// Регистрация
		case('CHECK_IN'):{
			if( select__user_check($_POST['mail']) ){
				// Если такой пользователь существует
				echo "Пользователь с таким Email уже существует";
			} else {
				// Если такого пользователя нет
				$id= insert__user($_POST["name"], $_POST["pass"], $_POST["mail"], $ip);

				if($id){
					$to_1= $_POST["mail"];
					$to_2= 'evgeniy.saschenko@gmail.com';
					$subject= '😺 Регистрация';
					$headers = 'From: KINO <dispatch@'.$_SERVER['HTTP_HOST'].'>'. "\r\n";
					$headers .= 'Content-type: text/html; charset="utf-8"';
					$message= "Добрый день,<br> Поздравляем с регистрацией на ".$_SERVER['HTTP_HOST']."<br>";
					$message .= "Имя: ".$_POST["name"]."<br>";
					$message .= "E-mail: ".$_POST["mail"]."<br>";
					$message .= "Пароль: ".$_POST["pass"]."<br>";
					mail($to_1, $subject, $message, $headers);
					mail($to_2, $subject, $message, $headers);

					// Если пользоватяля получилось добавить в базу
					$user= select__user($_POST["mail"], $_POST["pass"])[0];
					$_SESSION['user']= $user;
					echo json_encode( $user );
				} else {
					// Если не получилось
					echo "Ошибка пользователь не добавлен в базу";
				}
			}
			break;
		}
		// Авторизация 
		case('LOGIN'):{
			$user= select__user($_POST["mail"], $_POST["pass"])[0];
			if( $user ){
				// Успех
				$user= select__user($_POST["mail"], $_POST["pass"])[0];
				$_SESSION['user']= $user;
				echo json_encode( $user );
			}	else {
				// Ошибка
				echo "Неправильный Email или пароль";
			}
			break;
		}
		// Авторизация 
		case('EXIT'):{
			session_unset();
			session_destroy();
			break;
		}

		default:
			echo json_encode( $_SESSION['user'] );
	}
?>