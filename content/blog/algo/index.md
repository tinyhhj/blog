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

[BOGGLE](https://algospot.com/judge/problem/read/BOGGLE)

## 전
```{.java}
import java.io.*;
import java.util.stream.IntStream;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("test.txt")));
        String testcase = br.readLine();

        for( int i =0 ; i < Integer.valueOf(testcase) ; i++) {
            char[][] arr = new char[5][5];
            for( int j =0 ; j < 5 ; j++) {
                arr[j] = br.readLine().toCharArray();
            }
            int num = Integer.valueOf(br.readLine());
            for( int k = 0 ; k < num; k++) {
                char[] word = br.readLine().toCharArray();
                boolean find = false;
                int y = -1, x = 0;
                for(int z = 0 ; z < 25; z++) {
                    if( z % 5 == 0) {
                        y++;
                        x=0;
                    } else {
                        x++;
                    }
                    if( findWord(arr, y,x,word)) {
                        System.out.println(new String(word)+ " " + "YES");
                        find = true;
                        break;
                    }
                }
                if( !find) {
                    System.out.println(new String(word)+ " " + "NO");
                }

            }
        }

    }

    private static boolean findWord(char[][] arr, int y, int x , char[] word) {
        if( word.length == 1) {
            if( arr[y][x] == word[0]) return true;
            else return false;
        }
        if( arr[y][x] == word[0]) {
            int yy = y-2, xx = x-1;
            for( int kk =0 ; kk < 9 ; kk++) {
                if( kk % 3 == 0) {
                    yy++;
                    xx = x-1;
                } else {
                    xx++;
                }
                if( kk == 4) continue;
                if( yy >=0 && yy<5&&xx >=0 && xx<5) {
                    if( findWord(arr,yy,xx,new String(word).substring(1).toCharArray())) {
                        return true;
                    }
                }
            }

        }
        return false;
    }
}
```

## 해결
```{.java}
package algospot.boggle;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Main {
    static char[][] arr;
    static int[][] directions = {
            {-1,-1},
            {-1,0},
            {-1,1},
            {0,-1},
            {0,1},
            {1,-1},
            {1,0},
            {1,1}
    };
    static int[][][] cache ;
    public static void main(String[] args) throws IOException {

//        BufferedReader br = new BufferedReader((new InputStreamReader(new FileInputStream("algospot/boggle/test.txt"))));
        BufferedReader br = new BufferedReader((new InputStreamReader(System.in)));
        int tc = Integer.valueOf(br.readLine());
        for( int i = 0 ; i < tc ; i++) {
            arr = new char[5][5];
            arr[0] = br.readLine().toCharArray();
            arr[1] = br.readLine().toCharArray();
            arr[2] = br.readLine().toCharArray();
            arr[3] = br.readLine().toCharArray();
            arr[4] = br.readLine().toCharArray();


            int wordNum = Integer.valueOf(br.readLine());

            for( int j = 0 ; j < wordNum ; j++) {
                cache = new int[5][5][10];
                String word = br.readLine();
                if( findWord(word)) {
                    System.out.println(String.format("%s %s",word,"YES"));
                } else {
                    System.out.println(String.format("%s %s",word,"NO"));
                }
            }
        }

    }

    public static boolean findWord(String word) {
        return IntStream
                .range(0,25)
                .anyMatch(i->{
                    int y = i / 5;
                    int x = i % 5;
                    return findWord(y,x,word.toCharArray());
                });
    }

    public static boolean findWord(int y, int x , char[] word) {
        if( cache[y][x][word.length-1] == 1) {
            return true;
        } else if( cache[y][x][word.length-1] == -1) {
            return false;
        }
        if(word.length == 1 ) {
            return word[0] == arr[y][x];
        }

        if( word[0] == arr[y][x]) {
            boolean res = Stream.of(directions)
                    .anyMatch(i->{
                        int yy = y + i[0];
                        int xx = x + i[1];
                        if( yy >= 0 && yy < 5 && xx >=0 && xx < 5) return findWord(yy,xx,new String(word).substring(1).toCharArray());
                        return false;
                    });
            if(res) cache[y][x][word.length-1]= 1;
            else cache[y][x][word.length-1] = -1;
            return res;
        }

        return false;
    }
}
```

