export type AuthSessionType = {
  getAuthSession(request: Request): any;
  createAuthSession(data: any, redirectTo?: string): Promise<Response>;
  destroyAuthSession(request: Request, redirectTo?: string): any;
};

export interface AuthInterface {
  signUp(username: string, password: string, redirectTo?: string): any;
  login(username: string, password: string, redirectTo?: string): any;
  logout(request: Request, redirectTo?: string): any;
  exists(username: string): boolean;
  requireUser(request: Request, role?: string): any;
  user(request: Request): any;
}
