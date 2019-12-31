---
title: "[boj]1074"
date: "2019-12-31T17:31:38.508Z"
description: "algorithm"
---

# [Z](https://www.acmicpc.net/problem/1074)

## 재귀호출

> 문제: z로 탐색할 때, n,r,c가 주어졌을 때 순서를 리턴
> 문제의 조각: nrc가 주어졌을때 순서를 리턴
> 기저조건 : n이 0인경우는 무조건 순서가 1
> 그 외 : 1 2 3 4 구역 나누기
> 1구역이라면 1구역 내에서 순서 리턴
> 2구역이라면 1구역 갯수 + 2구역 내에서 순서 리턴
> 3구역이라면 2구역 까지 갯수 + 3구역 내에서 순서
> 4구역이라면 3구역 까지 갯수 + 4구역 내에서 순서

```{.java}
static int getZOrder(int n , int r , int c) {
        if( n == 0) {
            return 1;
        }
        int num = 1 << n-1;
        //1
        if( num > r && num > c) {
           return getZOrder(n-1, r,c);
        }
        //2
        else if( num > r && num <= c) {
            return (num *num) + getZOrder(n-1, r, c- num);
        }
        //3
        else if( num <= r && num > c) {
            return (num *num * 2) + getZOrder(n-1,r-num , c);
        }
        //4
        else {
            return (num *num * 3) + getZOrder(n-1, r-num, c-num);
        }
    }
```
