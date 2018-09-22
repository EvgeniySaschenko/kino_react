<?
	switch( $_GET['action'] ){
		case('GET_GENRE_ALL'):
			echo json_encode( select__genre_all() );
			break;
		default:
			echo null;
	}
?>