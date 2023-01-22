# chapter 4: API 리소스와 kubectl

* 쿠버네티스 구성
    * 마스터 노드: api, 컨테이너 스케쥴링, 스케일링
    * 워커 노드: 컨네티너 동작 노드
* 리소스
    - 워크로드 api : 컨테이너 실행 관련
    - 서비스 api : 컨테이너를 외부에 공개하는 엔드포인트 제공 리소스
    - 컨피그 & 스토리지 api: 설정, 볼륨 관련 리소스
    - 클러스터 api : 보안, 쿼터 관련 리소스
    - 메타데이터 api : 클러스터 내부의 다른 리소스 관리하기 위한 리소스
* 클러스터 네임스페이스
    - 가상으로 클러스터를 분리할 수 있다.
    - RBAC(role based access control)과 함께 클러스터 분리를 정밀하게 할 수 있다.
    - 분리 단위는 팀마다 분리하는걸 추천하고, 개발환경은 클러스터로 분리하는걸 권장 (동일한 설정파일을 재사용하기 용이하므로)
* 클러스터 cli
    * 인증정보와 컨텍스트
        - cluster: 접속 클러스터
        - users: 인증 정보
        - context: 접속 정보 (cluster, 인증정보, 네임스페이스 정보)
    * 동작
        - create : 생성
            - metadata.generateName : pod명을 prefix를 이용해서 랜덤하게 생성해준다. 
        - delete : 삭제
        - apply: 업데이트
            - 리소스 생성시 이전 매니페스트, 현재 리소스 상태, 적용 매니페스트를 통해 변경 사항을 처리하므로, apply를 사용 권장
            - server-side apply: 동시 필드 수정 감지
    * 매니페스트 통합
        - 리소스의 결합을 높이기 위해서 하나의 매니페스트에 여러 리소스 기술 가능
        - config & secret은 공통적으로 쓰이기 때문에, 별도의 매니페스트 파일로 작성 권장
* 어노테이션 레이블
    * 어노테이션: 시스템 구성요소가 사용하는 메타데이터
        - 시스템 구성요소를 위한 데이터
        - 모든 환경에서 사용할 수 없는 설정 (gke/aks/eks)
        - 새로운 기능 테스트
    * 레이블: 리소스 관리에 사용하는 메타데이터
        * 권장 레이블 키 이름
            - app/kubernetes.io/name,version,component .. 
    * 구성: [접두사]/키:값
```
# annotation  추가
k annotate pod sample-deployment-764b8cdfd4-kkzwh test-anno=test (--overwrite)
# annotation 조회
k get pod sample-deployment-764b8cdfd4-kkzwh -o json | jq .metadata.annotations

# label 추가
k label deployments.apps sample-deployment label=label (--overwrite)
# label 조회
k get deployments.apps sample-deployment -o json | jq .metadata.labels
# label 제거
k label deployments.apps sample-deployment label-

# label 필터검색
k get deployments.apps -l label
k get deployments.apps -l label=label
k get deployments.apps -l label=label,label2

# label 같이 목록에 표시
k get deployments.apps -L label,label2

# -l, -L 함께 사용
k get deployments.apps -l label -L label,label2

# --show-labels
k get deployments.apps sample-deployment --show-labels

# set image
k set image pod sample-deployment-764b8cdfd4-tnpjx nginx-container=nginx:1.15

# diff 리소스 상태와 매니페스트 비교 
# 리턴 1: 차이 있음
# 리턴 0: 차이없음
k diff -f sample-pod.yaml

# 상태코드
echo $?

# 사용 가능한 리소스 종류 목록
k api-resources [--namespaced=true]

# get
## get yaml
k get pod -o yaml
## 필터링
k get pod -o yaml sample-pod

## json path 
k get pod sample-pod -o jsonpath={.metadata.name}

## 배열데이터 필터 ?(@.${fieldname})
k get pod sample-pod -o jsonpath="{.spec.containers[?(@.name == 'nginx-container')].image}"

## go template
k get pod -o go-template="{{range .items}}{{.metadata.name}}:{{range .spec.containers}}{{.image}}{{end}} {{end}}"

## node 정보 
k get node

## 전체 리소스 목록 조회
k get all

## config/ secret같이 조회되지 않는 리소스도 함께 조회
k get $(k api-resources --namespaced=true --verbs=list -o name |tr '\n' ',' | sed -e 's|,$||g')

## 리소스 상태 추적
k get pod --watch [--output-watch-events]

# 정보 자세히 보기
k describe pod sample-pod

# 리소스 확인(추가 구성요소 metrics-server 설치 필요)
k top node

# 컨네이너 명령어 실행
k exec -it sample-pod -- /bin/ls

## 컨테이너 지정
k exec -it smaple-pod -c nginx-container -- /bin/ls

## 파이프 등 특정 문자가 포함된 경우 /bin/bash에 인수 전달 형태
k exec -it sample-pod -- /bin/bash -c "ls --all --classify | grep lib"

# debug : 디버깅 툴이 설치되있지 않은 이미지를 위해서, 임시로 파드 내 디버깅 컨테이너를 띄워 디버깅
k debug sample-pod --image=amsy810/tools:v2.0 --container debug-container
k exec -it sample-pod -c debug-container -- /bin/bash

# port-forward
k port-forward sample-pod 8888:80

# Deployment 나 service에 연결된 pod일 경우, 포트 포워드 시 선택된 동일한 pod에만 전송
k port-forward deployment/sample-deployment 8888:80
k port-forward service/sample-service 8888:80

# 로그 ( 표준출력, 표준 에러 출력)
k logs sample-pod

## 하나의 컨테이너만 로그 출력
k logs sample-pod -c nginx-container

## 최근 1시간이내 10건의 로그 타임스탬프
k logs --since=1h --tail=10 --timestamps=true sample-pod

## 레이블을 가진 pod 로그
k logs --selector app=sample-app

## `stern`을 이용해 로그를 더 자세히 확인 가능

# cp 컨테이너 호스트간 파일 복사

## 컨테이너 -> 호스트
k cp sample-pod:etc/hostname ./hostname

## 호스트 -> 컨테이너
k cp hostname sample-pod:/tmp/newfile

## 복사 확인
k exec -it sample-pod -- cat /tmp/newfile

# 플러그인 목록
k plugin list 

# kubectl 디버깅 
k -v=6 get pod
k -v=8 apply -f sample-pod.yaml

# kube-ps1: 클러스터와 네임스페이스 터미널에 표시
brew update
brew install kube-ps1

# pod가 정상적인 상황이 아닐경우 임시로 entrypoint를 override해 디버깅
# nginx 이미지로 웹서버가 아닌 셀 기동
k run --image=nginx:1.16 --restart=Never --rm -it sample-debug --command -- /bin/sh
```


    
        