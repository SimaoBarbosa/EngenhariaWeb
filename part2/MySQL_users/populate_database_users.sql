USE betess_users;

INSERT INTO user values 
	(1, 'Apostador1', 'pass', 'apostador1@hotmail.com', 100, 1),      -- Apostador normal
	(2, 'Funcionario1', 'pass', 'funcionario1@hotmail.com', NULL, 2), -- Funcionário / Admin
	(3, 'Apostador2', 'pass', 'apostador2@hotmail.com', 150, 3);      -- Apostador VIP
