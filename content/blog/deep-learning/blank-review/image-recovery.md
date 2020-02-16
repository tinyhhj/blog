---
title: "[deeplearning]image-recovery"
date: "2020-02-16T15:29:48.309Z"
description: "deep-learning"
---

## Image-recovery  
이 내용은 [펭귄브로의 3분 딥러닝, 파이토치맛](http://www.hanbit.co.kr/store/books/look.php?p_code=B7193109877)의 3장 내용을 복습한 예제입니다.

### 문제  
weired_function을 통해 나온 손상된 이미지를 원래대로 복구할 수 있는 방법?
1. 일반적 접근
    1. weired_function 원리 이해
    2. weired_function를 복구할 수 있는 함수 작성
    3. 이미지 복구
2. 머신러닝 접근
    1. 손상된 이미지와 같은 사이즈의 랜덤 이미지를 weired_function에 입력
    2. 1.의 출력된 결과와 손상된 이미지 차이 비교 
    3. 손상된 이미지와 같게끔 랜덤 이미지 입력값 조정 
    4. 최종적으로 손상된 이미지가 나온 랜덤 이미지를 찾았다면 이미지 복구


```{.python}
import torch
import pickle
import matplotlib.pyplot as plt

def weird_function(x, n_iter=5):
    h = x
    filt = torch.tensor([-1./3, 1./3, -1./3])
    for ii in range(n_iter):
        zero_tensor = torch.tensor([1.0*0])
        h_l = torch.cat( (zero_tensor, h[:-1]), 0)
        h_r = torch.cat((h[1:], zero_tensor), 0 )
        h = filt[0] * h + filt[2] * h_l + filt[1] * h_r
        if ii % 2 == 0:
            h = torch.cat( (h[h.shape[0]//2:],h[:h.shape[0]//2]), 0  )
    return h

# image load
broken_image = torch.FloatTensor(pickle.load(open('./broken_image_t.p','rb'),encoding='latin1'))
# image show
plt.imshow(broken_image.view(100,-1))
plt.show()

random_image = torch.randn(10000,requires_grad=True)
learning_rate = 0.8
print('learning rate: {}'.format(learning_rate))
for i in range(20000):
    # auto grad를 아직 잘 이해못한듯..

    random_image.requires_grad_(True)
    # process weired
    result_image = weird_function(random_image)
    # calc loss
    loss = torch.dist(result_image,broken_image,2)
    loss.backward()
    # rearrange random image
    with torch.no_grad():
        random_image = random_image - learning_rate * random_image.grad

    if(i % 1000 == 0):
        print('loss: {}'.format(loss))
plt.imshow(random_image.view(100,-1))
plt.show()
```
