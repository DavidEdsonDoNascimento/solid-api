# SOLID API

create API RestFull contains solid principles, leveraging the use of relevant design patterns for good design, made in NodeJS + Typescript

## Application focus

Application for gym control

### Functional Requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate
- [ ] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged in user;
- [ ] It must be possible to obtain your check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;

### Business rules

- [x] The user must not be able to register with a duplicate email;
- [ ] The user cannot do 2 check-ins on the same day;
- [ ] The user cannot check in if they are not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

### Non-functional requirements

- [x] The user password must be encrypted;
- [x] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token)

#### step by step to build a project like this:
step-by-step.md

## setup to run the application on your machine:

#### Install dependencies
```js
yarn
```

### For the user to have access to the same environment that was mounted on my machine, simply execute the command below:
```ch
docker compose up -d
```
* -d 🠖 Detached mode i.e. run the container in the background

** P.S: to stop all container images that the application is running (if you want): 
```ch
docker compose stop
```

#### run migrations
```ch
yarn prisma migrate dev
```

#### run project
```ch
yarn dev
```

#### to view database data through the prisma
```ch
yarn prisma studio
```

#### run tests
```ch
yarn tests
```

##### To find out the test coverage area, run:
```ch
yarn run test:coverage
```
and open the index.html file found in /solid-api/coverage in the browser and navigate to the use case that wants to see test coverage with each run

#### for visual testing
```ch
yarn run test:ui
```