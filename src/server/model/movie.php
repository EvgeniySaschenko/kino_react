<? 

	function select__movie($id){
		global $db;
		$sql = 'SELECT
							m.*,
							u.name AS user_name
						FROM movie m
						INNER JOIN user u ON m.id_user = u.id
						WHERE m.id = ?';
		$query= $db->prepare( $sql, array(PDO::FETCH_ASSOC) );
		$query->execute( array($id) );
		return $query->fetchAll();
	}

	function select__movie_genre($genre, $page){
		global $db;
		$record= $page * 12;
		$sql = "SELECT
							m.*,
							u.name AS user_name
						FROM movie m
						INNER JOIN user u ON m.id_user = u.id
						WHERE m.genre LIKE ?
						ORDER BY date_create DESC, name ASC
						LIMIT $record, 12";
		$query= $db->prepare( $sql, array(PDO::FETCH_ASSOC) );
		$query->execute( array("%$genre%") );
		return $query->fetchAll();
	}

	function select__movie_list($page){
		global $db;
		$record= $page * 12;
		$sql = "SELECT
							*,
							(SELECT COUNT(*) FROM movie WHERE hide = 0) as count_movie
						FROM movie
						WHERE hide = 0
						ORDER BY date_create DESC, name ASC
						LIMIT $record, 12";
		$query= $db->query($sql, PDO::FETCH_ASSOC);
		return $query->fetchAll();
	}

	function insert__movie($id_user, $name, $text, $year, $genre, $ip){
		global $db;
		$sql = 'INSERT INTO movie
						(id_user, name, text, year, genre, ip)
						VALUES (:id_user, :name, :text, :year, :genre, :ip)';
		$query= $db->prepare($sql);
		$query->bindParam(':id_user', $id_user);
		$query->bindParam(':name', $name);
		$query->bindParam(':text', $text);
		$query->bindParam(':year', $year);
		$query->bindParam(':genre', $genre);
		$query->bindParam(':ip', $ip);
		$query->execute();
		return $db->lastInsertId();
	}

	function update__movie($id, $name, $text, $year, $genre){
		global $db;
		$sql = 'UPDATE 
							movie
						SET
							name= :name,
							text= :text,
							year= :year,
							genre= :genre,
							date_update= CURRENT_TIMESTAMP
						WHERE id = :id';
		$query= $db->prepare($sql);
		$query->bindParam(':id', $id);
		$query->bindParam(':name', $name);
		$query->bindParam(':text', $text);
		$query->bindParam(':year', $year);
		$query->bindParam(':genre', $genre);
		$query->execute();
	}
?>