---
title: "Spring Chap. 5"
date: "2019-12-26T16:00:39.375Z"
description: "Toby Spring"
---

# 서비스 추상화

## 조건

1. 유저에 등급을 추가하고, 등급 업 조건을 설정
   - 등급은 금, 은, 동
   - 등금 동->은 로그인 50회
   - 등급 은->금 추천 30회
2. 고려해야할 점
   - 중복된 부분 유무
   - 코드를 이해하기 쉬운지
   - 코드의 위치가 적합한지
   - 앞으로 변경이 일어난다면 어떤것이 있을 수 있고, 그 변화에 쉽게 대응할 수 있는지
3. 문제점
   - if/else if/else 블록: 레벨의 변화단계, 업그레이드 조건, 조건이 충족되었을 때 작업이 섞여있어서 이해하기 쉽지않음
   - 레벨이 늘어난다면?: if 블록 갯수 증가, level enum 수정,
   - 레벨 업 작업이 복잡해진다면?: 등급 업하는 service 메소드가 길어지고 복잡해짐(이해하기 힘들어짐)
   - if 조건문이 현재 레벨과 레벨 업 조건을 동시에 비교하는 부분?: 레벨이 동이면서 로그인이 49인 유저와 새로운 레벨의 유저가 else블록에서 함께 처리됨
     > 즉 상당히 변화에 취약하고 다루기 힘든 코드, 문제점이 무엇인지 파악하는것조차 힘듦
4. 리팩토링
   - 추상적인 흐름에서부터 로직 작성: 자주 변경될 가능성이 있는 구체적인 내용이 추상적인 로직의 흐름과 함께 썩여있음.
   ```
   function upgrade() {
       list users;
       foreach users
           canlevelup? upgrade : nothing
   }
   ```
   - canlevelup?
   ```
   function canlevelup(user) {
       level = userlevel
       level is basic login >= 50
       level is silver recommend >= 30
       other false
   }
   ```
   - upgrade
   ```
   function upgrad(user) {
       level = userlevel
       user.level = level.nextLevel
       update user
   }
   ```
5. 기능의 분리
   - 레벨을 업그레이드하는 정책을 유연하게 변경할 수 있도록 개선(전략패턴)
   - userService에서 레벨 업그레이드 정책을 분리한다. (interface를 통해 분리 후 di로 주입)

## 객체지향적 코드

**다른 오브젝트의 데이터를 가져와서 작업하는 대신, 데이터를 갖고있는 오브젝트에게 작업을 해달라고 요청한다.**
기존: userService가 user의 레벨을 가져와 조건을 판단하여 level수정
변경: userService가 user에게 레벨 수정요청, user가 level에게 다음level 요청

6. 트랜잭션
   jdbc의 트랜잭션은 하나의 connection을 사용하다가 닫는 사이에 일어난다. jdbc의 기본 설정은 db작업을 수행한 직후에 자동으로 커밋이 되도록 되어있으므로(따라서 작업마다 커밋해서 트랜잭션을 끝내버린다), 이 설정을 끔으로써 시작을 설정하고 commit이나 rollback으로 끝을 설정한다.(트랜잭션 경계설정)

   **중요한 점은 트랜잭션은 하나의 connection으로부터 사용하는것이므로 트랜잭션의 경계는 하나의 connection이 만들어지고 닫히는 범위 내에 존재해야한다.**

   ```.{.java}
   connection = datasource.getConnection() // connection 생성
   connection.setAutoCommit(false) // 트랜잭션 시작 설정
   connection.commit() or rollback() // 트랜잭션 끝 설정
   connection.close()                // connection close
   ```

   하지만 서비스에서 트랜잭션 경계를 위의 방법으로 설정하기 위해서는 다음과 같은 문제점이 따른다.

   - jdbc api를 사용해 순수 비지니스로직만을 담아내지 못하고
   - dao메소드와 service메소드에 connection 파라미터가 추가된다.(경계설정한 connection을 공유하기 위해서)
   - dao interface에 connection 파라미터가 들어간다는것은 데이터 액세스 기술에 종속적이라는 의미이다(jpa나 하이버네이트 구현방식 변경하려면 interface부터 모두 변경해야한다.)

```
트랜잭션의 종류
    * 로컬 트랜잭션: jdbc의 connection을 이용한 트랜잭션 방식 (하나의 connection에 종속적이다)
    * 글로벌 트랜잭션: 여러 db에 대한 작업을 하나의 트랜잭션으로 묶을때 사용하는 방식(트랜잭션매니저 이용)
```

    트랜잭션 동기화 방식을(jdbc connection을 이용한) 통해 트랜잭션 경계를 구성할 수 있지만 다음과 같은 문제점이 따른다.
    1. jdbc api connection을 이용한 방식이기 때문에 글로벌 트랜잭션 적용이 불가능하다( 적용하려면 service 로직 수정)
    2. jPA나 hibernate의 경우에 독자적인 트랜잭션 관리 api를 사용하므로 적용이 불가능하다( 적용하려면 service 로직 수정)

    **즉 기술환경에 종속적인 코드가 된다**

7. 서비스 추상화
   - 일반적으로 서비스 추상화란 트랜잭션과 같이 기능은 유사하나 사용 방법이 다른 로우레벨의 다양한 기술에 대해 인터페이스와 일관성 있는 접근 방법을 제공해주는 것이나 JavaMail 처럼 테스트를 어렵게 만드는 api를 사용할 때도 적용이 가능하다.
