# drunkenHigh-SeSAC 1차 프로젝트
## drunkenHigh

* 나만 알고 있던 꿀주 만드는 레시피를 공유하고 소통하는 웹 사이트
* 기간 : 2024.07.05 ~ 2024.07.23
* 주제 : 유저들이 자신만의 하이볼 레시피를 작성해서 공유할 수 있는 플랫폼
* 개발툴: vscode, MySQLWorkbench
* 개발 환경 : nodejs, sequelize
* 사용 언어 : MySQL, HTML, CSS, JavaScript, ejs, express
* 사용 기술 : jQuery, Axios, Tailwind
* 디자인 패턴: MVC 패턴


## 데이터베이스 구조
* Notion: https://tayham.notion.site/Drunken-High-43aa32be029240f2b68e1c74d4ab0768?pvs=4

<img src="https://www.notion.so/tayham/Back-end-0dfbedae25e148fba6e2fdcf97070c6a?pvs=4#8442f1c67c6b4554956bf2d167a34bd9">
<img src="https://www.notion.so/tayham/Back-end-0dfbedae25e148fba6e2fdcf97070c6a?pvs=4#880131ebdae44576948883bb0d17fcb3">
<img src="https://www.notion.so/tayham/Back-end-0dfbedae25e148fba6e2fdcf97070c6a?pvs=4#898b2ae8ec0b4b93b3285d75ee2ddbe9">



## 개발 환경 구축

# drunkenHigh
<img src="">


## 팀원 역학 분담

<img src= "">

## 1. 기능별 Package
```
1. 도서정보     : book
2. 검색         : search
3. 희망도서     : hope
4. 도서기증     : donation
5. 열람실       : studyroom
6. 문화프로그램 : program
7. 게시판       : board
8. 도서관안내   : guide
9. 도서관소개   : info
10. 도서관정책  : policy
11. 회원        : member
12. 마이페이지  : mypage
13. 관리자      : admin
14. 설정        : config
15. 공통        : util

## 2. properties 분리
```
 1. .env
	공통 설정
	보안을 요구하는 공통 설정
 2. application-dev.properties
	개발시 필요한 설정
	DB연결등 보안을 요구하는 개별 설정

- application-dev.properties 는 ignore파일에 등록 됨
- github에 등록되지 않음에 유의
- JSP 연결 확인 완료
```
