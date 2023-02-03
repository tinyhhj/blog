# Chap 5: 워크로드 API

## 리소스 종류
* 파드
* 레플리케이션 컨트롤러
* 레플리카셋
* 디플로이먼트
* 데몬셋
* 스테이트풀셋
* 잡
* 크론잡

## 파드
* 파드 내 컨테이너는 같은 IP를 가진다. 파드별 IP할당
* 파드 내부 컨테이너는 네트워크 네임스페이스 공유
* 디자인 패턴
    - 사이드카 패턴: 메인 컨테이너 기능 추가
    - 앰배서더 패턴: 외부 시스템과 통신을 중계 (느슨한 결합)
    - 어댑터 패턴: 외부 접속을 위한 인터페이스 제공
* spec
    - command: dockerfile ENTRYPOINT
    - args : dockerfile CMD

## replicaset
* pod replica 수 관리
* k apply -f 외에 `k scale replicaset sample-rs --replicas 5` 사용 가능
* 제어는 집합성 조건 기준으로 동작

## deployment
* replica 관리
* 기존 replica와 신규 replica를 이용해 Rolling update 지원
* pod template 해시값을 기준으로 replicaset을 새로 생성, 기존으로 롤백한다
* deployment 변경 일시 중지
```bash
# 정지
k rollout pause deployment sample-deployment
# 해제
k rollout resume deployment sample-deployment
# 상태 조회
k rollout status deployment sample-deployment
```
* 업데이트 전략
    - recreate: 기존 Pod 삭제 후 신규 Pod 생성
        - 장점: 추가 리소스가 들지 않고 전환속도가 빠름
        - 단점: 다운타임 발생
    - rollingupdate: 신규 pod를 늘려가면서, 기존 Pod를 제거
        - 장점: 다운타임 발생하지 않음
        - 단점: 추가 리소스 사용 가능성, 전환속도가 느림 ( maxUnavailable, maxSurge를 통해 추가 리소스 사용량 조절 가능)

## 데몬 셋
* 각 노드에 하나의 Pod를 배치하는 리소스: 모든 노드에 반드시 동작해야 하는 프로세스를 위해 사용
* 업데이트 전략
    - ondelete: 업데이트가 바로 이뤄지지 않고( 다운타임 제거), 다음에 다시 생성될때, 혹은 수동으로 임의의 시점에(daemonset pod를 delete) 새 버전 생성
    - rollingupdate: maxUnavailable만 설정가능

## 스테이트풀 셋
* 레플리카 셋과 차이점
    - 생성되는 pod의 접미사는 숫자 인덱스
    - pod명 불변
    - 데이터를 영구적으로 저장하기 위한 구조
