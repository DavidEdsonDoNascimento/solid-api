# NodeJS + Typescript

## Step By Step of project
### init package.json with:

```ch
yarn init -y
```

### install and init typescript

```js
yarn add typescript @types/node tsx tsup -D  
yarn tsc --init
```
tsx for NodeJS to interpret typescript and tsup to compile typescript into javascript

### install fastfy 

```js
yarn add fastify
```

### then create the scripts in package.json

```json
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src --out-dir build",
    "start": "node build/server.js"
  }
  ```
* tsx watch to observe changes in typescript

* tsup src **--out-dir** build to compile everything from the src directory to the build directory

### save exact versions of dependencies

```js
  yarn config set save-prefix ""
```

### installs dependencies to work with environment variables and validations

```js
yarn add dotenv zod 
```

### install docker, created image through connection with bitnami/postgresql
```js
docker run --name solid-api-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=solidapi -p 5432:5432 bitnami/postgresql
```

#### docker connect image
```js
docker start solid-api-pg
```

#### docker stop connect
```js
docker stop solid-api-pg 
```

#### docker images list
```js
docker ps -a
```

#### docker images list
```js
docker ps -a
```

#### if you want to delete the image
```js
docker rm solid-api-pg 
```

#### if you want to follow the docker image logs
```js
docker logs -f solid-api-pg 
```

### create first migration 🠖 create users
```js
yarn prisma migrate dev
```

### to view database data through the prisma
```js
yarn prisma studio
```

