import { useState, useRef } from 'react';
import { Form, redirect, useActionData, useSubmit } from 'remix';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
} from 'firebase/auth';
import { firebaseConfig } from '~/firebase.config';
import { getUserSession, createUserSession } from '~/util/session.server';

export const action = async ({ request }) => {
  try {
    // Expect ID token and display name
    const body = await request.formData();

    const idToken = body.get('idToken');
    const displayName = body.get('displayName');

    // TODO: CSRF check

    return createUserSession({ idToken, displayName }, '/secrets');
  } catch (error) {
    return json(
      {
        errorCode: 'login/general',
        errorMessage: 'There was a problem loggin in',
      },
      { status: 500 }
    );
  }
};

export const loader = async ({ request }) => {
  const session = await getUserSession(request);
  return (await session.get('displayName')) ? redirect('/secrets') : null;
};

export default function Index() {
  const actionError = useActionData();
  const [error, setError] = useState(null);
  const submit = useSubmit();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async (evt) => {
    // never submit this initial submit, need to inject idToken and displayName
    evt.preventDefault();
    try {
      initializeApp(firebaseConfig);
      const auth = getAuth();

      // TODO: add an env check for USE_EMULATOR
      // https://remix.run/docs/en/v1.0.6/guides/envvars#browser-environment-variables
      if (!auth.emulatorConfig) {
        connectAuthEmulator(auth, 'http://localhost:9099');
      }

      // sign in
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const idToken = await user.getIdToken();

      // signout client
      await signOut(auth);

      // append the idToken and displayName to the posted form
      const inputToken = document.createElement('input');
      inputToken.setAttribute('type', 'hidden');
      inputToken.setAttribute('name', 'idToken');
      inputToken.setAttribute('value', idToken);
      evt.target.append(inputToken);

      const inputDisplayName = document.createElement('input');
      inputDisplayName.setAttribute('type', 'hidden');
      inputDisplayName.setAttribute('name', 'displayName');
      inputDisplayName.setAttribute('value', user.displayName);
      evt.target.append(inputDisplayName);

      submit(evt.target);
    } catch (error) {
      // prepare the errors for display
      const errors = {};
      errors.errorCode = error.code;
      errors.errorMessage = error.message;
      setError(errors);
    }
  };

  return (
    <div className="remix__page">
      <main>
        <h2>Remix Secrets</h2>
        <p>Save all your secret stuff here!</p>
      </main>
      <section>
        <Form method="post" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" ref={emailRef} />
          <br />
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
          />
          <br />
          <button type="submit">Login</button>
          {error?.errorCode && (
            <p>
              <em>Login failed: {error.errorMessage}</em>
            </p>
          )}
          {actionError?.errorCode && (
            <p>
              <em>Login failed: {actionError.errorMessage}</em>
            </p>
          )}
        </Form>
      </section>
    </div>
  );
}
