-- Create database
DROP DATABASE IF EXISTS betess_users;

CREATE DATABASE betess_users;

USE betess_users;

-- User [User]
create table `user` (
   `oid`  integer  not null AUTO_INCREMENT,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
   `saldo`  double precision,
   `group` integer not null,
  primary key (`oid`)
);

-- Aposta_Concreta [ent10]
create table `aposta_concreta` (
   `id_aposta_concreta`  integer  not null AUTO_INCREMENT,
   `quantia`  double precision,
   `odd_fixada`  double precision,
   `resultado`  integer,
   `id_aposta_disponivel` integer not null,
   `id_opcao` integer not null,
   `nome_opcao` varchar(255),
   `nome_aposta_disponivel` varchar(255),
   `nome_evento` varchar(255),
   `nome_competicao` varchar(255),
  primary key (`id_aposta_concreta`)
);


-- Notificacao [ent11]
create table `notificacao` (
   `id_notificacao`  integer  not null AUTO_INCREMENT,
   `notificacao`  varchar(255),
  primary key (`id_notificacao`)
);

-- User_Aposta_Concreta [rel10]
alter table `aposta_concreta`  add column  `user_oid`  integer;
alter table `aposta_concreta`   add index fk_aposta_concreta_user (`user_oid`), add constraint fk_aposta_concreta_user foreign key (`user_oid`) references `user` (`oid`);


-- Notificacao_User [rel12]
alter table `notificacao`  add column  `user_oid`  integer;
alter table `notificacao`   add index fk_notificacao_user (`user_oid`), add constraint fk_notificacao_user foreign key (`user_oid`) references `user` (`oid`);
