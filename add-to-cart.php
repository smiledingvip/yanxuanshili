<?php
	sleep(1);

	require 'config.php';

	$query ="INSERT INTO shopping_cart(title, unitPrice, color, amount)
			VALUES('{$_POST['title']}', '{$_POST['unitPrice']}', '{$_POST['color']}', '{$_POST['amount']}')";

	mysql_query($query)or die('新增失败'.mysql_error());

	echo mysql_affected_rows();

	mysql_close();
?>