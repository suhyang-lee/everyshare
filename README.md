# 🍊 에브리쉐어 : EVERYSHARE

![Untitled](https://user-images.githubusercontent.com/74591219/111947292-80242980-8b20-11eb-8728-e5d86f3c6714.png)

## 🚀 개요

```
에브리쉐어는 `사지말고 공유하자`라는 이야기를 가지고 기획된 프로젝트 입니다.
가지고 있는 타이틀 그대로 모든것을 공유(대여)하며 또 다른 가치를 재생산하고자 하였습니다.

C to C 간 거래를 통하여 본인이 쓰지 않는 물건을 남들과 공유하면서
추가적인 경제적 이익을 추구할 수 있고, 대여자는 이를 통해 잘 사용하지 않는 물건을 소비하지 않으며,
부수적 이익을 추구할 수 있습니다.
```

### 🚨 프로젝트 기간

- **프로젝트 총 기간** : 2020.11.18 ~ 2020.03.12

- **프로젝트 기간 중 중단기간** : 2020.01.05 ~ 2020.02.17

  - **중단 사유** : 스터디 프로젝트 진행으로 인하여 자체적 중단 기간을 가졌습니다.

## 🚀 기술 스택

### 📚 프론트엔드(Front-end)

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-Saga-999999?style=flat-square&logo=Redux-Saga&logoColor=white"/>
<img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
<img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Adobe XD-FF61F6?style=flat-square&logo=Adobe XD&logoColor=white"/>
</p>

#### 🚨 기술 스택 선정 이유

```
✅ 프론트엔드 기술 스택은 최근에 사용이 많은 스택 위주로 사용하였습니다.
단, Redux는 이 전에 써 볼 기회가 잘 없어, 이번 프로젝트에 처음으로 도입하여 사용 해 보았습니다.
차후 진행하는 프로젝트는 MobX를 써볼 계획을 가지고 있습니다.

✅ GUI 디자인 툴은 이 전에 Figma를 사용 해 본적이 있어 AdobeXD로 진행하였습니다.

✅ 해당 프로젝트에서는 css-in-js 보다는 SCSS를 적극 활용하였지만,
팀 프로젝트 진행이나 포트폴리오 사이트 등에서는 emotion을 통한 css-in-js로 진행하고 있습니다.
```

### 📚 백엔드(Back-end)

<p>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=Express&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon-FF9900?style=flat-square&logo=Amazon&logoColor=white"/>
</p>

### 📚 그외(.etc)

<p align="left">
<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
    <img src="https://img.shields.io/badge/RESTfulAPI-000000?style=flat-square" />
</p>

## 🚀구현 사항

```
구현 사항에는 사이트 구성에 대한 설명과 결과물에 대한 내용이 작성되어있습니다.
```

### 📚 구현 로드맵

![loadmap](https://user-images.githubusercontent.com/74591219/111947295-831f1a00-8b20-11eb-9f06-82ce5723cb94.png)

### 📚 기능리스트

| 구현 | 구분           | 기능명세           | 설명                            |
| :--: | -------------- | ------------------ | ------------------------------- |
|  ✅  | **회원관리**   | 로그인             | 로그인을 한다                   |
|      |                | 로그아웃           | 로그인 상태에서 로그아웃을 한다 |
|      |                | 회원가입           | 회원정보를 등록한다             |
|      |                | 회원정보수정       | 회원정보를 수정한다             |
|      |                | 찜보기             | 찜한 물건을 확인한다            |
|      |                | 대여 물건 확인하기 | 대여/대여해준 물건을 확인한다   |
|  ✅  | **결제관리**   | 대여신청           | 물품 대여를 신청한다            |
|      |                | 대여확인           | 물품 대여 상태를 확인한다       |
|  ✅  | **게시판관리** | 물품등록           | 물품을 등록한다                 |
|      |                | 물품 삭제          | 등록한 물건을 삭제한다          |
|      |                | 물품 수정          | 등록한 물건을 수정한다          |
|      |                | 물품 조회          | 등록 된 물건을 조회한다         |
|  ✅  | **댓글관리**   | 댓글 등록          | 댓글을 등록한다                 |
|      |                | 댓글 수정          | 등록된 댓글을 수정한다          |
|      |                | 댓글 삭제          | 등록 된 댓글을 삭제한다         |

### 📚 추가사항

- nginx를 통한 HTTPS 설정
