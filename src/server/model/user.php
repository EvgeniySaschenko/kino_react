<?
	function select__user($mail, $pass){
		global $db;
		$sql = 'SELECT
							*
						FROM user
						WHERE mail = ? AND pass = ?';
		$query= $db->prepare( $sql, array(PDO::FETCH_ASSOC) );
		$query->execute( array($mail, $pass) );
		return $query->fetchAll();
	}

	function select__user_check($mail){
		global $db;
		$sql = 'SELECT
							*
						FROM user
						WHERE mail = ?';
		$query= $db->prepare( $sql, array(PDO::FETCH_ASSOC) );
		$query->execute( array($mail) );
		return $query->fetchAll();
	}

	function insert__user($name, $pass, $mail, $ip){
		global $db;
		$sql = 'INSERT INTO user
						(name, pass, mail, ip)
						VALUES (:name, :pass, :mail, :ip)';
		$query= $db->prepare($sql);
		$query->bindParam(':name', $name);
		$query->bindParam(':pass', $pass);
		$query->bindParam(':mail', $mail);
		$query->bindParam(':ip', $ip);
		$query->execute();
		return $db->lastInsertId();
	}
?>