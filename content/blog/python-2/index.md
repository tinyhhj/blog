---
title: "[python]patchmatch"
date: "2020-01-19T16:21:36.940Z"
description: "language"
---

## [patchmatch](https://gfx.cs.princeton.edu/pubs/Barnes_2009_PAR/)

위 논문을 대략적으로 훑어봤지만, 무슨 내용인지 1도 이해가 안됐다. 아무래도 논문에 아직 익숙하지 않고, 영어 독해능력이 미숙하고, 이미지 처리 분야에 낯설기 때문이라 생각된다. 이 논문에서는 소스코드를 공개하였는데, 간단한 코어 함수의 소스코드를 보니까, 논문을 읽었을 때보다 훨씬 쉽게 이해가 됐다.  
속도 향상을 위해서 랜덤적 요소를 도입한 부분도 인상적이었다.

### 흐름

1. 각 소스 패치와 타겟 패치의 매핑을 랜덤으로 정한다.
2. 소스패치 주변을 탐색하면서 더 나은 타겟 매핑이 있다면 이동한다.
3. 지금까지 찾은 최선점에서 다시 한번 랜덤으로 해당 구역내에서 더 나은 매핑을 찾는다.
4. 2와3을 여러번 반복한다.

### 구현 문제점

- 깔끔하고 이해하기 쉬운 알고리즘임에도 불구하고, 구현 중 디버깅의 어려움.
- 동작에 대한 확신이 없음(동작을 제대로 하는듯 싶으나 이게 맞는지 모름)
- 속도가 너무 느림

```python
from PIL import Image
import random
import sys

size=7
iter=5

class Node:
    def __init__(self):
        self.x = 0
        self.y = 0
        self.dist = 0
    def setDist(self,pos,dist):
        self.x = pos[1]
        self.y = pos[0]
        self.dist = dist

def getL2Norm(p1,p2):
    return (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2 + (p1[2]-p2[2])**2
def dist(img1,img2,p1,p2,sat = sys.maxsize):
    ans = 0
    for i in range(size):
        for j in range(size):
            ans += getL2Norm(img1.getpixel((p1[1]+j,p1[0]+i)), img2.getpixel((p2[1]+j, p2[0]+i)))
        if ans >= sat:
            return sat
    return ans

def unsigned(i):
    return i & 0xffffffffffffffff

def patchmatch(img1,img2):
    _width, _height = img1.size
    __width, __height = img2.size
    target = [[Node() for _ in range(_width)] for _ in range(_height)]
    for i in range(_height-size+1):
        for j in range(_width-size+1):
            x = random.randrange(0,__width-size+1)
            y = random.randrange(0,__height-size+1)
            target[i][j].setDist((y,x), dist(img1,img2,(i,j),(y,x)))
    print("random initialization finish")
    # iter만큼 반복한다.
    for it in range(iter):
        # 방향을 왼>오,위>아래 or 반대
        xst,xend,xd = 0,_width-size+1,1
        yst,yend,yd = 0,_height-size+1,1
        if it %2 == 1:
            xst, xend,xd = _width-size, -1,-1
            yst, yend,yd = _height-size,-1,-1
        for i in range(yst,yend,yd):
            for j in range(xst,xend,xd):
                # 최선의 매핑지점 in img2
                bestY = target[i][j].y
                bestX = target[i][j].x
                bestDist = target[i][j].dist

                # x축 이전단계와 비교하여 더 비슷한 매핑을 따른다
                # j-xd = j == 0 일때 -1이 되야함
                # j == _width-size+1+x 이 -1 x = -_width+size-2
                # j-xd = _width-size + 1 = -1
                if  unsigned(j-xd) < unsigned(_width-size+1):
                    compareY = target[i][j-xd].y
                    compareX = target[i][j - xd].x + xd
                    if unsigned(compareX) < unsigned(__width-size+1):
                        compareDist = dist(img1, img2, (i, j), (compareY, compareX), bestDist)
                        if bestDist > compareDist:
                            bestY = compareY
                            bestX = compareX
                            bestDist = compareDist

                # y축 이전단계와 비교
                if unsigned(i-yd) < unsigned(_height-size+1):
                    compareY = target[i-yd][j].y+yd
                    compareX = target[i-yd][j].x
                    if unsigned(compareY) < unsigned(__height-size+1):
                        compareDist = dist(img1,img2,(i,j),(compareY,compareX),bestDist)
                        if bestDist > compareDist:
                            bestY = compareY
                            bestX = compareX
                            bestDist = compareDist

                # best guess 주변에서 탐색
                r = max(__width,__height)
                while r >= 1:
                    #print("r is %d"%r)
                    xmin = max(0,bestX - r)
                    xmax = min(bestX+r+1, __width-size+1)
                    ymin = max(0, bestY - r)
                    ymax = min(bestY+r+1, __height-size+1)
                    xp = random.randrange(xmin,xmax)
                    yp = random.randrange(ymin,ymax)
                    compareDist = dist(img1,img2,(i,j),(yp,xp),bestDist)
                    if bestDist > compareDist:
                        bestY = yp
                        bestX = xp
                        bestDist = compareDist
                    r = r//2
                target[i][j].setDist((bestY, bestX),bestDist)
        #print("iter: %d"%it)

    return target;
if __name__ == '__main__':
    img1 = Image.open('a.png')
    img2 = Image.open('b.png')

    # img1.show()
    # img2.show()
    img3 = patchmatch(img2,img1)
    img4 = Image.new('RGB',img2.size)
    # (200,0,380,200)
    for i in range(img2.size[1]):
        for j in range(img2.size[0]):
            print("%d %d mapping %d %d"%(i,j,img3[i][j].y,img3[i][j].x))
            img4.putpixel((j,i),img1.getpixel((img3[i][j].x, img3[i][j].y)))
    img4.save('c.png')

```
