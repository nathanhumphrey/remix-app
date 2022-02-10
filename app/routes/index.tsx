import { useRef } from 'react';
import { json, Form, useActionData, useLoaderData, Link } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';
import { auth } from '~/auth.server';

export let meta = () => {
  return {
    title: 'Home Page',
  };
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();

    // TODO: implement proper form validation
    const email: any = form.get('email');
    const password: any = form.get('password');

    // TODO: form validation
    if (!email || email.trim() === '') {
      return json(
        {
          errorCode: 'signup/invalid-email',
          errorMessage: 'Email field cannot be empty',
        },
        { status: 400 }
      );
    }

    if (!password || password.trim() === '') {
      return json(
        {
          errorCode: 'signup/invalid-password',
          errorMessage: 'Password field cannot be empty',
        },
        { status: 400 }
      );
    }

    // TODO: CSRF check
    return auth.login({ username: email, password });
  } catch (error) {
    return json(
      {
        errorCode: 'login/general',
        errorMessage: 'There was a problem logging in',
      },
      { status: 500 }
    );
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  return await auth.user(request);
};

export default function Index() {
  const actionError = useActionData();
  const user = useLoaderData();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="remix__page">
      <main>
        <h2>Home Page</h2>
        <p>Everyone can view the home page.</p>
        {(user && (
          <>
            <p>
              Hello {user.name}, you can now view the <Link to="/protected">protected page.</Link>
            </p>
            <Form method="post" action="/logout">
              <button>Logout</button>
            </Form>
          </>
        )) || (
          <section>
            <Form className="remix__form" method="post">
              <h3>Login Form</h3>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" ref={emailRef} />
              <br />
              <label htmlFor="email">Password:</label>
              <input type="password" id="password" name="password" ref={passwordRef} />
              <br />
              <button type="submit">Login</button>
              {actionError?.errorCode && (
                <p>
                  <em>Login failed: {actionError.errorMessage}</em>
                </p>
              )}
            </Form>
          </section>
        )}
      </main>
    </div>
  );
}
