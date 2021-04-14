---
title: "Algo"
date: "2019-12-26T17:31:38.508Z"
description: "links"
---

# 완전탐색

## 재귀호출
1~n의 합을 구할때 작은 조각으로 나눠 문제해결
1. n만 따로 빼냄: 1~n-1 조각(재귀)와 n 조각을 연산
2. 1만 따로 빼냄: 2~n 조각은 애초에 1~n까지의 합을 구한다는 원래의 문제와 다른 형태이므로 재귀로 사용 x
**기저사례**: 더이상 쪼개지지 않는 최소한의 작업 (존재하는 모든 입력이 항상 **기저사례**의 답을 이용할 수 있어야한다.)

### 접근방법
1. 최대 입력의 크기를 가늠하여 시간안에 도출할 수 있는지 예상
2. 가능한 모든 답의 후보를 만드는 과정을 여러 개의 선택으로 나눈 뒤, 각 선택은 답의 후보를 만드는 과정의 한조각이 된다.
3. 한 조각을 택해 답의 일부를 만들고, 나머지는 답을 재귀호출을 통해 완성
4. 조각이 하나 이하로 남은 경우에 답을 생성했으므로, 이것을 기저사례로 선택해 처리

### 이론적 배경
* 문제와 부분문제의 정의
> 문제: 주어진 자연수 정렬

> 문제: {4,2,50,2} 정렬

> 둘은 다른문제임. 전자는 입력을 정의하지 않은 반면, 후자는 특정한 입력을 지정하였기 때문

> 문제란 수행해야 할 작업과 그 작업을 적용할 자료의 조합을 뜻한다.

## 분할정복
분할정복은 문제를 작게 쪼갠다는 의미에서 재귀호출과 유사하지만, 차이점은 분할정복은 문제를 나눌 때, 크기를 비슷하게 쪼개는 반면에 재귀호출의 경우에는 문제 한조각과 나머지로 하나씩 떼어낸다는 성격(?)이 있다.

### 추상적 흐름
1. 문제를 더 작은 문제로 나눈다(분할)
2. 각 문제에 대한 답을 원래 문제로 합친다.(병합)
3. 더이상 답을 분할하지 않고 푼다.(기저조건)


## 큐
1. [remove-duplicate-letters](https://leetcode.com/problems/remove-duplicate-letters/)
2. [find-k-pairs-with-smallest-sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)
3. [longest-increasing-subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
4. [week-2-april-8th-april-14th/3706](https://leetcode.com/explore/challenge/card/april-leetcoding-challenge-2021/594/week-2-april-8th-april-14th/3706/)





