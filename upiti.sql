insert into nastavniks values (1, 'USERNAME2', '$2b$10$tYNv/U.MNRkPQAohxtTf2Olld6.dU6myx/4TiN0ail4Qks9luxi2K');
insert into nastavniks values (2, 'USERNAME', '$2b$10$WZUb1ufVRm9QntmQIp2jve5ikV7X4HkF/cgirlcS92sw0rdk6Bfc2');
insert into predmets values (1, 'Razvoj mobilnih aplikacija', 2, 2, 1);
insert into predmets values (2, 'Web Tehnologije', 2, 2, 2);
insert into predmets values (3, 'Razvoj programskih rjesenja', 3, 2, 2);
insert into students values (1, 'Neko Nekic', 12345);
insert into students values (2, 'Drugi Neko', 12346);
insert into predmetstudents values (1, 1);
insert into predmetstudents values (1, 2);
insert into predmetstudents values (1, 3);
insert into predmetstudents values (2, 1);
insert into predmetstudents values (2, 2);
insert into predmetstudents values (2, 3);
insert into prisustvos values (1, 1, 2, 2, 12345, 1, 1);
insert into prisustvos values (2, 2, 2, 2, 12345, 1, 1);
insert into prisustvos values (3, 3, 2, 2, 12345, 1, 1);
insert into prisustvos values (4, 1, 1, 2, 12345, 1, 2);
insert into prisustvos values (5, 2, 1, 2, 12345, 1, 2);
insert into prisustvos values (6, 3, 1, 2, 12345, 1, 2);
insert into prisustvos values (7, 1, 1, 1, 12345, 1, 3);
insert into prisustvos values (8, 2, 1, 1, 12345, 1, 3);
insert into prisustvos values (9, 3, 1, 1, 12345, 1, 3);
insert into prisustvos values (10, 1, 0, 2, 12346, 2, 1);
insert into prisustvos values (11, 2, 0, 2, 12346, 2, 1);
insert into prisustvos values (12, 3, 0, 2, 12346, 2, 1);
insert into prisustvos values (13, 1, 1, 2, 12346, 2, 2);
insert into prisustvos values (14, 2, 1, 2, 12346, 2, 2);
insert into prisustvos values (15, 3, 1, 2, 12346, 2, 2);
insert into prisustvos values (16, 1, 1, 0, 12346, 2, 3);
insert into prisustvos values (17, 2, 1, 0, 12346, 2, 3);
insert into prisustvos values (18, 3, 1, 0, 12346, 2, 3);
