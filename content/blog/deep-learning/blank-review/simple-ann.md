---
title: "[deeplearning]simple-ann"
date: "2020-02-18T16:49:26.007Z"
description: "deep-learning"
---

## Simple-ann  
이 내용은 [펭귄브로의 3분 딥러닝, 파이토치맛](http://www.hanbit.co.kr/store/books/look.php?p_code=B7193109877)의 3장 내용을 복습한 예제입니다.

### 문제  
1. 정답이 0과 1인 데이터 구분하기


```{.python}
import torch
import numpy as np
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
import torch.nn.functional as F
import os


# label이 0,1로 된 데이터를 구분하는 ann
# 1. 데이터 만들기
# 2. 학습하기
# 3. 가중치 업데이트


def make_datasets():
    train_x, train_y = make_blobs(80,centers=[[1,1],[-1,-1],[1,-1],[-1,1]], cluster_std=0.3)
    test_x , test_y = make_blobs(20, centers=[[1,1],[-1,-1],[1,-1],[-1,1]],cluster_std=0.3)
    train_y = label_change(train_y, [0, 1], 0)
    train_y = label_change(train_y, [2, 3], 1)
    test_y = label_change(test_y, [0, 1], 0)
    test_y = label_change(test_y, [2, 3], 1)
    return torch.from_numpy(train_x).type(torch.float32), \
           torch.from_numpy(train_y).type(torch.float32),\
           torch.from_numpy(test_x).type(torch.float32),\
           torch.from_numpy(test_y).type(torch.float32)

def label_change(labels, f,t):
    new_labels = labels.copy()
    for x in f:
        new_labels[labels == x] = t
    return new_labels

def show(x,y):
    plt.figure()
    for (xx,yy),label in zip(x,y):
        plt.plot(xx,yy,'ro' if label == 0 else 'r+')
    plt.show()
iter = 2000

class ANN(torch.nn.Module):
    def __init__(self, input_size, hidden_size):
        super(ANN,self).__init__()
        self.linear1 = torch.nn.Linear(input_size,hidden_size)
        self.relu = torch.nn.ReLU()
        self.linear2 = torch.nn.Linear(hidden_size,1)
        self.sigmoid = torch.nn.Sigmoid()
    def forward(self, x):
        x = self.linear1(x)
        x = self.relu(x)
        x = self.linear2(x)
        return self.sigmoid(x)
train_x , train_y, test_x, test_y = make_datasets()
ann = ANN(2,5)
iter = 2000
criterion = torch.nn.BCELoss()
learnin_rate = 0.03
optimizer = torch.optim.SGD(ann.parameters(), lr= learnin_rate)

if os.path.exists('ann.pt'):
    ann.load_state_dict(torch.load('ann.pt'))
    ann.eval()
    loss = criterion(ann(test_x).squeeze(), test_y)
    print(loss.item())
    exit()

for i in range(iter):
    ann.train()
    optimizer.zero_grad()
    pred_y = ann(train_x)
    loss = criterion(pred_y.squeeze(),train_y)
    loss.backward()
    optimizer.step()
    if i % 100 == 0:
        print('{}:{}'.format(i,loss.item()))

ann.eval()
loss = criterion(ann(test_x).squeeze(),test_y)
print(loss.item())

torch.save(ann.state_dict(), 'ann.pt')
print(ann.state_dict())



```