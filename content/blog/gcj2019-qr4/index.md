---
title: "[gcj2019-qr4]Dat Bae"
date: "2020-01-14T11:02:43.480Z"
description: "algorithm"
---

# [Dat Bae](https://codingcompetitions.withgoogle.com/codejam/round/0000000000051705/00000000000881de)

## 비트 연산자??

입력: n개의 비트
출력: 부서진 워커 id

n개의 비트가 주어졌을 때, 부서진 워커를 제외하고 응답이 옴. 워커의 index가 곧 id이기때문에 몇번째 워커가 죽었는지 판단하면 됨.

1. 무식하게 풀 수 있을까?
   처음 문제를 보고 드는 생각은 재귀형식이었다. 비트가 n/2로 나눠도 크기가 작지만 같은 문제이기 때문에?
   n개의 비트중에 응답이 없는게 있으므로 순서 자체가 바뀌지 않았지만, 출력에 대응되는 index가 바뀌었다.
   n개를 입력으로 줬을경우에 n-b가 출력된다고 가정

N = 5 and the 0th and 3rd workers are broken (so B = 2).
TEST_STORE 01101 returns 111.
TEST_STORE 00110 returns 010.
TEST_STORE 01010 returns 100.
TEST_STORE 11010 also returns 100.

```
1차 set에는 10번까지 query할 수 있고, 2차 set에서는 5번까지 query할 수 있지만, 기본적인 흐름도 구현을 못한채, 난 오로지 더 효율적인 알고리즘(방법)만을 생각했다.(주어진 기회를 모두 활용할 생각조차 애초에 안했다.) 문득 문제를 풀때마다, 자주 발견되는 실수인데 최대의 효율만을 목표로 삼아 정작 문제는 하나도 건들이지 못한 경우가 많다. 이 문제에서도 바로 그런 실수를 했던것 같다.
```

해결: 결국 혼자 너무 많은 시간을 낭비하기보다 주어진 답안을 어느정도 참고하는게 좋다고 생각이 들어서 1차 set의 솔루션을 참고했다.
즉 10번의 query를 던질 수 있으며 최대 비트수는 1024이다. 즉 2^10은 1024이기때문에 어느정도 문제 출제자가 힌트를 준셈이나 마찬가지였다.
n개의 비트를 10번 던져서 몇번 비트가 고장났는지 찾기 힘든이유는 0과 1만 사용할 수 있기 때문이다. 0과 1 밖에 없기때문에 01010이 나왔을 때, 순서를
기억하지 못하기 때문이다. 즉 0-9까지 사용할 수 있다고 생각한다면 10자리 비트의 경우에 1번의 query로 몇번 비트가 고장났는지 알 수 있다.
0123456789 -> 01234589 일경우 (67이 빠짐을 바로 알 수 있다.), 즉 각 비트마다 고유의 값으로 구분할 수 있다면 어느 비트가 고장났는지 알 수 있다. 따라서 query를 10번 던질수 있다는 말은 10번의 쿼리를 던져서 각 순서마다 고유한 값을 매핑시켜줄 수 있다.

```
n이 5라고 했을경우에 왼쪽 열부터 0 1 2 3 4를 매핑시켜줄 수 있다. 즉 10번의 query라는 말은 1024개의 각각 다른 값을 하나의 열에 매핑시킬 수 있다는 말이다.
01010
00110
00001
00000
00000
```

위 해결방법을 이용하면 1set을 풀수 있고, 2번의 경우에는 query가 5번이므로 32개의 고유한값을 매핑시켜줄 수 있는 반면에 n은 최대가 1024이다.
하지만 고장난 워커의 갯수는 최대가 15인데, 이 말인 즉, 고장난 워커들이 한곳에 다 뭉쳐있다고 하더라도 32개보다 작으므로 하나의 세트가 통째로 없어지는 일은 없다는 말이다. 즉 (1-32)(1-32)(1-32).. 32개의 고유한값을 반복적으로 이어나갈때 32 이후에 다시 1이 나타난다고 했을경우에 32과 1사이에 하나의 세트가(32개) 통째로 들어갈 수 없으므로 하나의 세트에서 다음 세트로 넘어갔을 경우에는 (N(i) > N(i+1)) 32를 앞의 세트갯수만큼 offset해주면 된다.

느낀점: 처음으로 interactive한 문제를 풀어봤는데 문제를 위해 제공해준 interactive_runner 부터 testing_tool까지 정말 신세계였다. 너무 신기하고 좋은 경험이었다.

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        String enc = new java.io.OutputStreamWriter(System.out).getEncoding();

        System.err.println("default encoding = " + enc);
        System.err.flush();
        Scanner sc = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int tc = sc.nextInt();
        System.err.println("tc " + tc);
//        System.err.flush();
        for( int i = 0 ; i < tc ; i++) {
            int n = sc.nextInt(),
                b = sc.nextInt(),
                f = sc.nextInt();
            System.err.println("nbf " + n + b+f);
//            System.err.flush();
            sc.nextLine();
            List<String> response = new ArrayList<>();

            for( int j = 0 ; j < f ; j++) {
                query(n,b,f,response, sc);
            }
            System.err.println("finish query");
            solve(n,b,f,response);

            if( sc.nextInt() == -1) {
                System.exit(1);
            }
        }

    }

    private static void solve(int n, int b, int f, List<String> response) {
        List<Integer> workers = new ArrayList<>();
        boolean[] workersOrig = new boolean[n];
        for( int i = 0 ; i < n-b ; i++) {
            int res = 0;
            for( int j = f-1 ; j >= 0 ; j--) {
                if(response.get(j).toCharArray()[i] -'0' == 1)
                    res++;
                res = res << 1;
            }
            workers.add(res >> 1);
        }

//        System.err.println("expected workers: " + workers);
        workersOrig[workers.get(0)] = true;
        int up = 0;
        for( int i = 1 ; i < workers.size() ; i++) {
            int id = workers.get(i);
            if( workers.get(i-1) > id) {
                up++;
            }
            id += (up * 32) ;
//            System.err.println("id: " + id);
            workersOrig[id] = true;
        }
        String anwser = "";
        for( int i = 0 ; i < n ; i++) {
            if( !workersOrig[i]) anwser += i + " ";
        }
//        System.err.println("expected solve: " + anwser.substring(0, anwser.length()-1));
        System.out.println(anwser.substring(0, anwser.length()-1));
        System.out.flush();


    }

    private static void query(int n, int b, int f, List<String> response,Scanner sc) {
        String res = "";
        for( int i = 0 ; i < n ; i++) {
            res += (((i % 32) >> response.size()) & 1) == 1 ? "1" : "0";
        }
        System.err.println("query is " + res);
        System.out.println(res);
        System.out.flush();

        res = sc.nextLine();
        System.err.println("res is " + res);

        if( res.equals("-1")) {
            System.err.println("error res is " + res);
            System.err.flush();
            System.exit(1);
        }

        response.add(res);
    }

}

```
