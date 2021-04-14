---
title: "[python]pip-mirror"
date: "2020-04-16T15:15:32.394Z"
description: "language"
---

## pip mirror

평소에 pip으로 install할때마다 속도가 느려서 답답했었는데 kakao mirror server를 이용하면 설치속도가 훨씬 빠르다는것을 알고 패키지를 다운받는 서버를 kakao로 변경

    > ~/.pip/pip.conf 작성
    [global]
    index-url=http://ftp.daumkakao.com/pypi/simple
    trusted-host=mirror.kakao.com

만약 기존의 cache로 인해서 hash 체크 문제가 생길경우

    pip install 시 --no-cache-dir 옵션 사용
