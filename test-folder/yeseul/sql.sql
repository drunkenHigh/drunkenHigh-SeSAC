drop table RECIPE_IMG;
drop table recipes;
drop table users;
drop table likes;

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
CREATE TABLE RECIPES (
    RECIPE_NUM INT AUTO_INCREMENT PRIMARY KEY,
    USER_NUM INT NOT NULL,
    TITLE TEXT NOT NULL,
    CONTENT TEXT NOT NULL,
    LIKES_COUNT INT NOT NULL DEFAULT '0',
    MAIN_INGREDIENT VARCHAR(50) NOT NULL,
    MAIN_ING_DETAIL TEXT NULL,
    SUB_INGREDIENT_DETAIL TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_NUM) REFERENCES USERS(USER_NUM) ON UPDATE CASCADE ON DELETE CASCADE
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

ALTER TABLE recipes 
MODIFY COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
MODIFY COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL;


insert into users values
('1', 'user1', '쿠로미', '', '1234', '20001031');
insert into users values
('2', 'user2', '짱구', '', '1234', '20001111');
insert into users values
('3', 'user3', '흰둥이', '', '1234', '20001111');

INSERT INTO Users (user_id, user_name, profile_img, user_pw, birth_day) VALUES 
	('user1', '뽀로로', 'profile1.jpg', 'password', '1990-01-01');
INSERT INTO Recipes (user_num, title, content, likes_count, main_ingredient, main_ing_detail, sub_ingredient_detail) VALUES 
	(1, '하이볼 레시피', '하이볼 만드는 방법', 10, '하이볼', '주재료: 하이볼', '부재료: 얼음, 탄산수');
INSERT INTO Recipes (user_num, title, content, likes_count, main_ingredient, main_ing_detail, sub_ingredient_detail) VALUES 
	(2, '하이볼 레시피', '하이볼 만드는 방법', 10, '소주', '주재료: 소주', '부재료: 얼음, 탄산수');
INSERT INTO Recipe_Img (recipe_num, image_url, main_img) VALUES 
	(1, 'image1.jpg', 1);
INSERT INTO Recipe_Img (recipe_num, image_url, main_img) VALUES 
	(2, 'image1.jpg', 1);


select * from users;
select * from recipes;
select * from recipe_img;


-- 주재료 
SELECT ri.image_url, u.user_name, r.title
FROM Recipe_Img ri
JOIN Recipes r ON ri.recipe_num = r.recipe_num
JOIN Users u ON r.user_num = u.user_num
WHERE r.main_ingredient = '하이볼' AND ri.main_img = 1;

-- 전체
SELECT ri.image_url, u.user_name, r.title
FROM Recipe_Img ri
JOIN Recipes r ON ri.recipe_num = r.recipe_num
JOIN Users u ON r.user_num = u.user_num;






desc recipes;
