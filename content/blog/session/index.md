---
title: "Session"
date: "2019-12-26T12:59:42.847Z"
description: "work"
---

# Session

최근 세션 관련한 이슈를 해결하면서 관련된 내용을 정리한다.

클라이언트에서 서비스를 이용하는데 간헐적으로 session is already invalidated 라는 에러 메세지를 뱉는것이다.
해당 로그를 찾아보니 클라이언트에서 무슨 이유인지는 모르나 동시다발적으로 한번에 4개의 동일한 요청을 날리는 것을 볼 수 있었다.

기존 리소스서버 공통 인증로직에서는 세션의 유무를 체크한 뒤, 유효한 세션이 아니라면 session.invalidate() 이후 새로운 세션을 새로 생성하는 방식으로 작동하고 있었지만, 동시에 4개의 동일한 요청이 들어왔을 경우 동시성의 문제로 request.getSession(false)가 2개의 요청에 대해서 세션을 리턴해준 뒤, 순차적으로 해당 세션을 invalidate()를 시켰고, 당연히 첫번째 스레드에 의해 invalidate된 세션은 두번째 스레드에 의한 invalidate 호출에 의해서 에러가 발생했던 것이다.

해당 부분은 SecurityContext를 위해서 세션을 체크하는것이므로, 세션 invalidate 대신, SecurityContextHolder.clearContext()로 수정하였다.

## 구조 

SecurityContextPersistenceFilter: SecurityContextRepository를 이용해서 SecurityContext를 요청시에 load하거나 save한다.
SecurityContextRepository: Security를 저장하는 역할을 담당한다. sessionCreationPolicy에 따라 해당 전략을 변경한다.

1. sessionCreationPolicy 가 stateless일 경우 - NullSecurityContextRepository
2. 그외 HttpSessionSecurityContextRepository를 사용

## 추상적 흐름(Security context)

SecurityContextPersistenceFilter -> SecurityContext 작업 -> SessionManagementFilter

1. 요청에 대한 Seucrity Context를 로드한다.
2. 인증을 통해서 Context를 작업한다.
3. 해당 요청에 Security Context가 존재하지 않는다면 세션인증전략을 진행하고 Security를 저장한다.
4. 3.에서 요청에 context가 존재하여 진행되지 않았다면 해당 context를 다음 요청을 위해 저장한다.


## 참조
[baeldung](https://www.baeldung.com/spring-security-session)
 
