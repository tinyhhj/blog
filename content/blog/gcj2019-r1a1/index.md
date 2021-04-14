---
title: "[gcj2019-r1a1]Pylons"
date: "2020-01-17T11:50:12.203Z"
description: "algorithm"
---

## [Pylons](https://codingcompetitions.withgoogle.com/codejam/round/0000000000051635/0000000000104e03)

### brute force

고려해야할점: test1의 경우에는 dfs로 풀면 크기가 작아서 통과하는것 같으나 test2셋의 경우에 너무 크기가 커져서 타임아웃 발생  
계속 고민하다가 안나와서 결국 답안을 봤는데, 신세계였다. 간단하지만 절대 알고리즘을 풀면서 시도하지 못했던 방법을 제공했다.  
brute force이나 랜덤요소를 추가한 것이다. 워낙 사이즈가 크기 때문에 다양한 경로(정답)이 있을것이고, 문제에서 요구하는 것은 단 하나의 정답의 유무이기 때문에, 많은 경우의 수 중에 한번만 정답을 지나가면 풀 수 있다는 말이다.

여태 랜덤적인 요소를 알고리즘에서 절대 사용하면 안된다고 생각했었는데, 내 오산이었다.  
여러모로 내 상식을 넓혀주는 문제였다.

#### java

1차만 통과

```
package codejam.r1a.q1;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.IntStream;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(new BufferedReader(new InputStreamReader(System.in)));
        int tc = sc.nextInt();
        for( int i = 0 ; i < tc ; i++ ) {
            int r = sc.nextInt(), c = sc.nextInt();
            int[][] path = new int[r*c][];
            boolean res = findRoute(path,new boolean[r][c], 0);
            if(res) {
                System.out.println(String.format("Case #%d: POSSIBLE",i+1));
                for( int j = 0 ; j < path.length; j++) {
                    System.out.println(path[j][0]+1 + " " + (path[j][1]+1));
                }
            } else {
                System.out.println(String.format("Case #%d: IMPOSSIBLE",i+1));
            }

        }
    }

    //backtracking
    public static boolean findRoute(int[][] path, boolean[][] visited,int leng) {
        // finish?
        if( leng == path.length) {
            return true;
        }
        // cant go anywhere
        if( cantGoAnywhere(path,visited,leng)) {
            return false;
        }

        // find other
        // x 2 x 4 x
        // x 2 x 9 1
        for ( Integer[] i: next(path,visited,leng)) {
            int rr = i[0];
            int cc = i[1];

            visited[rr][cc] = true;
            path[leng] = new int[]{rr,cc};
            if( findRoute(path,visited, leng+1)) {
                return true;
            }
            visited[rr][cc] = false;
        };
        return false;
    }

    private static boolean cantGoAnywhere(int[][] path, boolean[][] visited,int leng) {
        if (!next(path,visited,leng).isEmpty()) return false;
        return true;
    }

    private static List<Integer[]> next(int[][] path, boolean[][] visited,int leng) {
        List<Integer[]> res = new ArrayList<>();
        for( int i = 0 ; i < visited.length ; i++) {
            for( int j = 0 ; j < visited[i].length; j++) {
                if( leng ==0 ){
                    res.add(new Integer[]{i,j});
                } else if( !visited[i][j] ) {
                    int y = path[leng-1][0];
                    int x = path[leng-1][1];
                    if( y == i || x == j || i-j == y-x || i+j == y+x) continue;
                    res.add(new Integer[]{i,j});
                }
            }
        }
        return res;
    }
}

```

#### python

랜덤요소+

```
import queue
import random
# bfs
t = int(input())

def isInvalid(r,c,r1,c1):
    return r == r1 or c == c1 or r+c == r1+c1 or r-c == r1-c1

def bfs(mat,path, visit):
    q = queue.Queue()
    q.put(path[0])
    path.clear()

    while not q.empty():
        n = q.get()
        r,c = n
        path.append((r,c))
        visit[r][c] = True
        for i in mat[r][c]:
            r1,c1 = i
            if not visit[r1][c1]:
                q.put((r1,c1))


    return True
def dfs(mat, path,visit,r,c):
    # visit
    path.append((r, c))
    visit[r][c] = True

    if len(path) == len(visit)*len(visit[0]):
        return True

    for i in mat[r][c]:
        if not visit[i[0]][i[1]]:
            if dfs(mat,path,visit,i[0],i[1]):
                return True

    path.pop()
    visit[r][c]= False


for __ in range(t):
    a = input()
    [r,c] = a.split(' ')
    r= int(r)
    c = int(c)

    # 2 for loop
    # r<=20 , c <=20 400 * 400 = 160000
    Matrix = [[[] for x in range(c)] for y in range(r)]
    for i in range(r):
        for j in range(c):
            for k in range(r):
                for l in range(c):
                    # valid point added
                    if not isInvalid(i,j,k,l):
                        Matrix[i][j].append((k,l))
            random.shuffle(Matrix[i][j])



    # memory for visit
    # print(Matrix)
    rr = [x for x in range(r)]
    cc = [x for x in range(c)]
    random.shuffle(rr)
    random.shuffle(cc)
    for i in rr:
        for j in cc:
            finish = False
            visit = [[False for x in range(c)] for y in range(r)]
            path = []
            if dfs(Matrix,path,visit,i,j):
                finish = True
                break
        if finish:
            break
    if finish:
        print("Case #%d: %s"%(__+1, "POSSIBLE"))
        for i in path:
            print("%d %d"%(i[0]+1,i[1]+1))
    else:
        print("Case #%d: %s"%(__+1,"IMPOSSIBLE"))

```
