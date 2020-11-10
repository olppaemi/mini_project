# 미니 프로젝트

| 프로젝트명 | 주변 음식점 정보 공유 어플리케이션                           |
| ------------------------------ | ------------------------------------------------------------ |
| 프로젝트 요약<img width=300 /> | 현재 자신의 위치에서 원하는 음식점을 찾을 수 있도록 도와주는 어플리케이션입니다. 이용자는 어플리케이션을 통해 가까운 음식점 목록을 확인 할 수 있고, 음식점의 위치와 메뉴를 확인 할 수 있습니다.  또한 사용자들이 남긴 후기를 확인하고 음식점의 총 평점을 볼 수 있습니다.  그리고 자신의 경험을 리뷰로 남겨 다른 이용자들에게 자신의 경험을 공유할 수 있습니다. |
| 참여자                         | 진승찬<br />장소희                                           |
| :date: 예상기간                | 20.11.2 ~ 20.11.18                                           |

## 	세부계획

* STAGE 1 - 화면 구성 

  * :page_facing_up: 메인 페이지 
    * 음식 종류 선택 :pizza: :meat_on_bone: :coffee: :cake: :ramen: :hamburger:
    * 오늘의 추천 메뉴
  * 맛집 리스트
    * 선택된 음식의 가까운 위치 맛집 리스트 
    * 해당 음식점 까지의 거리 
    * 총 평점 :star::star::star::star::star:
  * :page_facing_up: 맛집 상세 정보 페이지 
    * 메뉴 
    * 메뉴의 가격 :moneybag:
    * 위치 - 지도 OPEN API 사용
    * 사용자들의 리뷰 :laughing: :smile: :angry: :rage: 
  * :page_facing_up: 리뷰 페이지 
    * 작성자
    * 평점 :star:
    * 리뷰 :speech_balloon:
    * 사진(옵션) :camera:

* STAGE 2 - 데이터 모델링과 데이터베이스 구축

  * 음식점 관련 정보를 파악하여 데이터화 한다.
  * 클라우드에 데이터 베이스를 구축해 본다.

* STAGE 3 - <a href="https://ko.wikipedia.org/wiki/REST">REST API</a> 구축

  | Collection      | Screen        | URL                      |
  | --------------- | ------------- | ------------------------ |
  | 음식점          | 음식점 리스트 | /restraunts              |
  | 음식점 상세정보 | 음식점 정보   | /restruants/:restrauntid |

* STAGE 4 - REST API를 이용해 데이터베이스와 어플리케이션 연동

  * 데이터베이스에 어플리케이션이 직접 접근하지 않고 제공되는 REST API를 통해서 데이터를 읽거나 쓰고 데이터를 변경한다.


<p align="center">
    <img src="https://user-images.githubusercontent.com/73764308/97802855-a8061400-1c89-11eb-8de3-b736beeacd8a.PNG" alt="REST API" width="300px" />
    
                                   Figure 1. REST API를 통해 데이터베이스의 자원을 사용한다.
</p>

* STAGE 5 어플리케이션 꾸미기
  * 사용자 입장에서 편하게 어플리케이션을 사용할 수 있도록 UI를 다듬는다.
* STAGE 6 로그인 구성(옵션)
  * 개인정보 암호화

## 	사용기술 

* 버전 관리, 협업 프로그램 - Git, Github

* 데이터베이스 - MongoDB, PostgreSQL(옵션)

* 웹 어플리케이션 프레임워크 - Node.js, Express

* Front-end (옵션) - Angular or React
