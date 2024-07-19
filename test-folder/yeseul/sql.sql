use sesac_project1;

insert into users (user_id, user_name, profile_img, user_pw, birth_day)
values
('user1234', '김메롱', null, 'aaaa1111', '20000101'),
('user2345', '피카츄', null, 'aaaa1111', '20000101'),
('user3567', '박토끼', null, 'aaaa1111', '20000101'),
('user4555', '미니언즈', null, 'aaaa1111', '20000101'),
('user5111', '이밤비', null, 'aaaa1111', '20000101');

select * from users;

insert into recipes (user_num, title, content,main_ingredient, main_ing_detail, sub_ingredient_detail, createdAt, updatedAt)
values
(1, '토끼볼', 'ㅇㅇ', '소주', '토끼소주', '탄산수,레몬,레몬즙','20240716', '20240716'),
(2, '수박 마가리타', 'ㅇㅇ', '기타', '데낄라', '수박,수박주스,토닉워터','20240716', '20240716'),
(3, '몰디브가서 모히또 한잔', 'ㅇㅇ', '기타', '럼', '탄산수,라임,민트,레몬즙','20240716', '20240716'),
(4, '미도리하이볼', 'ㅇㅇ', '기타', '미도리리큐어', '진저에일, 레몬즙0','20240716', '20240716'),
(5, '자몽하이볼', 'ㅇㅇ', '위스키', '산토리', '탄산수,자몽,자몽청','20240716', '20240716'),
(1, '레몬사와', 'ㅇㅇ', '사케', '사케', '탄산수,레몬,레몬즙','20240716', '20240716'),
(2, '봄베이하이볼', 'ㅇㅇ', '위스키', '봄베이사파이어', '토닉워터,블루큐라소시럽,레몬','20240716', '20240716'),
(3, '오미자하이볼', 'ㅇㅇ', '위스키', '조니워커레드', '탄산수,레몬,오미자청','20240716', '20240716'),
(4, '블루레몬', 'ㅇㅇ', '보드카', '보드카', '진저에일, 레몬즙, 블루큐라소시럽','20240716', '20240716'),
(5, '글렌피딕하이볼', 'ㅇㅇ', '위스키', '글렌피딕', '탄산수,레몬,레몬즙','20240716', '20240716'),
(1, '자몽사와', 'ㅇㅇ', '사케', '사케', '탄산수,자몽','20240716', '20240716'),
(2, '잭콕', 'ㅇㅇ', '위스키', '잭다니엘', '코카콜라','20240716', '20240716'),
(3, '허니하이볼', 'ㅇㅇ', '위스키', '잭다니엘 허니', '토닉워터,레몬즙','20240716', '20240716'),
(4, '피치하이볼', 'ㅇㅇ', '기타', '피치트리', '탄산수,레몬,복숭아시럽','20240716', '20240716'),
(5, '샹그리아', 'ㅇㅇ', '기타', '레드와인', '탄산수,레몬','20240716', '20240716'),
(1, '와인에이드', 'ㅇㅇ', '기타', '레드와인', '토닉워터,레몬','20240716', '20240716'),
(2, '자몽하이볼', 'ㅇㅇ', '위스키', '산토리', '탄산수,자몽,자몽시럽','20240716', '20240716'),
(3, '레몬하이볼', 'ㅇㅇ', '위스키', '산토리', '탄산수,레몬,레몬즙','20240716', '20240716'),
(4, '메론하이볼', 'ㅇㅇ', '위스키', '산토리', '탄산수,메론시럽','20240716', '20240716');

select * from recipes;

insert into recipe_img (recipe_num, image_url, main_img)
value
(1,'/public/img/test/1.jpg', 1),
(2,'/public/img/test/2.jpg', 1),
(3,'/public/img/test/3.jpg', 1),
(4,'/public/img/test/4.jpg', 1),
(5,'/public/img/test/5.jpg', 1),
(6,'/public/img/test/6.jpg', 1),
(7,'/public/img/test/7.jpg', 1),
(8,'/public/img/test/8.jpg', 1),
(9,'/public/img/test/9.jpg', 1),
(10,'/public/img/test/10.jpg', 1),
(11,'/public/img/test/11.jpg', 1),
(12,'/public/img/test/12.jpg', 1),
(13,'/public/img/test/13.jpg', 1),
(14,'/public/img/test/14.jpg', 1),
(15,'/public/img/test/15.jpg', 1),
(16,'/public/img/test/16.jpg', 1),
(17,'/public/img/test/17.jpg', 1),
(18,'/public/img/test/18.jpg', 1),
(19,'/public/img/test/19.jpg', 1);

select * from recipe_img;


insert into likes (user_num, recipe_num) values 
('1', '1'),
('1', '2');

select * from likes where user_num = '1' and recipe_num = '1';

select * from likes;

-- select count(*) from likes where recipe_num = '1'; 
select count(recipe_num) from likes group by(recipe_num) order by recipe_num asc limit 10;

select ri.image_url, r.title, count(l.recipe_num) 
from recipe_img ri join recipes r
on ri.recipe_num = r.recipe_num join likes l
on r.recipe_num = l.recipe_num
group by ri.image_url, r.title, r.recipe_num
order by (l.recipe_num) asc 
limit 10;




