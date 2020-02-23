---
title: "[deeplearning]simple-classifier"
date: "2020-02-23T17:38:22.921Z"
description: "deep-learning"
---

## Simple-classifier    

### 문제  
1. fashion mnist 구분하기

```{.python}
import torch
import torchvision
import matplotlib.pyplot as plt
import numpy as np
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torchvision import transforms, datasets
import math


train = datasets.FashionMNIST('fashion_mnist',transform=transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.5,),(0.5,))
]),train=True,download=True)
train2 = datasets.FashionMNIST('fashion_mnist',transform=transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,),(0.5,))
]),train=True)
test = datasets.FashionMNIST('fashion_mnist', transform=transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,),(0.5,))
]), train=False, download=True)

bs = 64
train_loader = torch.utils.data.DataLoader(train,
                            batch_size=bs,
                            )
train2_loader = torch.utils.data.DataLoader(train2,batch_size=bs)

test_loader = torch.utils.data.DataLoader(test, batch_size=bs, shuffle = True)

dataiter = iter(train_loader)
images, labels = next(dataiter)

dataiter2 = iter(train2_loader)
images2, _ = next(dataiter2)
images2 = torch.cat([images2,images2,images2],1)

img = torchvision.utils.make_grid(images, padding = 0)
row = []
for r in range(0,len(images2),8):
    row.append(torch.cat([*images2[r:r+8]],2))
img2 = torch.cat(row,1)


npimg = img.numpy()
npimg2 = img2.numpy()
print(npimg.shape, npimg2.shape)
plt.figure(figsize=(10,7))
plt.imshow(np.transpose(npimg,(1,2,0)))
plt.figure(2,figsize=(10,7))
plt.imshow(np.transpose(npimg2,(1,2,0)))
# plt.show()

# exit()

class Net(nn.Module):
    def __init__(self,dropout_p = 0.2):
        super(Net,self).__init__()
        self.net = nn.Sequential(
            nn.Linear(28*28, 256),
            nn.ReLU(),
            nn.Dropout(dropout_p),
            nn.Linear(256,128),
            nn.ReLU(),
            nn.Dropout(dropout_p),
            nn.Linear(128,10)
        )

    def forward(self, images):
        images = images.view(-1,784)
        return self.net(images)

device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

epochs = 50
size = 64

net = Net().to(device)
optimizer = optim.SGD(net.parameters(), lr=0.01)

def train(model, loader, optimizer):
    model.train()
    for i, (images, labels) in enumerate(loader):
        data , target = images.to(device), labels.to(device)
        optimizer.zero_grad()

        pred = model(data)

        loss = F.cross_entropy(pred, target)
        loss.backward()
        optimizer.step()

def evaluate(model, loader):
    model.eval()
    test_loss = 0
    correct = 0

    with torch.no_grad():
        for data, target in loader:
            data, target = data.to(device), target.to(device)
            pred = model(data)
            # print('input:{},output:{}'.format(data.size(), pred.size()))
            loss = F.cross_entropy(pred, target,reduction='sum').item()
            test_loss += loss
            pred = pred.max(1,keepdim=True)[1]

            correct += pred.eq(target.view_as(pred)).sum().item()
            # print('pred:{},target:{}'.format(pred.size(),target.view_as(pred).size()))
        test_loss /= len(loader.dataset)
        test_accuracy = 100. * correct / len(loader.dataset)
        return test_loss, test_accuracy


for e in range(epochs):
    train(net,train_loader,optimizer)
    test_loss, test_accuracy = evaluate(net, test_loader)
    print('test loss:{} , test_accuracy:{}'.format(test_loss, test_accuracy))

```

### reference
* [펭귄브로의 3분 딥러닝, 파이토치맛](http://www.hanbit.co.kr/store/books/look.php?p_code=B7193109877)