---
title: "[linux]ssh-rsa"
date: "2020-03-24T15:02:18.023Z"
description: "linux"
---

## ssh rsa키로 로그인하기

1. ssh-keygen -t rsa 로 rsa키 생성
2. 세이브 위치로 가서(디폴트: ~/.ssh) id_rsa.pub 내용 복사
3. 리모트 서버에 접속 후, .ssh/authorized_keys에 등록
    echo '{id_rsa.pub내용}' >> .ssh/authorized_keys 
