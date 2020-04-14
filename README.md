# Todo app
## Description

Todo List 생성, 수정, 조회, 삭제 어플리케이션

## Implementation of Core

- Validation Check

    요청 하는 데이터를 dto에 `class-validation`을 이용해 check.

    Validation pipe 를 global로 세팅 한 후 `class-transform` 패키지를 이용해 요청 값 validation 처리

- Dynamic query condition

    Query string에 따른 조회 조건을 동적으로 생성
    pagination 은 limit, offset 으로 처리

- Todo Dependency

    todo entity를 self-relation으로 tree 구조로 생성

    parent todo의 상태에 따라 하위 노드들인 children 의 상태 변경

- Soft Delete
    deleted_at column을 추가해 삭제 요청시 요청 시간을 기입

    삭제된 todo 레코드를 다시 update 요청하면 삭제 시간을 null 로 초기화


## Installation

- dependencies

```bash
$ npm install
```

- dotenv

```bash
# root directory
$ touch .development.env .production.env
```

.development.env
```bash
# development database env
# if it runs on docker container
#   TYPEORM_HOST = docker.for.mac.host.internal
TYPEORM_HOST = 
TYPEORM_PORT = 
TYPEORM_USERNAME = 
TYPEORM_PASSWORD = 
TYPEORM_DATABASE = 
```
**If it runs on docker container**


.production.env
```bash
# production database env
TYPEORM_HOST = 
TYPEORM_PORT = 
TYPEORM_USERNAME = 
TYPEORM_PASSWORD = 
TYPEORM_DATABASE = 
```

- migration


```bash
# 1. migration 파일 생성
$ npm run typeorm:migrate 'MigrationFileName'

# 2. migration 파일 실행
$ npm run typeorm:run 'MigrationFileName'
```

## Running the app

- local

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- docker

```bash
# docker build
$ docker build -t ${IMAGE_NAME} .
```

```bash
# docker run
$ docker run -dit -p 3000:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
```

- docker-compose

```bash
$ docker-compose up
```

## Support

yjy1129@kookmin.ac.kr
