-- Create database
DROP DATABASE IF EXISTS betess_events;

CREATE DATABASE betess_events;

USE betess_events;

-- Evento [ent1]
create table `evento` (
   `id_evento`  integer  not null AUTO_INCREMENT,
   `titulo`  varchar(255),
  primary key (`id_evento`)
);


-- Equipa [ent2]
create table `equipa` (
   `id_equipa`  integer  not null AUTO_INCREMENT,
   `nome`  varchar(255),
  primary key (`id_equipa`)
);


-- Competicao [ent3]
create table `competicao` (
   `id_competicao`  integer  not null AUTO_INCREMENT,
   `nome`  varchar(255),
  primary key (`id_competicao`)
);


-- Região [ent4]
create table `regiao` (
   `id_regiao`  integer  not null AUTO_INCREMENT,
   `nome`  varchar(255),
  primary key (`id_regiao`)
);


-- Fase [ent5]
create table `fase` (
   `id_fase`  integer  not null AUTO_INCREMENT,
   `nome`  varchar(255),
  primary key (`id_fase`)
);


-- Desporto [ent6]
create table `desporto` (
   `id_desporto`  integer  not null AUTO_INCREMENT,
   `nome`  varchar(255),
  primary key (`id_desporto`)
);


-- DataHora [ent7]
create table `datahora` (
   `id_datahora`  integer  not null AUTO_INCREMENT,
   `data`  date,
   `hora`  time,
  primary key (`id_datahora`)
);


-- Aposta_Disponivel [ent8]
create table `aposta_disponivel` (
   `id_aposta_disponivel`  integer  not null AUTO_INCREMENT,
   `titulo`  varchar(255),
   `resultado_final`  integer,
   `disponibilidade`  bit,
   `vip`  bit,
  primary key (`id_aposta_disponivel`)
);


-- Opcao [ent9]
create table `opcao` (
   `id_opcao`  integer  not null AUTO_INCREMENT,
   `opcao`  varchar(255),
   `odd`  double precision,
  primary key (`id_opcao`)
);


-- Fase_Competicao [rel1]
alter table `fase`  add column  `competicao_id_competicao`  integer;
alter table `fase`   add index fk_fase_competicao (`competicao_id_competicao`), add constraint fk_fase_competicao foreign key (`competicao_id_competicao`) references `competicao` (`id_competicao`);

-- Evento_Aposta_Disponivel [rel11]
alter table `aposta_disponivel`  add column  `evento_id_evento`  integer;
alter table `aposta_disponivel`   add index fk_aposta_disponivel_evento (`evento_id_evento`), add constraint fk_aposta_disponivel_evento foreign key (`evento_id_evento`) references `evento` (`id_evento`);


-- Competicao_Desporto [rel13]
alter table `competicao`  add column  `desporto_id_desporto`  integer;
alter table `competicao`   add index fk_competicao_desporto (`desporto_id_desporto`), add constraint fk_competicao_desporto foreign key (`desporto_id_desporto`) references `desporto` (`id_desporto`);


-- Aposta_Disponivel_Opcao [rel15]
alter table `opcao`  add column  `aposta_disponivel_id_aposta_di`  integer;
alter table `opcao`   add index fk_opcao_aposta_disponivel (`aposta_disponivel_id_aposta_di`), add constraint fk_opcao_aposta_disponivel foreign key (`aposta_disponivel_id_aposta_di`) references `aposta_disponivel` (`id_aposta_disponivel`);



-- Região_Competicao [rel2]
alter table `competicao`  add column  `regiao_id_regiao`  integer;
alter table `competicao`   add index fk_competicao_regiao (`regiao_id_regiao`), add constraint fk_competicao_regiao foreign key (`regiao_id_regiao`) references `regiao` (`id_regiao`);


-- Desporto_Região [rel3]
create table `desporto_regiao` (
   `desporto_id_desporto`  integer not null,
   `regiao_id_regiao`  integer not null,
  primary key (`desporto_id_desporto`, `regiao_id_regiao`)
);
alter table `desporto_regiao`   add index fk_desporto_regiao_desporto (`desporto_id_desporto`), add constraint fk_desporto_regiao_desporto foreign key (`desporto_id_desporto`) references `desporto` (`id_desporto`);
alter table `desporto_regiao`   add index fk_desporto_regiao_regiao (`regiao_id_regiao`), add constraint fk_desporto_regiao_regiao foreign key (`regiao_id_regiao`) references `regiao` (`id_regiao`);


-- Evento_Equipa [rel4]
create table `evento_equipa` (
   `evento_id_evento`  integer not null,
   `equipa_id_equipa`  integer not null,
  primary key (`evento_id_evento`, `equipa_id_equipa`)
);
alter table `evento_equipa`   add index fk_evento_equipa_evento (`evento_id_evento`), add constraint fk_evento_equipa_evento foreign key (`evento_id_evento`) references `evento` (`id_evento`);
alter table `evento_equipa`   add index fk_evento_equipa_equipa (`equipa_id_equipa`), add constraint fk_evento_equipa_equipa foreign key (`equipa_id_equipa`) references `equipa` (`id_equipa`) ON DELETE CASCADE;


-- Evento_Fase [rel5]
alter table `evento`  add column  `fase_id_fase`  integer;
alter table `evento`   add index fk_evento_fase (`fase_id_fase`), add constraint fk_evento_fase foreign key (`fase_id_fase`) references `fase` (`id_fase`);


-- Equipa_Competicao [rel6]
create table `equipa_competicao` (
   `equipa_id_equipa`  integer not null,
   `competicao_id_competicao`  integer not null,
  primary key (`equipa_id_equipa`, `competicao_id_competicao`)
);
alter table `equipa_competicao`   add index fk_equipa_competicao_equipa (`equipa_id_equipa`), add constraint fk_equipa_competicao_equipa foreign key (`equipa_id_equipa`) references `equipa` (`id_equipa`) ON DELETE CASCADE;
alter table `equipa_competicao`   add index fk_equipa_competicao_competica (`competicao_id_competicao`), add constraint fk_equipa_competicao_competica foreign key (`competicao_id_competicao`) references `competicao` (`id_competicao`);


-- Evento_DataHora [rel9]
alter table `evento`  add column  `datahora_datahora_id`  integer;
alter table `evento`   add index fk_evento_datahora (`datahora_datahora_id`), add constraint fk_evento_datahora foreign key (`datahora_datahora_id`) references `datahora` (`id_datahora`);


