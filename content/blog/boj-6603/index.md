---
title: "[boj]6603"
date: "2020-01-11T08:51:53.736Z"
description: "algorithm"
---

# [로또](https://www.acmicpc.net/problem/6603)

## 조합

> 생각보다 조합을 구현하는 법이 어렵다고 느꼈다. 순열의 경우에는 더 간단하게 구현이 되었던거 같은데 조합의 경우에는
> 집합의 전체갯수, 뽑는 갯수, 현재 index(집합을 모두 순회했는데 뽑아야하는 갯수가 남아있다면 조합의 경우가 없는 경우이다.)
> nCr = n-1Cr-1 + n-1Cr 의 의미를 돌아보면 n번째 원소를 뽑는경우 나머지에서 r-1개의 원소를 뽑는 경우의수와 n을 뽑지 않아서 나머지에서 r개의 원소를 뽑는경우이다. 즉 재귀호출을 구현할 때에도 집합을 순회하면서 현재 위치를 index로 저장해두면서 현재 index의 원소를 뽑는경우와 안뽑는경우로 나누어 재귀호출을 한다.
> 기저조건은 뽑아야하는 갯수를 다 뽑았을 경우이다.
> 그 외 집합을 모두 순회한경우에도 뽑아야하는 갯수를 다 뽑지 못한경우는 조합을 조립하지 못하는 경우이므로 넘어간다.

```java
package boj;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Boj6603 {
    public static void main(String[] args) throws FileNotFoundException {
//        7 1 2 3 4 5 6 7
//        8 1 2 3 5 8 13 21 34
//        0
//        Scanner sc = new Scanner(new BufferedReader(new InputStreamReader(new FileInputStream("boj/6603.txt"))));
        Scanner sc = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int n = sc.nextInt();
        while(n != 0) {
            int[] arr = new int[n];
            for( int i =0 ; i < n ; i++) {
                arr[i]= sc.nextInt();
            }
            printLotto(IntStream.of(arr).boxed().collect(Collectors.toList()),6,0,new ArrayList<>());
           n = sc.nextInt();
           System.out.println("");
        }
    }

    // 조합
    // input: 집합, 뽑아야하는 조합개수, 지금까지 뽑은 숫자들
    // output: void
    // 어떻게 조합을 중복제거할 수 있을까
    public static void printLotto(List<Integer> group, int k, int cur, List<Integer> arr) {
        if( arr.size() == k) {
            out(arr);
        } else if( cur == group.size()) return;
        else {

            arr.add(group.get(cur));
            printLotto(group, k, cur + 1, arr);
            arr.remove(arr.size() - 1);
            printLotto(group, k, cur + 1, arr);
        }
    }

    public static void out(List<Integer> list) {
        StringBuilder sb = new StringBuilder();
        for(Integer i : list) {
            sb.append(" " + i);
        }
        System.out.println(sb.substring(1));
    }
}

```
