---
title: "[javascript]classes"
date: "2020-06-11T13:20:57.079Z"
description: "lang"
---

## [Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

요즘 기본에 충실하지 못한다는 느낌이 자꾸 들어서, javascript 객체문법에 대해서 공부 겸 글을 쓴다.
원래 javascript에서는 클래스 문법이 존재하지 않았지만, ECMAScript 2015(ES6)에서 javascript class 문법이 소개되었다.
물론 내부적으로는 function형태로 구성되어있지만, 타 언어들과 비슷한 문법을 사용하여 보기에 편해진 감이 있다.

### class 선언 vs 표현식

클래스도 function과 비슷하게 선언식과 표현식이 있는데, function과는 다르게 클래스 선언식은 **hoisting**이 되지 않는다.
함수 선언 vs 표현식과 비슷하게 클래스 표현식은 클래스 선언과 중요한 차이점은 클래스 이름의 유무이다.
클래스 선언의 경우에는 클래스 이름이 필수이기때문에 정해지는 반면에, 클래스의 표현식은 클래스 이름이 있는경우엔 클래스 이름이 사용되고,
없는 경우에는 변수명을 따른다.  
 **이름을 가진 클래스 표현식의 이름은 class body scope내에서만 유효한다**

### class method

class 내부적으로는 **stirct mode**로 실행되기때문에, this 사용에 주의를 하여야 한다.

1. constructor  
   생성자로써 객체를 생성하는 함수이며, 부모 클래스는 super 키워드를 사용해서 접근한다.
2. prototype method  
   클래스 내부적으로 선언하는 함수의 경우에 prototype에 정의되어, 해당 클래스의 모든 객체들은 함수를 공유하여 사용할 수 있다.
3. static method
   클래스 메소드로써, 타언어에서는 객체에서도 클래스 함수에 접근할 수 있지만, javascript에서는 객체에서 접근할 수 없다.  
   javascript에서는 함수도 1급 객체이므로(?), 클래스 함수에 접근하려면 클래스에 직접 접근하여 사용해야한다.

**객체 속성의 경우에는 클래스 메소드 내에서 선언되어야하며, 클래스나 프로토타입의 속성의 경우 클래스 body 바깥에서 선언되어야 한다.**

### class extends

객체를 상속할 수도 있으며, 객체 - class function prototype - super class prototype ... 형식으로 연결된다.
즉 클래스내부에서 선언된 함수들의 집합의 연결이라고 생각하면 된다.  
단 클래스 상속은 생성자가 있는 객체들만 상속이 가능하다.

**만약 생성자가 없는 객체들의 상속을 하려면 Object.setprototypeof을 이용해야한다**
