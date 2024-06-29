# NodeJS + Typescript

## Step By Step of project
### init package.json with:

```js
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