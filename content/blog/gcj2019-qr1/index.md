---
title: "[gcj2019-qr1]Foregone Solution"
date: "2020-01-09T16:44:23.754Z"
description: "algorithm"
---

# [Foregone Solution](https://codingcompetitions.withgoogle.com/codejam/round/0000000000051705/0000000000088231)

## 생각

> 4는 2 2 로 나뉘기 때문에 4를 2로 변경해주면 된다.
> 숫자가 크기때문에 스트링으로 출력
> 숫자형태로 만들기 위해서 앞의 0은 제거

```{.java}
package codejam.qr2019.q1;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner in = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int tc = in.nextInt();
        in.nextLine();
        for(int i = 0; i < tc ; i++) {
            String num = in.nextLine();
            String num1 = num.replaceAll("4","2");
            String num2 = num.replaceAll("[^4]","0")
                    .replaceAll("4","2")
                    .replaceAll("^0*2","2")
                    ;
            System.out.println(String.format("Case #%d: %s %s",i+1,num1,num2));
        }

    }
}
```