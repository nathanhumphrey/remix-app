# Multitier Development with Remix (v0.0.1)

This project contains the structure for building an application on (what I'm calling) the Remix platform. The plan is for this project to provide a _slightly_ biased "convention over configuration" setup for a Remix project (you will still be free to implement most of the application how you'd like). In other words, this project is an itch for me to scratch. Feel free to take/modify/use it however you like.

The two main requirements I'm aiming to meet are:

1. provide an application directory structure to support multitier development
1. define interfaces for easier plug-n-play integration

Initialize the project via npm:

```sh
$ npm i
```

## Directory Structure

The directory structure has been arranged in the following way:

```sh
app/
|-- auth.server/    # contains auth interfaces and implementation
|-- components/     # contains page components (empty)
|-- controllers/    # contains use case controllers and db interfaces
|-- db/             # contains db implementation
|-- models/         # contains business entities
|-- routes/         # remix routes directory
|-- sessions/       # location for writing file-based sessions (empty)
|-- styles/         # css styling
|-- util/           # general application utilities
|   |-- session/    # session interfaces and implementation
|-- firebase.ts     # firebase initialization file
```

## Interfaces and Implementations (current)

_Click on the file name headings below to view the source for more information._

### /app/auth.server/

The [`auth.server/`](app/auth.server/) directory, as the naming convention implies, contains exports intended to run on the server (i.e. in loader or action functions). The intent is to provide a generic means of authenticating a user and granting/preventing access to functionality and locations of the application. This directory contains the following files:

#### [`auth-types.ts`](app/auth.server/auth-types.ts)

This file exports `type AuthUserType`, `type AuthSessionType`, and `interface AuthInterface<AuthUserType>`. The intent is to provide a generic way to work with the authentication mechanism. The benefit of defining an auth interface is that the application can utilize auth without having to know anything about the underlying implementation (e.g. file-based auth, database auth, Firebase auth, etc.). The [`index.ts`](app/auth.server/index.ts) file will export an `auth` object that is an implementation of `AuthInterface`. Currently, a specific implementation (e.g. FileAuth) is initialized in this file and assigned to `auth`. Switching the auth implementation (e.g. to FirebaseAuth) should have no effect on the rest of the application.

Two sample implementations are included in the project:

