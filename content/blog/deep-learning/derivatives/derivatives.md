---
title: "[deeplearning]derivatives"
date: "2020-02-06T14:49:11.780Z"
description: "deep-learning"
---

## 미분

미분을 할때 어렵게 느껴지는 이유는 많은 것을, 한번에 해결하려고 하기 때문입니다. 또한 많은 실수를 야기합니다.
그래서 다차원 미분을 할때에, 단순한 수식부터 확장해 나가는것이 좋습니다.

### 벡터미분

$\\overrightharpoon{y} = W\overrightharpoon{x}$의 벡터 미분일고 각 벡터의 크기는 y(A,1),W(A,B),x(B,1) 일때,

1. 스칼라 결과값을 갖는 수식을 작성해봅니다.  
   $\frac{\partial \overrightharpoon{y_3}}{\partial \overrightharpoon{x_7}}$  
   $\sum\limits_{j=1}^D W_{\3_j}\overrightharpoon{x_j}$  
   벡터 수식에서 훨씬 단순한 스칼라 결과값을 갖는 수식으로 변경했습니다.
2. 요약 기호들을 삭제합니다.($\sum$, $\prod$)
   미분을 할 때, 수식을 줄여주는 기호들로 인해 실수를 하는 경우가 많습니다. 만약 미분에 익숙하지 않은 경우에 수식을 풀어서 표시하는게 좋습니다.  
   $\overrightharpoon{y} = {W_31}\overrightharpoon{x_1} + {W_32}\overrightharpoon{x_2} + ... + {W_37}\overrightharpoon{x_7} + ... + {W_3D}\overrightharpoon{x_D}$
3. 미분을 합니다.
   위 수식을 $\overrightharpoon{x_7}$으로 미분할 경우, \frac{\partial \overrightharpoon{y_3}}{\partial \overrightharpoon{x_7}} = ${W_37}$
4. 즉 미분결과는 W가 됨을 알 수 있습니다.

### 벡터를 행렬로 미분

벡터의 각 차원을 행렬을 순회하면서 미분값을 구해야 하므로 3중 for문을 도는것과 같이 자연스럽게 결과는 3차원 벡터라고 생각할 수 있습니다.

1. 스칼라 결과값을 갖는 수식을 작성합니다.
   y3 = x*W78 = x1*W13 + x2*W23 + ... + xD*WD3  
   즉, W78은 y3에 관여를 안하므로 0이 됩니다. 행렬 곱셈을 생각해봤을 때, y의 index와 W의 열 index가 같을경우에만 미분값이 존재한다는 것을 알 수 있습니다.
   그럼 y3을 Wi3으로 미분값을 구하면 y3 = x1*W13 + x2*W23 + .. + xD\*WD3이 되므로 xi가 됩니다.  
   즉 Fijk = dyi/dWjk = dyi/dWji = xj가 됨을 확인 할 수 있습니다. 즉 y차원별 하나의 열벡터만이 미분 값을 가지므로, 2차원으로 압축해서
   Gij = Fiji로 표현할 수 있습니다.

### 행렬을 행렬로 미분

입력이 배치인경우에  
 Y = X\*W로 표현이 가능합니다.

1. 스칼라 결과값을 갖는 수식을 작성합니다.
   Y13에 영향을 줄 수 있는 입력값은 X1k\*Wk3입니다.
2. 수식을 풀어서 적습니다.
   Y13 = X1k*Wk3 = X11*W13 + X12*W23 + .. X1M*WM3
3. Y의 row index는 X의 row index와 같고 column index는 W의 column index와 같으므로, dYij/dXik = Wkj 와 같습니다.
4. 3번 식을 general하게 풀어보면 Yi:를 i행이라고할 때, dYi:/dXi: = W라는 식을 얻을 수 있습니다.

### 합성함수의 미분

1. 합성함수의 경우 각 연산의 미분의 곱과 같습니다.
2. y = VWx라고 할 경우 VW = U를 이용하여 dy/dx = U를 쉽게 구할 수 있습니다.
3. 합성함수의 연쇄법칙으로 구해보면 Wx = m, y = Vm 처럼 중간 값 m을 이용하여 dy/dm \* dm/dx로 dy/dx를 구할 수 있습니다.
4. dy/dx를 스칼라값으로 수식을 단순하게 작성해보면 dyi/dm \* dm/dxj = dyi/dxj, 여기서 dxj(어떤 j라도)가 변할경우 m벡터 전체에 영향을 전파합니다.  
   mi = Wix1 + Wix2 + .. Wi+xn 이므로
5. 즉 모든 m의 차원에 대해서 미분 값을 더해야하기때문에 k=1~M dyi/dmk \* dmk/dxj 를 구해야합니다.
6. dyi/dmk = Vik이고 dmk/dxj = Wkj이기 때문에 k=1~M Vik \* Wkj 즉 VW=U가 미분값이 됩니다.

### Reference

1. [Derivatives](http://cs231n.stanford.edu/vecDerivs.pdf)
