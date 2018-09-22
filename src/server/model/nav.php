<?
	function select__nav(){
		global $db;
		$sql = 'SELECT
							*
						FROM nav';
		$query= $db->query($sql, PDO::FETCH_ASSOC);
		return $query->fetchAll();
	}
?>