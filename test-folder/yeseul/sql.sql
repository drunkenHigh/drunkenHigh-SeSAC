-- 데이터베이스 생성
create database sesac_project1 default character set utf8mb4 collate utf8mb4_unicode_ci;
show databases;

-- 데이터베이스 사용 선언
use sesac_project1;
show tables;

-- 데이터베이스 생성
create database sesac_project1 default character set utf8mb4 collate utf8mb4_unicode_ci;
show databases;

-- 데이터베이스 사용 선언
use sesac_project1;

-- 테이블 생성
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
    USER_ID VARCHAR(50) NOT NULL,
    TITLE TEXT NOT NULL,
    CONTENT TEXT NOT NULL,
    LIKES_COUNT INT NOT NULL default '0',
    MAIN_INGREDIENT VARCHAR(50) NOT NULL,
    MAIN_ING_DETAIL TEXT NULL,
    SUB_INGREDIENT TEXT NULL,
    foreign key (USER_NUM) references USERS(USER_NUM) on update cascade on delete cascade
);
CREATE TABLE RECIPE_IMG(
	IMAGE_NUM INT auto_increment primary key,
    RECIPE_NUM INT NOT NULL ,
    IMAGE_URL VARCHAR(255) ,
    MAIN_IMG INT default '0',
    foreign key(RECIPE_NUM) references RECIPES(RECIPE_NUM) on update cascade on delete cascade
);
CREATE TABLE LIKES(
	LIKE_NUM INT auto_increment primary key,
    USER_NUM INT NOT NULL,
    RECIPE_NUM INT NOT NULL,
    foreign key(USER_NUM) references USERS(USER_NUM) on update cascade on delete cascade,
    foreign key(RECIPE_NUM) references RECIPES(RECIPE_NUM) on update cascade on delete cascade
);

-- sesac 계정 생성
create user 'sesac' identified by '1234';
grant all privileges on *.* to 'sesac'@'%' with grant option;

select * from mysql.user;
select * from users;
select * from recipes;
select * from recipe_img;
select * from likes;

show tables;

desc users;
desc recipes;
desc recipe_img;
desc likes;

insert into users values
('1', 'user1', '쿠로미', '', '1234', '20001031');

insert into recipes values
('1', '1', '토끼소주 만들기', '1. 재료 준비한다. 우선 ~ ', '', '하이볼', '삐삡_토닉워터', '레몬 물');
