# Todo app
## Description

Todo List 생성, 수정, 조회, 삭제 어플리케이션

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
TYPEORM_HOST = 
TYPEORM_PORT = 
TYPEORM_USERNAME = 
TYPEORM_PASSWORD = 
TYPEORM_DATABASE = 
```

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


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

yjy1129@kookmin.ac.kr
