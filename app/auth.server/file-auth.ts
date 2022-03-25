import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { json, redirect } from 'remix';
import { AppError } from '~/util';
import type { Auth, AuthSession, AuthUser } from './auth-types';

// location of users.json file relative to build path NOT app
const usersFile = path.join(__dirname, '../../app/auth.server/users.json');

/**
 * DO NOT USE THIS IMPLEMENTATION IN PRODUCTION.
 * USES SEVERAL INSECURE IMPLEMENTATIONS (E.G. PLAIN TEXT PASSWORDS,
 * NO AUTH SESSION VERIFICATION, ETC.).
 * FOR TESTING PURPOSES ONLY.
 */
export class FileAuth implements Auth<AuthUser> {
  private users: AuthUser[];

  constructor(private session: AuthSession) {
    let rawdata = readFileSync(usersFile);
    let users = JSON.parse(rawdata.toString());
    this.users = users;
  }

  async createAccount(user: AuthUser, redirectTo: string): Promise<Response> {
    if (!this.exists(user)) {
      user.id = UUID.generate();
      this.users.push(user);
      writeFileSync(usersFile, JSON.stringify(this.users));
      if (redirectTo) {
        return redirect(redirectTo);
      } else {
        return json(
          { status: 'success' },
          {
            status: 201,
          }
        );
      }
    } else {
      return json(
        {
          status: 'error',
          errorCode: 'auth/signUp',
          errorMessage: `User with username: ${user.username} already exists`,
        },
        {
          status: 409,
        }
      );
    }
  }

  async login(user: AuthUser): Promise<Response> {
    if (this.exists(user)) {
      let match: AuthUser | undefined = this.users.find((u) => user.username === u.username);

      if (match && match.password === user.password) {
        // stuff any required info into the user session
        return this.session.createAuthSession({ id: match.id });
      }
    }
    return json(
      {
        status: 'error',
        errorCode: 'auth/login',
        errorMessage: `Invalid username or password`,
      },
      {
        status: 422,
      }
    );
  }

  exists(user: AuthUser): boolean {
    const check = this.users.filter((u) => u.username === user.username);
    if (check.length === 1) {
      return true;
    }
    return false;
  }

  async requireUser(request: Request, role: string | null = null, redirectTo?: string): Promise<Response> {
    const user = await this.user(request);
    if (user === null || (role && role !== user?.role)) {
      if (redirectTo) {
        throw redirect(redirectTo);
      } else {
        throw json<AppError>(
          {
            status: 'error',
            errorCode: 'auth/requireUser',
            errorMessage: `Unauthorized access`,
          },
          {
            status: 401,
          }
        );
      }
    } else {
      return json(
        { status: 'success' },
        {
          status: 200,
        }
      );
    }
  }

  logout(request: Request, redirectTo = '/'): Promise<Response> {
    return this.session.destroyAuthSession(request, ['id'], redirectTo);
  }

  async user(request: Request): Promise<AuthUser | null> {
    const session = await this.session.getAuthSession(request);
    const id = session.get('id');
    // let user: AuthUserType;

    if (id) {
      // _assuming_ the id exists, will cause an error otherwise
      return this.users.find((u) => u.id === id) || null;
    } else {
      return null;
    }
  }
}

// For standalone file auth ids
/**
 * Fast UUID generator, RFC4122 version 4 compliant.
 * @author Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
const UUID = (function () {
  const self: any = {};
  const lut: [] | any = [];
  for (let i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }
  self.generate = function () {
    const d0 = (Math.random() * 0xffffffff) | 0;
    const d1 = (Math.random() * 0xffffffff) | 0;
    const d2 = (Math.random() * 0xffffffff) | 0;
    const d3 = (Math.random() * 0xffffffff) | 0;
    return (
      lut[d0 & 0xff] +
      lut[(d0 >> 8) & 0xff] +
      lut[(d0 >> 16) & 0xff] +
      lut[(d0 >> 24) & 0xff] +
      '-' +
      lut[d1 & 0xff] +
      lut[(d1 >> 8) & 0xff] +
      '-' +
      lut[((d1 >> 16) & 0x0f) | 0x40] +
      lut[(d1 >> 24) & 0xff] +
      '-' +
      lut[(d2 & 0x3f) | 0x80] +
      lut[(d2 >> 8) & 0xff] +
      '-' +
      lut[(d2 >> 16) & 0xff] +
      lut[(d2 >> 24) & 0xff] +
      lut[d3 & 0xff] +
      lut[(d3 >> 8) & 0xff] +
      lut[(d3 >> 16) & 0xff] +
      lut[(d3 >> 24) & 0xff]
    );
  };
  return self;
})();