- `FileAuth: AuthInterface` - provides basic local file user authentication (see the included [`users.json`](app/auth.server/users.json) file) **for testing only**
- `FirebaseAuth: AuthInterface` - provides auth using Firebase Auth (running via emulators in development, see [Firebase Integration](#firebase-integration) below)

Each of these implementations requires an `AuthSessionType` object be passed to the constructor for session access.

#### [`auth-session.ts`](app/auth.server/auth-session.ts)

This file exports `authSession: AuthSessionType` for use in any `AuthInterface` implementation that requires standard access to the session for authentication purposes. Session management requires a `SESSION_SECRET` environment variable (see [Environment Variables](#environment-variables) below).

#### [`file-auth.ts`](app/auth.server/file-auth.ts)

This file exports `FileAuth: AuthInterface`. **It should only be used for testing purposes**.

#### [`firebase-auth.ts`](app/auth.server/firebase-auth.ts)

This file exports a `FirebaseAuth: AuthInterface`. The Firebase implementation utilizes the [Firebase Admin Auth](https://firebase.google.com/docs/auth/admin) in all but the `signIn` methods, which requires use of the [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password) (for now). See the [Firebase Integration](#firebase-integration) section below for Firebase configuration setup.

#### [`index.ts`](app/auth.server/index.ts)

This file exports `auth: AuthInterface` for use in the application.

### /app/controllers/

The controller implementation is left to the developer. There are many different methodologies that can impact the development of controllers, and this project doesn't seek to limit them. The pattern that is followed in this starter package is to define the DBInterface for controllers in this directory. The reasoning behind this decision is to allow for development of the use case controllers to happen without accounting for the database implementation -- in other words, the database shouldn't impact how the controllers are developed. Implement the classes and interfaces that work best for your setup.

#### [`controller-types.ts`](app/controllers/controller-types.ts)

This file exports `abstract class DBRecord<Model>`, `interface DBInterface`, and `abstract class AbstractController<Model>`. These types are provided as examples only; you should feel free to scrap them and provide your own implementation.

#### [`users.ts`](app/controllers/users.ts)

This file exports `Users: AbstractController<User>`, which is an example implementation of a controller. Feel to free to use/update/remove as you see fit.

#### [`index.ts`](app/controllers/index.ts)

This file exports `DBInterface` and any controller implementations (e.g. `users: Users` in the starter) for use in the application.

### /app/db/

Database implementation resides in this directory. In keeping with the explanation above regarding controllers, any exported database implementation should implement the database interface exported from `/app/controllers`. In this way, you could develop several implementations (e.g. PostgreSQL, MySQL, Firestore, etc.) and the higher application wouldn't have to be updated to accommodate (lofty goals, I know).

#### [`firestore-db.ts`](app/db/firestore-db.ts)

This file exports `FirestoreDB: DBInterface`, an example Firestore database. Configuration for the underlying database connection is done in [`/app/firebase.ts`](app/firebase.ts).

#### [`index.ts`](app/db/index.ts)

This file exports `db:DBInterface` for use in the application.

### /app/models/

Business entities for the application should reside in this directory.

#### [`user.ts`](app/models/user.ts)

This file exports `User`, an example model for use in the starter. Feel to free to use/update/remove as you see fit.

#### [`index.ts`](app/db/index.ts)

This file exports any model implementations (e.g. `User` in the starter) for use in the application.

### /app/util/

This component provides general application utilities.

#### [`error-types.ts`](app/util/error-types.ts)

This file provides application-specific error types, currently an `AppError` with three properties: `status: string`, `errorCode: string`, and `errorMessage: string`. You can see an example of it in use in the [`app/routes/index.tsx`](app/routes/index.tsx) file.

#### [`index.ts`](app/util/index.ts)

This file exports any general utility types, classes, or functions for use in the application.

### /app/util/session/

This component provides the necessary session management object for the application. Two implementations are provided: cookie and file.

#### [`cookie-session.server.ts`](app/util/session/cookie-session.server.ts)

Exports a cookie-base session implementation.

#### [`file-session.server.ts`](app/util/session/file-session.server.ts)

Exports a file-base session implementation.

#### [`index.ts`](app/util/session/index.ts)

This file imports the desired implementation (e.g. cookie, file, etc.) and exports the default Remix cookie functions (`{ getSession, commitSession, destroySession }`) for use in the application.

## Firebase Integration

The project also includes a basic Firebase Auth and Firebase Firestore implementation. In order to configure Firebase use in the project, you will have to create a Firebase project or already have one created. You must configure several environment variables for Firebase access (see [Environment Variables](#environment-variables) below).

To begin, initialize Firebase in the project directory:

```sh
$ npx firebase login
$ npx firebase init
```

The [`/app/firebase.ts`](app/firebase.ts) file contains the initialization of all Firebase objects, including the check for development vs. production mode. If you would not like to use the emulators in development, then unset any EMULATOR_HOST environment variables, and make the necessary changes in [`/app/firebase.ts`](app/firebase.ts) (i.e. remove the development check and use the production initialization) or configure the dev server to run with NODE_ENV=production.

### Firebase Emulator Suite for Development

The [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) is used in development. Be sure to install the Auth and Firestore emulators during initialization; you can run the `npx firebase init` command again to install the emulators.

The project comes with a [`/firebase.json`](firebase.json) file already configured for the development emulators and firestore rules. There is also a [`.firebaserc`](.firebaserc) that includes an entry for the demo development project.

Run the `emulators` script to start the emulator suite:

```sh
$ npm run emulators
```

The emulators script will create a single test user in Firebase Auth:

```
Username: admin@example.com
Password: 123123
```

You can also use the `emulators:export` script to dump the current emulator suite data into `/firebase-data/`. Be aware that this is the location that the original data is loaded from, so overwriting it will mean that the new data is what will be loaded when running the `emulators` script in the future. Perhaps backup the original directory before exporting.

You can access the emulator UI in your browser at [http://localhost:4000/](http://localhost:4000/).

## Environment Variables

The [`/env.sh.example`](env.sh.example) file contains the required environment variables for the project:

```sh
# Session key
export SESSION_SECRET="SECRET_VALUE"

# Required for Firebase REST API sign-in
# Add this env variable to your deployment dashboard/server
export FIREBASE_WEB_API_KEY="YOUR_FIREBASE_API_KEY"

# Required for local production testing. Include your service account
# file contents as a JSON string for the env variable below.
# Add this env variable to your deployment dashboard/server
export FIREBASE_SERVICE_ACCOUNT_KEY='JSON_SERVICE_ACCOUNT_STRING'

# Firebase Emulator Connection Vars
export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
export FIRESTORE_EMULATOR_HOST="localhost:8080"

```

To make use of the file, make a copy or rename the file to `env.sh`, update the values of the environment variables as required, and run the following in your terminal to export the variables:

```sh
$ . .env.sh
```

You should now be able to run the application in development or deploy to Vercel for production.

---

## Original Remix README

- [Remix Docs](https://remix.run/docs)

### Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

### Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
