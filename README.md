# SOLID API

create API RestFull contains solid principles, leveraging the use of relevant design patterns for good design, made in NodeJS + Typescript

## Application focus

Application for gym control

### Functional Requirements

- [ ] It must be possible to register;
- [ ] It must be possible to authenticate
- [ ] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged in user;
- [ ] It must be possible to obtain your check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;

### Business rules

- [ ] The user must not be able to register with a duplicate email;
- [ ] The user cannot do 2 check-ins on the same day;
- [ ] The user cannot check in if they are not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after it is created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

### Non-functional requirements

- [ ] The user password must be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token)

#### step by step to build a project like this:
step-by-step.md
