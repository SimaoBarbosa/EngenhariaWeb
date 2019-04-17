USE betess;

INSERT INTO desporto values 
	(1, 'Futebol'),
	(2, 'Andebol'),
	(3, 'Futsal');

INSERT INTO regiao values 
	(1, 'Portugal'),
	(2, 'Espanha'),
	(3, 'Europa'),
	(4, 'Internacional');

INSERT INTO competicao values
	(1, 'Liga NOS', 1, 1),
	(2, 'Taça de Portugal', 1, 1),
	(3, 'La Liga', 1, 2),
	(4, 'Liga dos Campeões', 1, 3),
	(5, 'Liga Europa', 1, 3),
	(6, 'Qualificação Euro 2020', 1, 3),
	(7, 'Mundial 2022', 1, 4);

INSERT INTO fase values 
	(1, '1ª jornada', 1), -- Liga NOS
	(2, '2ª jornada', 1), -- Liga NOS
	(3, 'oitavos-de-final', 2), -- Taça Portugal
	(4, 'quartos-de-final', 2), -- Taça Portugal
	(5, '3ª jornada', 3), -- La Liga
	(6, '4ª jornada', 3), -- la Liga
	(7, 'meia-final', 4), -- Liga dos Campeões
	(8, 'final', 5), -- Liga Europa
	(9, '5ª jornada', 6), -- Qualificação Euro
	(10, 'final', 7); -- Mundial

INSERT INTO datahora values
	(1, '2019-05-30', '20:30:00'),
	(2, '2019-05-30', '21:00:00'),
	(3, '2019-05-31', '19:30:00'),
	(4, '2019-05-31', '20:00:00');

INSERT INTO evento values
	(1, 'Rio Ave x Portimonense', 1, 1), -- 1a jornada Liga NOS
	(2, 'Nacional x Marítimo', 2, 1), -- 2a jornada Liga NOS
	(3, 'Sporting x Moreirense', 3, 2), -- oitavos Taça de Portugal
	(4, 'Vitória Setúbal x Vitória Guimarães', 4, 3), -- quartos Taça de Portugal
	(5, 'Barcelona x Real Madrid', 5, 4), -- 3a jornada La Liga
	(6, 'Atlético Madrid x Valência', 6, 1), -- 4a jornada La Liga
	(7, 'Bayern Munique x Liverpool', 7, 2), -- meia final Liga dos Campeões
	(8, 'Napoli x Inter', 8, 3), -- final Liga Europa
	(9, 'Portugal x Sérvia', 9, 4), -- Qualificação Euro
	(10, 'Brasil x Alemanha', 10, 1); -- final Mundial

INSERT INTO equipa values
	(1, 'Rio Ave'),
	(2, 'Portimonense'),
	(3, 'Nacional'),
	(4, 'Marítimo'),
	(5, 'Sporting'),
	(6, 'Moreirense'),
	(7, 'Vitória Setúbal'),
	(8, 'Vitória Guimarães'),
	(9, 'Barcelona'),
	(10, 'Real Madrid'),
	(11, 'Atlético Madrid'),
	(12, 'Valência'),
	(13, 'Bayern Munique'),
	(14, 'Liverpool'),
	(15, 'Napoli'),
	(16, 'Inter'),
	(17, 'Portugal'),
	(18, 'Sérvia'),
	(19, 'Brasil'),
	(20, 'Alemanha');
    
INSERT INTO equipa_competicao values
	(1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1);

INSERT INTO evento_equipa values
	(1, 1), (1, 2),
	(2, 3), (2, 4),
	(3, 5), (3, 6),
	(4, 7), (4, 8),
	(5, 9), (5, 10),
	(6, 11), (6, 12),
	(7, 13), (7, 14),
	(8, 15), (8, 16),
	(9, 17), (9, 18),
	(10, 19), (10, 20);

INSERT INTO desporto_regiao values
	(1, 1), -- Futebol Portugal
	(1, 2), -- Futebol Espanha
	(1, 3), -- Futebol Europa
	(1, 4); -- Futebol Internacional

INSERT INTO aposta_disponivel values
	(1, 'Resultado Final', 0, true, false, 1), -- Rio Ave x Portimonense
	(2, '1º jogador a marcar', 0, true, true, 1);

INSERT INTO opcao values
	(1, 'Rio Ave', 1.5, 1), -- Resultado Final
	(2, 'Empate', 2, 1),
	(3, 'Portimonense', 2.5, 1),

	(4, 'Tarantini', 7, 2), -- 1º jogador a marcar
	(5, 'Nakajima', 9, 2),
	(6, 'Gabrielzinho', 7, 2),
	(7, 'Paulinho', 8, 2);

INSERT INTO module values 
	(1, 'sv1', 'Apostador'),
	(2, 'sv2', 'Funcionario'),
	(3, 'area4', 'Vip'),
	(4, 'area19', 'Informações VIP'),
	(5, 'page39', 'Apostas'),
	(6, 'page3', 'Apostas');

INSERT INTO betess.group values 
	(1, 'Apostador Normal', 1),
	(2, 'Funcionario', 2),
	(3, 'Apostador VIP', 1);

INSERT INTO user values 
	(1, 'Apostador1', 'pass', 'apostador1@hotmail.com', 100, 1),      -- Apostador normal
	(2, 'Funcionario1', 'pass', 'funcionario1@hotmail.com', NULL, 2), -- Funcionário / Admin
	(3, 'Apostador2', 'pass', 'apostador2@hotmail.com', 150, 3);      -- Apostador VIP

INSERT INTO user_group VALUES
	(1, 1), -- Apostador1 <-> Apostador normal
	(2, 2), -- Funcionario1 <-> Funcionario
	(3, 3); -- Apostador2 <-> Apostador VIP

INSERT INTO group_module VALUES
	(1, 1), -- Apostador normal <-> sv1
	(2, 2), -- Funcionario <-> sv2
	(3, 1), -- Apostador VIP <-> sv1
	(1, 3), -- Apostador normal <-> area4
	(3, 4), -- Apostador VIP <-> area19
	(1, 6), -- Apostador normal <-> page3
	(3, 5); -- Apostador VIP <-> page39