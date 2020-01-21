---
title: "[algospot]quadtree"
date: "2020-01-20T12:31:33.766Z"
description: "algorithm"
---

## [QUADTREE](https://algospot.com/judge/problem/read/QUADTREE)

### 분할정복
1. 분할정복 문제이므로 분할정복 문제를 푸는 solution 함수 input / output 정의
    1. input: 압축 string
    2. output: 거꾸로 압축된 string
2. 분할정복을 푸는 solution 함수를 적용할 수 있게끔 문제를 분할한다. 
    1. 크기가 작은 4개의 작은 문제로 쪼개기 가능 (분할)
    2. 작은 문제가 모두 같은 색일경우 더 이상 쪼갤 수 없다. (기저조건)
    3. 기존의 문제를 뒤집는 문제이기 때문에 3412순으로 다시 재배열한다. (병합)

### 회고
1. 작은 문제로 쪼갤 수 있다면 일단 문제 함수 정의를 잘 정한뒤, 분할 정복을 이용한다.
2. 분할, 병합, 기저조건을 잊지말자

```{.python}
# solution
# input : 압축된 string
# output: 거꾸로 뒤집은 압축된 string

def solution(string):
    # 기저조건
    # 하나의 색인경우
    # w,b인경우
    if(string[0] != 'x'):
        return string[0]

    # x로 시작하는 경우에는 어떻게 나눌것인가?
    first = solution(string[1:])
    second = solution(string[1+len(first):])
    third = solution(string[1+len(first)+ len(second):])
    fourth = solution(string[1+len(first)+len(second) + len(third):])
    return 'x'+third + fourth + first + second


if __name__ == '__main__':
    tc = input()
    for i in range(int(tc)):
        string = input()
        print(solution(string))
```

    
    