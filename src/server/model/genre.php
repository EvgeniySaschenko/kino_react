<?
	function select__genre_all(){
		global $db;
		$sql = 'SELECT
							*
						FROM genre
						ORDER BY name ASC';
		$query= $db->query($sql, PDO::FETCH_ASSOC);
		return $query->fetchAll();
	}

?>