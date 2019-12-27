



# # expo-notifications-api

![Preview-Screens](https://github.com/steniowagner/expo-notifications-api/blob/master/img/flow.png)

This is the back-end of the [expo-notifications-app](https://github.com/steniowagner/expo-notifications-app) and [expo-notifications-dashboard](https://github.com/steniowagner/expo-notifications-dashboard).

The main purpose of this API is:
- Records users with push-notifications tokens sent by  [expo-notifications-app](https://github.com/steniowagner/expo-notifications-app).
- Sends the registered users and receive the sending notifications orders from [expo-notifications-dashboard](https://github.com/steniowagner/expo-notifications-dashboard).
 - Forwards the notifications to the [expo-server-sdk](https://www.npmjs.com/package/expo-server-sdk) to then be delivered to the notifications providers.

> OBS: This API just delivers the notifications to the Expo servers using [expo-server-sdk](https://www.npmjs.com/package/expo-server-sdk) and handle the errors that may occurs alog the way. The responsability to deliver the notifications to the final users is the [FCM](https://firebase.google.com/docs/cloud-messaging) for Android and [APNs](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html#//apple_ref/doc/uid/TP40008194-CH8-SW1) for Apple, and is up to Expo the responsability to deliver the notifications to FCM and APNs, so, maybe you find some delay until your notifications been delivered to the users due some problem like overload on the provider's server or expo's servers (usually it's just a matter of wait a little bit 😛).

## About this Project

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!


Email-me: stenio.wagner1@gmail.com



Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)



Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!



It's free!

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment with NodeJS 8+ installed. To use the database, you'll need to have MongoDB installed and running on your machine at the default port (27017).

If you have Docker installed, there's a [docker-compose file](https://github.com/steniowagner/expo-notifications-api/blob/master/docker-compose.development.yml) with the setup for the database and server (which is the default setup for this project).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/steniowagner/expo-notifications-api

$ cd expo-notifications-api
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running the Development environment

If you want to run the server using Docker, you can setup the container using the following command:

```
$ docker-compose -f docker-compose.development.yml up
```

If you do prefer run the database and the app without Docker, do the following instead:

- Replace the ***database*** string for the address of the MongoDB running on your network on [.env.development](https://github.com/steniowagner/expo-notifications-api/blob/master/.env.development#L1) file.
- Make sure to inject the NODE_ENV=development variable, you can do this by editing the [dev script](https://github.com/steniowagner/expo-notifications-api/blob/master/package.json#L7) and adding this command in the front of the script:

```
"dev": "NODE_ENV=development nodemon src/app.ts",
```

With all dependencies installed and the environment properly configured, you can now run the server:

```
$ yarn dev
```

_or_

```
$ npm run dev
```

## Routes

> The base path for the API is /expo-notifications/api/v1

### Test Route

- **This is the route that you can use to check if the API is running properly.**

> http://localhost:4000/expo-notifications/api/v1

| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| / | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** `{ message:  "UHUL! The API is UP && RUNNING!" }`  |  **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ message:  <A Message with a description of the Error> }`|

### CRUD User
> - GET /users - Get all users
> - GET /users/:id - Get a single user
> - POST /users - Create an user (Need to provide the [User](#user) inside the body of the request)
> - PUT /users/:id - Update an user (Need to provide the [User](#user) fields to be updated inside the body of the request)
> - DELETE /users/:id - Delete a single user

### Send Notifications
| ENDPOINT | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /push-notifications | `POST`  | { `tokens: [string]`, `title: string`, `body: string`] } | - |**Code:** 200 - OK <br /> **Content:** [PushNotificationResponse](#pushnotificationresponse) |  **Code:** 500 - INTERNAL SERVER ERROR<br />*or*<br />**Code:** 400 - BAD REQUEST<br />**Content:** `{ message:  <A Message with a description of the Error> }`
<br />

### Entities

### PushNotificationResponse

> *usersNotRegistered*: Users that uninstalled the App from their devices and have been deleted from the database due that, so the app will not send notifications to them anymore.

> *shippingErrors*: Some errors that may happen along the way, you can find more about the errors [here](https://docs.expo.io/versions/latest/guides/push-notifications/#response-format) and the implementation of the error-handler for each error [here](https://github.com/steniowagner/expo-notifications-api/blob/master/src/controllers/push-notifications/getPushResultsFromExpo.ts) and [here](https://github.com/steniowagner/expo-notifications-api/blob/master/src/controllers/push-notifications/getPushResultsFromProviders.ts).

```json
{
  "usersNotRegistered": [{
    "user": "User"
  }],
  "shippingErrors": [{
    "reason": "string",
    "user": "User"
  }],
}
```

#### User

> *name*: User's name.

> *email*: User's email.

> *notificationToken*: User's notification push token provided by Expo.

```json
{
  "name": {
    "type": "string",
    "required": true,
  },
  "email": {
    "type": "string",
    "required": true,
  },
  "notificationToken": {
    "type": "string",
    "required": true,
  },
}
```

## Built With

- [NodeJS](https://nodejs.org/en/) - Build the server
- [Typescript](https://www.typescriptlang.org/) - Programming language used
- [body-Parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware
- [express](https://expressjs.com/) - Router of the Application
- [MongoDB](https://www.mongodb.com/) - Database
- [mongoose](https://mongoosejs.com/) - Object Modeling + DB Connector
- [nodemon](https://nodemon.io/) - Process Manager used in the development
- [dotenv](https://github.com/motdotla/dotenv) - Environment loader
- [eslint](https://eslint.org/) - JS Linter and code style
- [prettier](https://github.com/prettier/prettier) - Code formatter
- [husky](https://github.com/typicode/husky) - Git hooks
- [lint-staged](https://github.com/okonet/lint-staged) - Run linters on git staged files

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steniowagner/expo-notifications-api/blob/master/LICENSE) file for details.
