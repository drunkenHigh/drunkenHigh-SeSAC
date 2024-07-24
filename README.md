# :seedling: SeSAC 1차 프로젝트 drunkenHigh 
<br/>

## :tropical_drink: drunkenHigh


* 주제 : 유저들이 자신만의 하이볼 레시피를 작성해서 공유할 수 있는 플랫폼
* 기간 : 2024.07.05 ~ 2024.07.23
* 개발툴: vscode, MySQLWorkbench
* 개발 환경 : nodejs
* 사용 언어 : MySQL, HTML, CSS, JavaScript, ejs, express
* 사용 기술 : jQuery, Axios, Tailwind, swiper

<br>

## :raising_hand: Developers

|FE | BE |
| :---: | :---: |
|[이다인](https://github.com/DAIN302)|[유예진](https://github.com/yjyoo6831)|
|[함태완](https://github.com/wani-ham)|[함태완](https://github.com/wani-ham)|
|-|[윤예슬](https://github.com/errorose)|
|-|[안다은](https://github.com/AHNDAEUN)|

<br>

## :computer: Tech

* Front-end: 
<img src="https://img.shields.io/badge/ejs-B4CA65?style=flat&logo=ejs&logoColor=white"/>  <img src="https://img.shields.io/badge/CSS-1572b6?style=flat&logo=css3&logoColor=white"/>  <img src="https://img.shields.io/badge/tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=333333"/> <img src="https://img.shields.io/badge/Axios-5a29e4?style=flat&logo=axios&logoColor=white"/> <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white"/> <img src="https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white"/>    

* Back-end:
<img src="https://img.shields.io/badge/Node.js-5fa04e?style=flat&logo=Node.js&logoColor=white"/>   <img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=Express&logoColor=white"/>   <img src="https://img.shields.io/badge/Sequlize-52b0e7?style=flat&logo=sequelize&logoColor=white"/>

* DB: <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>

* Tools: 
<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>   <img src="https://img.shields.io/badge/MySQLWorkBench-4479A1?style=flat&logo=MySQL&logoColor=white"/>
* Deploy: <img src="https://img.shields.io/badge/Naver Cloud Platform-03c75a?style=flat&logo=naver&logoColor=white"/>   <img src="https://img.shields.io/badge/Apache-d22128?style=flat&logo=apache&logoColor=white"/>   <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat&logo=ubuntu&logoColor=white"/>
* 협업 툴: 
<img src="https://img.shields.io/badge/Slack-4a154b?style=flat&logo=slack&logoColor=white"/>   <img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white"/>

<br>

## :bulb: API 명세서 및 개발규칙정의서
<details>
<summary>API 명세서<summary>
<div markdown="1">
    <img src="./README_img/api명세서.png" style="width: 100%">
</div>
</details>
<details>
<summary>개발규칙정의서<summary>
<div markdown="1">
    <img src="./README_img/개발규칙.png" style="width: 100%">
</div>
</details>

<br>

## 📂 프로젝트 구조
<details>
<summary>프로젝트 구조<summary>
<div markdown="1">
    디자인 패턴 : MVC 패턴 
    <img src="./README_img/트리구조.png" style="width: 100%">
</div>
</details>

<br>

## :surfer: 기능별 Package
```
1. cookie : 쿠키
2. like : 좋아요
3. main : 메인페이지 (리스트)
4. recipes_image : 레시피 이미지 (multer)
5. recipes : 레시피 상세
6. users : 회원정보
````

<br>

## :pushpin: properties 분리

 1. .env
	공통 설정
	보안을 요구하는 공통 설정
 2. app.js
	개발시 필요한 설정
	DB연결등 보안을 요구하는 개별 설정

- 중요 정보는 .gitignore파일에 등록 됨
- github에 등록되지 않음에 유의

## 📚 데이터베이스 ERD

<img src="./README_img/ERD.JPG" style="width: 100%">

<br>

## :clipboard: 주요 페이지

### 메인 
<img src="./README_img/main.JPG" style="width: 100%">

### 쿠키
<img src="./README_img/cookie.PNG" style="width: 100%">

### 로그인 
<img src="./README_img/login.JPG" style="width: 100%">

### 회원가입
<img src="./README_img/register.PNG" style="width: 100%">

### 레시피 작성 
<img src="./README_img/write.JPG" style="width: 100%">

### 내 정보
<img src="./README_img/mypage.JPG" style="width: 100%">

