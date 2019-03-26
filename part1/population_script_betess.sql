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
	(1, 'Liga NOS', 1),
	(2, 'Taça de Portugal', 1),
	(3, 'La Liga', 2),
	(4, 'Liga dos Campeões', 3),
	(5, 'Liga Europa', 3),
	(6, 'Qualificação Euro 2020', 3),
	(7, 'Mundial 2022', 4);

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
	(1, '2019-03-30', '20:30:00'),
	(2, '2019-03-30', '21:00:00'),
	(3, '2019-03-31', '19:30:00'),
	(4, '2019-03-31', '20:00:00');

INSERT INTO evento values
	(1, 'Rio Ave x Portimonense', true, 1, 1), -- 1a jornada Liga NOS
	(2, 'Nacional x Marítimo', true, 2, 1), -- 2a jornada Liga NOS
	(3, 'Sporting x Moreirense', false, 3, 2), -- oitavos Taça de Portugal
	(4, 'Vitória Setúbal x Vitória Guimarães', true, 4, 3), -- quartos Taça de Portugal
	(5, 'Barcelona x Real Madrid', true, 5, 4), -- 3a jornada La Liga
	(6, 'Atlético Madrid x Valência', true, 6, 1), -- 4a jornada La Liga
	(7, 'Bayern Munique x Liverpool', true, 7, 2), -- meia final Liga dos Campeões
	(8, 'Napoli x Inter', true, 8, 3), -- final Liga Europa
	(9, 'Portugal x Sérvia', true, 9, 4), -- Qualificação Euro
	(10, 'Brasil x Alemanha', true, 10, 1); -- final Mundial

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

INSERT INTO evento_equipa values
	(1,1),(1,2),
	(2,3),(2,4),
	(3,5),(3,6),
	(4,7),(4,8),
	(5,9),(5,10),
	(6,11),(6,12),
	(7,13),(7,14),
	(8,15),(8,16),
	(9,17),(9,18),
	(10,19),(10,20);

INSERT INTO desporto_regiao values
	(1,1), -- Futebol Portugal
	(1,2), -- Futebol Espanha
	(1,3), -- Futebol Europa
	(1,4); -- Futebol Internacional

-- equipa_competição
-- equipa_fase
-- equipa_regiao