-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`   drop foreign key `fk_user_group`;
alter table `user`  drop column  `group_oid`;
-- Group_Module [Group2Module_Module2Group]
alter table `group_module`   drop foreign key `fk_group_module_module`;
alter table `group_module`   drop foreign key `fk_group_module_group`;
drop table `group_module`;
-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `module`   drop foreign key `fk_module_group`;
alter table `module`  drop column  `oid`;
-- Opcao [ent9]
drop table `opcao`;
-- Aposta_Disponivel [ent8]
drop table `aposta_disponivel`;
-- DataHora [ent7]
drop table `datahora`;
-- Desporto [ent6]
drop table `desporto`;
-- Fase [ent5]
drop table `fase`;
-- Região [ent4]
drop table `regiao`;
-- Competicao [ent3]
drop table `competicao`;
-- Equipa [ent2]
drop table `equipa`;
-- Notificacoes [ent11]
drop table `notificacoes`;
-- Aposta_Concreta [ent10]
drop table `aposta_concreta`;
-- Evento [ent1]
drop table `evento`;
-- User [User]
drop table `user`;
-- Module [Module]
drop table `module`;
-- Group [Group]
drop table `group`;
