create database sesac_project1;
create user 'sesac' identified by '1234';
grant all privileges on *.* to sesac@'%';

use sesac_project1;

-- MySQL 에서 db table 생성 쿼리 
-- 24.07.10 예진 업데이트 함.

-- 데이터베이스 생성
create database sesac_project1 default character set utf8mb4 collate utf8mb4_unicode_ci;
show databases;
-- 데이터베이스 사용 선언
use codingon;
use sesac_project1;
show tables;

-- sesac 계정 생성
create user 'sesac' identified by '1234';
grant all privileges on *.* to 'sesac'@'%' with grant option;
select * from mysql.user;

CREATE TABLE IF NOT EXISTS `Recipe_Img` (`image_num` INTEGER NOT NULL auto_increment , `recipe_num` INTEGER NOT NULL, `image_url` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`image_num`), FOREIGN KEY (`recipe_num`) REFERENCES `Recipes` (`recipe_num`)) ENGINE=InnoDB;

show tables;
drop table if exists users;
drop table if exists recipes;
drop table if exists recipe_img;
drop table if exists likes;
drop table if exists users,recipes,recipe_img;
desc users;
desc recipes;
desc recipe_img;

SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE' 
AND TABLE_NAME = 'RecipeImg' 
AND TABLE_SCHEMA = 'sesac_project1';

SHOW INDEX FROM `users` FROM `sesac_project1`;

SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE' 
AND TABLE_NAME = 'Recipe' 
AND TABLE_SCHEMA = 'sesac_project1';

CREATE TABLE USERS (
	USER_NUM INT auto_increment primary key,
	USER_ID VARCHAR(50) NOT NULL,
    USER_NAME VARCHAR(50) NOT NULL,
    PROFILE_IMG VARCHAR(255) NULL,
    USER_PW VARCHAR(255) NOT NULL,
    BIRTH_DAY DATE NOT NULL
);
CREATE TABLE RECIPES(
	RECIPE_NUM INT auto_increment primary key,
    USER_NUM  INT NOT NULL,
    TITLE TEXT NOT NULL,
    CONTENT TEXT NOT NULL,
    LIKES_COUNT INT default 0,
    MAIN_INGREDIENT VARCHAR(50) NOT NULL,
    MAIN_ING_DETAIL TEXT NULL,
    sub_ingredient_detail TEXT NULL,
    createdAt datetime default now(),
    updatedAt datetime default now(),
    foreign key (USER_NUM) references users(USER_NUM) on update cascade on delete cascade
);
select * from recipes;
CREATE TABLE RECIPE_IMG(
	IMAGE_NUM INT auto_increment primary key,
    RECIPE_NUM INT NOT NULL ,
    IMAGE_URL VARCHAR(255) ,
    MAIN_IMG INT default '0',
    foreign key(RECIPE_NUM) references RECIPES(RECIPE_NUM) on update cascade on delete cascade
);
select * from users;
select * from recipes where user_num=2 order by recipe_num desc;
select * from recipe_img order by image_num desc;

drop table users;
insert into users (user_id,user_name,profile_img,user_pw,birth_day)
	values ('user1', '네이버관리자', 'https://recipe1.ezmember.co.kr/cache/recipe/2018/02/10/31eb5c9685f61ec424e4000f484cfee81.jpg',
    'pass','2024-01-01');
insert into users (user_id,user_name,profile_img,user_pw,birth_day)
	values ('user2', '네이버관리자', 'https://recipe1.ezmember.co.kr/cache/recipe/2018/02/10/31eb5c9685f61ec424e4000f484cfee81.jpg',
    'pass','2024-01-01');
insert into users (user_id,user_name,profile_img,user_pw,birth_day)
	values ('user3', '네이버관리자', 'https://recipe1.ezmember.co.kr/cache/recipe/2018/02/10/31eb5c9685f61ec424e4000f484cfee81.jpg',
    'pass','2024-01-01');

insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail,createdAt,updatedAt)
	values (1, '레몬 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물',now(),now());
insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail,createdAt,updatedAt)
	values (1, '레몬 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물',now(),now());
insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail,createdAt,updatedAt)
	values (2, '라임 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물',now(),now());
insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail,createdAt,updatedAt)
	values (2, '라임 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물',now(),now());
insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail,createdAt,updatedAt)
	values (3, '레몬 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물',now(),now());

insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail)
	values (1, 'user가 쓴 딸기 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물');

insert into recipes (USER_num,TITLE,CONTENT,LIKES_COUNT,main_ingredient,main_ing_detail,sub_ingredient_detail)
	values (1, 'user가 쓴 딸기 짐빔 레시피', '1. 우선 재료를 준비한다.', 5, '하이볼', '짐빔 버본,토닉워터', '콜라,물');


insert into recipe_img (recipe_num,image_url) values (1,'uploads/recipe/1_img1.jpg');
insert into recipe_img (recipe_num,image_url) values (1,'uploads/recipe/1_img2.jpg');
insert into recipe_img (recipe_num,image_url) values (2,'uploads/recipe/2_img1.jpg');

insert into recipe_img (recipe_num,image_url) values (4,'uploads/recipe/default_image.jpg');

-- 컬럼 명 변경 / 컬럼 타입 변경 / 컬럼 값 변경
alter table recipes change SUB_INGREDIENT sub_ingredient_detail text;
alter table recipes change created_At createdAt text;
alter table recipes change updated_At updatedAt text;
alter table recipe_img modify image_url varchar(255); 
alter table recipes modify likes_count int default 0;
update recipe_img set image_url='/uploads/recipe/3_img1.png' where recipe_num=3;
update recipe_img set main_img=1 where image_num=3;
alter table recipe_img add column MAIN_IMG INT default '0';

show tables;

desc recipe_img;
select * from users;
select * from recipes;
select * from recipes order by recipe_num desc limit 3;

desc recipes;
select * from recipe_img;

create table test_table (
`recipe_num` int NOT NULL primary key AUTO_INCREMENT,
  `user_num` int NOT NULL,
  `content` text,
  `created_At` datetime default now() NOT NULL
);
drop table test_table;
select * from test_table;
insert into test_table (recipe_num,user_num) values(1,1);

SELECT `recipe_num` FROM `Recipes` AS `Recipes` WHERE `Recipes`.`user_num` = 2 ORDER BY `Recipes`.`createdAt` DESC LIMIT 1;

SELECT `Recipes`.`recipe_num`, `Recipes`.`title`, `user`.`user_num` AS `user.user_num`, `user`.`user_name` AS `user.user_name`, `Recipe_Imgs`.`image_num` AS `Recipe_Imgs.image_num`, `Recipe_Imgs`.`image_url` AS `Recipe_Imgs.image_url` FROM `Recipes` AS `Recipes` LEFT OUTER JOIN `users` AS `user` ON `Recipes`.`user_num` = `user`.`user_num` LEFT OUTER JOIN `Recipe_Img` AS `Recipe_Imgs` ON `Recipes`.`recipe_num` = `Recipe_Imgs`.`recipe_num` AND `Recipe_Imgs`.`main_img` = 1 WHERE `Recipes`.`main_ingredient` = 'favicon.ico' ORDER BY `Recipes`.`created_at` DESC;