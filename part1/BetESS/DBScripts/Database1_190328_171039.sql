-- Aposta_Concreta [ent10]
create table `aposta_concreta` (
   `id_aposta_concreta`  integer  not null,
   `quantia`  double precision,
   `odd_fixada`  double precision,
  primary key (`id_aposta_concreta`)
);


-- Aposta_Disponivel [ent8]
create table `aposta_disponivel` (
   `id_aposta_disponivel`  integer  not null,
   `odds`  varchar(255),
  primary key (`id_aposta_disponivel`)
);


-- Opcao [ent9]
create table `opcao` (
   `id_opcao`  integer  not null,
   `opcao`  varchar(255),
   `odd`  double precision,
  primary key (`id_opcao`)
);


-- Aposta_Disponivel_Opcao [rel10]
alter table `opcao`  add column  `aposta_disponivel_id_aposta_di`  integer;
alter table `opcao`   add index fk_opcao_aposta_disponivel (`aposta_disponivel_id_aposta_di`), add constraint fk_opcao_aposta_disponivel foreign key (`aposta_disponivel_id_aposta_di`) references `aposta_disponivel` (`id_aposta_disponivel`);


-- Evento_Aposta_Disponivel [rel11]
alter table `aposta_disponivel`  add column  `evento_id_evento`  integer;
alter table `aposta_disponivel`   add index fk_aposta_disponivel_evento (`evento_id_evento`), add constraint fk_aposta_disponivel_evento foreign key (`evento_id_evento`) references `evento` (`id_evento`);


-- Aposta_Disponivel_Aposta_Concreta [rel12]
alter table `aposta_concreta`  add column  `aposta_disponivel_id_aposta_di`  integer;
alter table `aposta_concreta`   add index fk_aposta_concreta_aposta_disp (`aposta_disponivel_id_aposta_di`), add constraint fk_aposta_concreta_aposta_disp foreign key (`aposta_disponivel_id_aposta_di`) references `aposta_disponivel` (`id_aposta_disponivel`);


-- Aposta_Concreta_Opcao [rel13]
alter table `opcao`  add column  `aposta_concreta_id_aposta_conc`  integer;
alter table `opcao`   add index fk_opcao_aposta_concreta (`aposta_concreta_id_aposta_conc`), add constraint fk_opcao_aposta_concreta foreign key (`aposta_concreta_id_aposta_conc`) references `aposta_concreta` (`id_aposta_concreta`);


