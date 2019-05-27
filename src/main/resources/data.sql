insert into projekt (id, version, beschreibung, max_schueler, name) values (1, 0, 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.', 2, 'Asoka');
insert into projekt (id, version, beschreibung, max_schueler, name) values (2, 0, 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.', 2, 'Vagram');
insert into projekt (id, version, beschreibung, max_schueler, name) values (3, 0, 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 3, 'Flowdesk');

insert into kompetenz (id, version, beschreibung) values (1, 0, 'Video');
insert into kompetenz (id, version, beschreibung) values (2, 0, 'Audio');
insert into kompetenz (id, version, beschreibung) values (3, 0, 'Programmieren');
insert into kompetenz (id, version, beschreibung) values (4, 0, 'Raspberry');

insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (1, 0, 5, 2, 1);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (2, 0, 3, 3, 1);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (3, 0, 5, 4, 1);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (4, 0, 6, 3, 2);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (5, 0, 8, 4, 2);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (6, 0, 2, 1, 2);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (7, 0, 8, 2, 2);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (8, 0, 8, 1, 3);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (9, 0, 6, 2, 3);
insert into anforderung (id, version, ausmass, kompetenz_id, projekt) values (10, 0, 2, 3, 3);


insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (1, 0, 'Seczer Tobias',	'6159@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (1, 0, 6, 1, 1);
INSERT into QUALIFIKATION VALUES (6, 0, 5, 3, 1);
INSERT into QUALIFIKATION VALUES (7, 0, 6, 4, 1);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (2, 0, 'Kisling Daniel',	'6152@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (2, 0, 3, 4, 2);
INSERT into QUALIFIKATION VALUES (5, 0, 4, 2, 2);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (3, 0, 'Ott Dominik',	'6158@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (3, 0, 1, 3, 3);
INSERT into QUALIFIKATION VALUES (8, 0, 8, 2, 3);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (4, 0, 'Inführ Tobias',	'6159@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (4, 0, 6, 2, 4);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (5, 0, 'Preissegger Leo',	'6153@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (11, 0, 10, 3, 5);
INSERT into QUALIFIKATION VALUES (12, 0, 7, 4, 5);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (6, 0, 'Kubesch Oliver',	'6154@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (9, 0, 6, 1, 6);
INSERT into QUALIFIKATION VALUES (10, 0, 8, 2, 6);

insert into person(id, version, DISPLAY_NAME, USERNAME, PROJEKT_ID) values (7, 0, 'Schloessl Andreas',	'6155@htl.rennweg.at', null);
INSERT into QUALIFIKATION VALUES (13, 0, 8, 3, 7);
INSERT into QUALIFIKATION VALUES (14, 0, 8, 4, 7);