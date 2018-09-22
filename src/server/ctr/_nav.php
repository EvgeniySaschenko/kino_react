<?
	switch($_GET['action']){
		case('GET_NAV_ALL'):{
			echo json_encode( select__nav() );
			break;
		}
	}
?>