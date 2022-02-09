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
|-- components/     # contains page components
|-- controllers/    # contains use case controllers
|-- db/             # contains db interfaces and implementation
|-- models/         # contains business entities
|-- routes/         # remix routes directory
|-- styles/         # css styling
|-- util/           # general application utilities
    |-- session/    # session interfaces and implementation
```

## Interfaces and Implementations (current)

_Click on the file name headings below to view the source for more information._

### /app/auth.server/

The [`auth.server/`](app/auth.server/) directory, as the naming convention implies, contains exports intended to run on the server (i.e. in loader or action functions). The intent is to provide a generic means of authenticating a user and granting/preventing access to functionality and locations of the application. This directory contains the following files:

#### [`auth-types.ts`](app/auth.server/auth-types.ts)

This file exports `typeAuthUserType`, `type AuthSessionType`, and `interface AuthInterface<AuthUserType>`. The intent is to provide a generic way to work with the authentication mechanism. The benefit of defining an auth interface is that the application can utilize auth without having to know anything about the underlying implementation (e.g. file-based auth, database auth, Firebase auth, etc.). The [`index.ts`](app/auth.server/index.ts) file will export an `auth` object that is an implementation of `AuthInterface`. Currently, a specific implementation (e.g. FileAuth) is initialized in this file and assigned to `auth`. Switching the auth implementation (e.g. to FirebaseAuth) should have no effect on the rest of the application.

Two sample implementations are included in the project:

- `FileAuth: AuthInterface` - provides basic local file user authentication (see the included [`users.json`](app/auth.server/users.json) file) **for testing only**
- `FirebaseAuth: AuthInterface` - provides auth using Firebase Auth (running via emulators in development, see [Firebase Integration](#firebase-integration) below)

Each of these implementations requires an `AuthSessionType` object be passed to the constructor for session access.

#### [`auth-session.ts`](app/auth.server/auth-session.ts)

This file exports `authSession: AuthSessionType` for use in any `AuthInterface` implementation that requires standard access to the session for authentication purposes. Session management requires a `SESSION_SECRET` environment variable (see [Environment Variables](#environment-variables) below).

#### [`file-auth.ts`](app/auth.server/file-auth.ts)

This file exports a file-based implementation of `AuthInterface`. **It should only be used for testing purposes**.

#### [`firebase-auth.ts`](app/auth.server/firebase-auth.ts)

This file exports a Firebase implementation of `AuthInterface`. The Firebase implementation utilizes the [Firebase Admin Auth](https://firebase.google.com/docs/auth/admin) in all but the `signIn` methods, which requires use of the [Firebase Auth REST API](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password) (for now). See the [Firebase Integration](#firebase-integration) section below for Firebase configuration setup.

### /app/db/

WIP

### /app/util/session/

WIP

## Firebase Integration

The project also includes a basic Firebase Auth and Firebase Firestore implementation. In order to configure Firebase use in the project, you will have to create a Firebase project or already have one created. You must configure several environment variables for Firebase access (see [Environment Variables](#environment-variables) below).

To begin, initialize Firebase in the project directory:

```sh
$ npx firebase login
$ npx firebase init
```

The [`/app/firebase.ts`](app/firebase.ts) file contains the initialization of all Firebase objects, including the check for development vs. production mode. If you would not like to use the emulators in development, then make the necessary changes in [`/app/firebase.ts`](app/firebase.ts) (i.e. remove the development check and use the production initialization).

### Firebase Emulator Suite for Development

The [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) is used in development. Be sure to install the Auth and Firestore emulators during initialization; you can run the `npx firebase init` command again to install the emulators.

The project comes with a [`/firebase.json`](firebase.json) file already configured for the development emulators and firestore rules. There is also a [`.firebaserc`](.firebaserc) that includes an entry for the demo development project.

Run the `emulators` script to start the emulator suite:

```sh
$ npm run emulators
```

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
