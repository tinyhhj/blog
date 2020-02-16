---
title: "[python]star argument"
date: "2020-02-16T15:29:48.309Z"
description: "language"
---

## star argument  
간혹 함수 형식을 보면 덜렁 (*)만 있는 경우를 볼 수 있는데, 무슨 뜻인지 궁금해서 찾아보았습니다.  
keyword-only 변수를 편하게 사용하기 위해서 고안된 듯 싶습니다. 기존에도 **kwargs와 *args를 함께사용하여 가변변수와 키워드 변수를 함께 사용할 수 있었지만, 키워드 변수를 함수 내부에서 해체해야하는 번거로움이 존재했습니다.(`이전에는 가변 변수 이후에 단독으로 키워드 변수가 존재할 수 없었다는 듯이 써있습니다.`)  

### 변경 
1. 가변 변수 이후에 단독으로 키워드 변수가 존재할 수 있습니다.
2. 일반 변수와 키워드 변수를 구분하기 위해 경계선(*)를 사용할 수 있습니다. 
    def func(a,b,*,key='key'):
    pass
    #ok
    func('aa','bb')
    #ok
    func('aa','aa',key='dd')
    #error positional argument only 2
    func('aa','bb','cc',key='ddd')


### reference
[stackoverflow](https://stackoverflow.com/questions/53797057/star-as-an-argument-in-python-function)
[PEP 3102](https://www.python.org/dev/peps/pep-3102/)

