## Base nestjs from Loc handsome

## Installation

```bash
$ npm install

# if U using docker
$ docker-compose up -d
```

## CLI
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# before using migration pls check file ormconfig.json is correct.
# generator migration (maybe only support for MySql, im still not checking for another DB.) (pls exec to container to run this comment if u using docker)
$ npm run typeorm migration:generate -- -n firstMigration

# run migration
$ npm run typeorm migration:run

# in situation if env is development sync => true else false for production
```
## nest generate
see in https://docs.nestjs.com/cli/usages#nest-generate

```bash
$ nest g <schematic> <name> [options]
# example nest g module catModule
```
## if https
im using mkcert,
```bash
brew install mkcert
brew install nss # if you use Firefox
mkcert -install  # pls setup before build docker-compose
mkcert localhost
```
you can get CA from directory ${mkcert -CAROOT} to add CA for test Webrtc
## if http
pls edit your nginx.conf