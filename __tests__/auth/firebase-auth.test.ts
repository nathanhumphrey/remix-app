import { installGlobals } from '@remix-run/node';
import { FirebaseAuth } from '../../app/auth.server/firebase-auth';
import type { AuthSession } from '../../app/auth.server/auth-types';

const testUserCredentials = {
  username: 'test@example.com',
  password: 'test123',
};

const sessionMock: AuthSession = {
  getAuthSession: function (): Promise<any> {
    return Promise.resolve('getAuthSession');
  },

  createAuthSession: function (data): any {
    return {
      status: 200,
      json: () =>
        Promise.resolve({
          status: 'success',
          data,
        }),
    };
  },

  destroyAuthSession: function (): Promise<any> {
    return Promise.resolve('destroyAuthSession');
  },
};

let auth: FirebaseAuth;

beforeAll(() => {
  auth = new FirebaseAuth(sessionMock);
  return Promise.all([clearEmulatorAccounts(), createEmulatorAccount()]);
});

afterAll(async () => {
  auth = new FirebaseAuth(sessionMock);
  return await clearEmulatorAccounts();
});

describe('FirebaseAuth', () => {
  it('can create an account', async () => {
    const newUser = {
      username: 'new@example.com',
      password: 'new123',
    };

    let res = await auth.createAccount(newUser);
    let data = await res.json();

    // check the api
    expect(res.status).toEqual(201);
    expect(data.status).toEqual('success');
    // TODO: could expand the following to check for expected props
    expect(data.user).not.toBe(undefined);

    // check against the emulator
    expect(await isEmailRegistered(data.user.email)).toEqual(true);
  });

  it('performs login', async () => {
    // login user

    type UType = {
      idToken: string;
      user: any;
    };

    let res = await auth.login(testUserCredentials);
    let data = (await res.json()).data as UType;

    // TODO: think about how I'm checking for success here ...

    expect(res.status).toEqual(200);
    expect(data.idToken).not.toBeUndefined();
    expect(data.user).not.toBeUndefined();

    // TODO: spy on session mock createAuthSession for called with
  });

  it('performs logout', () => {
    expect(true).toEqual(false);
  });

  it('checks for required user', () => {
    expect(true).toEqual(false);
  });

  it('returns current the user', () => {
    expect(true).toEqual(false);
  });
});

installGlobals();

function clearEmulatorAccounts(): Promise<Response> {
  return fetch('http://localhost:9099/emulator/v1/projects/demo-remix-app/accounts', {
    method: 'delete',
  });
}

function createEmulatorAccount(): Promise<Response> {
  return fetch(
    `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=123`,

    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUserCredentials.username,
        password: testUserCredentials.password,
        returnSecureToken: true,
      }),
    }
  );
}

async function isEmailRegistered(email: string): Promise<boolean> {
  let res = await fetch(
    `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=123`,

    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        continueUri: 'http://localhost:9099/dummy-uri',
      }),
    }
  );
  return (await res.json()).registered;
}
