---
title: "Spring Chap. 2"
date: "2019-12-26T17:31:38.508Z"
description: "Toby Spring"
---

# 2장 
테스트
```
단위 테스트를 이용해서 기존의 코드가 정상 동작하는것을 확신할 수 있고, 테스트하고자 하는 기능에 집중해 테스트 할 수 있으므로, 장애 대응이 용이하다.
단위 테스트를 이용하면 많은 수의 테스트 케이스를 일일이 수행하는 작업과 결과값을 검증하는 작업을 자동화할 수 있다.
```

## 테스트 코드 작성

    junit은 프레임워크이기 때문에 ioc을 이용하여 테스트를 진행한다. 그렇기 때문에 main의 테스트 함수를 junit 테스트 코드로 변경해야한다.
    main 함수의 경우에는 제어권을 갖는다는 의미이기 때문이다.
    
    테스트 메소드는 "pulic"이어야하고, "@Test" 어노테이션을 붙여야 한다.
    
## 테스트가 이끄는 개발

   테스트를 먼저 만들어 테스트가 실패하는 것을 보고 나서 실제 비지니스 로직을 수정하여 완성한다.
   테스트 코드를 먼저 작성할 때에는 추가하고 싶은 기능을 코드로 표현해야 하는데,
   테스트 코드의 표현은 조건, 행위, 결과로 표현할 수 있다.
   ```
   조건: 어떤 조건을 가지고 ( 사용자 정보가 없을때)
   행위: 무엇을 할 때 (존재하지 않는 id로 조회를 하면)
   결과: 어떤 결과가 나온다.(exception이 발생한다.)
   ```
   
## 테스트 컨텍스트 관리

    테스트 시에 공통적인 로직은 @Before 나 @After를 이용해서 각 테스트 전과 후에 수행할 수 있다.
    또한 테스트는 각 메소드마다 독립성을 유지하기 위해서 새롭게 테스트객체가 생성되는데, 매번 테스트 컨텍스트를 인스턴스 변수에 두고 새로 생성하는것은 비효율적이다.
    따라서, 각 테스트 메소드마다 컨텍스트를 공유하기 위해서 클래스마다 딱 한번 실행되는 @BeforeClass를 사용해 스테틱 변수에 저장하여 사용하거나, 스프링이 직접 제공하는
    어플리케이션 컨텍스트 테스트 지원 기능을 사용하면 된다.
    
    어플리케이션 컨텍스트는 @ContextConfiguration을 사용한 뒤, ApplicationContext를 주입받는 식으로 작성하면 된다.
    테스트 컨텍스트는 메소드간의 공유뿐 아니라 테스트 클래스간 컨텍스트 설정이 같다면 공유도 가능하다.
    
## DI와 테스트
    
    컴포넌트 간, 인스턴스간 관계가 절대 변하지 않는 경우에는 DI를 사용하지 않아도 될까? 그렇지 않다.
    DI는 구현체를 동적으로 변경할 수 있다는 장점(프록시 패턴) 외에도 직접 DI를 통해서 작은 부분만을 테스트할 수 있는 유용한 기술이다.
    ```
    DataSource를 운영계와 테스트계를 따로 분리할 경우에,
    1. @DirtiesContext를 사용하여 @Before시마다 dao의 DataSource를 직접 SingleConnectionDataSource로 DI할 수 있다.
    2. 별도의 DI 설정파일을 만들어(ex: test-applicationContext.xml) @ContextConfiguration의 설정파일로 사용하여 운영계와 별도의 설정을 가지고 테스트를 실행할 수 있다.
    3. 스프링의 컨테이너 없이 @Before를 이용해서 직접 dao객체를 생성하고 SingleConnectionDataSource를 생성하여 DI시켜줄 수 있다.
   
   3가지 방법 중 우선적으로 스프링 컨테이너 없이 테스트할 수 있는 방법을 고려하고, 여러 오브젝트와 복잡한 의존관계를 갖고있는 오브젝트라면
   스프링 설정을 이용한 DI방식을 고려하자 
    ```
## 학습 테스트
    자신이 작성하지 않은 프레임워크나, 다른 개발팀에서 만든 라이브러리 등에 대해서 테스트를 작성하여, 깊은 이해를 이끌어 내는 테스트 작성 방식이다.
    
     
    
 