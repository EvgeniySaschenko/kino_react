<?
	function uploadFile($id){
		$path = '../img/'.$id.'.jpg';
		$file = pathinfo($_FILES['img']['name']);
		$extension = mb_strtolower($file['extension'], 'UTF-8');
		if($extension == 'png')
			imagejpeg(imagecreatefrompng($_FILES['img']['tmp_name']), $path, 100);
		else if($extension == 'gif')
			imagejpeg(imagecreatefromgif($_FILES['img']['tmp_name']), $path, 100);
		else if($extension == 'jpg' or $extension == 'jpeg')
			copy($_FILES['img']['tmp_name'], $path);
	}


	switch( $_GET['action'] ){
		// Получить 1 фильм
		case('GET_MOVIE'):{
			echo json_encode( select__movie( $_GET['id'] )[0] );
			break;
		}

		// Получить список фильмов
		case('GET_MOVIE_LIST'):{
			echo json_encode( select__movie_list( $_GET['page'] ) );
			break;
		}

		// Получить список фильмов
		case('GET_MOVIE_LIST_GENRE'):{
			echo json_encode( select__movie_genre($_GET['genre'], $_GET['page']) );
			break;
		}
		

		// Добавить фильм
		case('ADD_MOVIE'):{
			if( $_SESSION['user'] ){
				$ip= $_SERVER['REMOTE_ADDR'];
				$id= insert__movie($_POST['id_user'], $_POST['name'], $_POST['text'], $_POST['year'], $_POST['genre'], $ip);
				uploadFile($id);
				echo $id;
			}
			break;
		}


		// Добавить фильм
		case('EDIT_MOVIE'):{
			if( $_SESSION['user']){

				echo select__movie( $_GET['id'] )[0]['id_user'], $_SESSION['user']['id_user'];
				
				update__movie($_GET['id'], $_POST['name'], $_POST['text'], $_POST['year'], $_POST['genre']);
				if( $_FILES['img']['name'] ){
					uploadFile($_GET['id']);
				}

			}
			break;
		}

		default:
			echo null;
	}
?>