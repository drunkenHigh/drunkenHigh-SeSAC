use codingon;
desc recipes;

insert into recipes (recipe_num, user_name, title, likes_count, main_ingredient, recipe_img) 
values 
(1, '홍길동', '귀여운 소주 토끼볼', 100, '소주', '/public/img/test/1.jpg'),
(2, '박수박', '시원한 위스키 수박 하이볼', 100, '위스키', '/public/img/test/2.jpg'),
(3, '몰디브', '모히또가서 몰디브 한잔', 100, '기타', '/public/img/test/3.jpg'),
(4, '김메롱', '달콤한 메론 하이볼', 100, '위스키', '/public/img/test/4.jpg'),
(5, '이자몽', '자몽 하이볼', 100, '위스키', '/public/img/test/5.jpg'),
(6, '송레몬', '레몬 사와', 100, '사케', '/public/img/test/6.jpg'),
(7, '봄배이', '봄베이 하이볼', 100, '위스키', '/public/img/test/7.jpg'),
(8, '오미자', '오미자 와인 하이볼', 100, '기타', '/public/img/test/8.jpg'),
(9, '복우카', '블루 보드카 하이볼', 100, '보드카', '/public/img/test/9.jpg'),
(10, '그래피', '글렌피딕 하이볼', 100, '위스키', '/public/img/test/10.jpg'),
(11, '최자두', '자두 하이볼', 100, '위스키', '/public/img/test/11.jpg');

select * from recipes;