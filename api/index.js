var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
    fileName: "app/entry.server.tsx",
    lineNumber: 12,
    columnNumber: 31
  }, this));
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/styles/global.css
var global_default = "/build/_assets/global-FI4HAERB.css";

// app/styles/dark.css
var dark_default = "/build/_assets/dark-XZHWBIDZ.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
}), links = () => [
  { rel: "stylesheet", href: global_default },
  {
    rel: "stylesheet",
    href: dark_default,
    media: "(prefers-color-scheme: dark)"
  }
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 29,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 27,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { children: "There was an error" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 41,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: error.message }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 42,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("hr", {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: "Hey, developer, you should replace this with what you want your users to see." }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 44,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 40,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 39,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}
function CatchBoundary() {
  let caught = (0, import_react2.useCatch)(), message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: "Oops! Looks like you tried to visit a page that you do not have access to." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 17
      }, this);
      break;
    case 404:
      message = /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: "Oops! Looks like you tried to visit a page that does not exist." }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 17
      }, this);
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Layout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { children: [
      caught.status,
      ": ",
      caught.statusText
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this),
    message
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 68,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 67,
    columnNumber: 5
  }, this);
}
function Document({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 87,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 89,
        columnNumber: 52
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 85,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
function Layout({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "remix-app", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("header", { className: "remix-app__header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container remix-app__header-content", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: "/", title: "Remix", className: "remix-app__header-home-link", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(RemixLogo, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 101,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("nav", { "aria-label": "Main navigation", className: "remix-app__header-nav", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("ul", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: "/", children: "Home" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 106,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 105,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: "/signup", children: "Sign Up Page" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 109,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 108,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Link, { to: "/protected", children: "Protected Page" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 112,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 111,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 104,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 99,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "remix-app__main", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container remix-app__main-content", children }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 119,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 118,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("footer", { className: "remix-app__footer", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container remix-app__footer-content", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { children: "\xA9 You!" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 123,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 122,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 121,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 97,
    columnNumber: 5
  }, this);
}
function RemixLogo() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    "svg",
    {
      viewBox: "0 0 659 165",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      "aria-labelledby": "remix-run-logo-title",
      role: "img",
      width: "106",
      height: "30",
      fill: "currentColor",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("title", { id: "remix-run-logo-title", children: "Remix Logo" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 143,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 144,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 145,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 147,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 148,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/root.tsx",
      lineNumber: 132,
      columnNumber: 5
    },
    this
  );
}

// app/routes/protected.tsx
var protected_exports = {};
__export(protected_exports, {
  default: () => Secrets,
  loader: () => loader,
  meta: () => meta2
});
var import_react3 = require("@remix-run/react");

// app/auth.server/firebase-auth.ts
var import_node = require("@remix-run/node");

// app/firebase.ts
var import_app = require("firebase-admin/app"), import_auth = require("firebase-admin/auth"), import_firestore = require("firebase-admin/firestore"), app, auth, restApiSignInUrl = "", db;
app = (0, import_app.getApps)().length === 0 ? (0, import_app.initializeApp)({ projectId: "demo-remix-app" }) : (0, import_app.getApp)(), restApiSignInUrl = "http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123";
auth = (0, import_auth.getAuth)(app);
db = (0, import_firestore.getFirestore)(app);

// app/auth.server/firebase-auth.ts
var FirebaseAuth = class {
  constructor(session) {
    this.session = session;
  }
  async createAccount(user, redirectTo) {
    if (!(user != null && user.username) || !(user != null && user.password))
      return (0, import_node.json)(
        {
          status: "error",
          errorCode: "auth/createAccount",
          errorMessage: "Could not create the account - missing params"
        },
        {
          status: 422
        }
      );
    try {
      let newUser = await auth.createUser({ email: user.username, password: user.password });
      return redirectTo ? (0, import_node.redirect)(redirectTo) : (0, import_node.json)(
        { status: "success", user: newUser },
        {
          status: 201
        }
      );
    } catch (error) {
      throw (0, import_node.json)(
        {
          status: "error",
          errorCode: "auth/createAccount",
          errorMessage: `Could not create the account - ${error}`
        },
        {
          status: 500
        }
      );
    }
  }
  async login(user) {
    var _a;
    if (!(user != null && user.username) || !(user != null && user.password))
      return (0, import_node.json)(
        {
          status: "error",
          errorCode: "auth/login",
          errorMessage: "Could not login - missing params"
        },
        {
          status: 422
        }
      );
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      let req = new Request(restApiSignInUrl, {
        method: "post",
        headers,
        body: JSON.stringify({
          email: user.username,
          password: user.password,
          returnSecureToken: !0
        })
      }), credentials = await (await fetch(req)).json();
      if (credentials.error)
        return (0, import_node.json)(
          {
            status: "error",
            errorCode: "auth/login",
            errorMessage: "Invalid username or password"
          },
          {
            status: 422
          }
        );
      let firebaseUser = await auth.getUser(credentials.localId), expiresIn = 60 * 60 * 24 * 5 * 1e3, sessionIdToken = await auth.createSessionCookie(credentials.idToken, {
        expiresIn
      }), sessionUser = {
        id: firebaseUser.uid,
        username: firebaseUser.email,
        name: firebaseUser.displayName,
        role: (_a = firebaseUser.customClaims) == null ? void 0 : _a.role
      };
      return this.session.createAuthSession({
        idToken: sessionIdToken,
        user: sessionUser
      });
    } catch (error) {
      return console.error("auth/login", `Could not create the session cookie - ${error}`), (0, import_node.json)(
        {
          status: "error",
          errorCode: "auth/login",
          errorMessage: "There was a problem logging in"
        },
        {
          status: 500
        }
      );
    }
  }
  logout(request, redirectTo = "/") {
    return this.session.destroyAuthSession(request, ["idToken", "user"], redirectTo);
  }
  async exists(user) {
    try {
      if (await auth.getUserByEmail(user.username))
        return !0;
    } catch (error) {
      throw (0, import_node.json)(
        {
          status: "exception",
          errorCode: "auth/exists",
          errorMessage: `Could not check for account - ${error}`
        },
        { status: 500 }
      );
    }
    return !1;
  }
  async requireUser(request, role = null, redirectTo) {
    let sessionIdToken = (await this.session.getAuthSession(request)).get("idToken"), decodedClaims;
    if (sessionIdToken && typeof sessionIdToken == "string") {
      try {
        decodedClaims = await auth.verifySessionCookie(sessionIdToken);
      } catch {
        throw await this.session.destroyAuthSession(request, ["idToken", "user"], redirectTo || void 0);
      }
      if (!role || role === (decodedClaims == null ? void 0 : decodedClaims.role))
        return (0, import_node.json)(
          { status: "success" },
          {
            status: 200
          }
        );
    }
    throw redirectTo ? (0, import_node.redirect)(redirectTo) : (0, import_node.json)(
      {
        status: "error",
        errorCode: "auth/requireUser",
        errorMessage: "Unauthorized access"
      },
      {
        status: 401
      }
    );
  }
  async user(request) {
    let session = await this.session.getAuthSession(request);
    return JSON.parse(session.get("user") || null);
  }
};

// app/auth.server/auth-session.ts
var import_node3 = require("@remix-run/node");

// app/util/session/cookie-session.server.ts
var import_node2 = require("@remix-run/node"), sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret)
  throw new Error("SESSION_SECRET must be set");
var { getSession, commitSession, destroySession } = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    secure: !1,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 5,
    httpOnly: !0
  }
});

// app/auth.server/auth-session.ts
var authSession = {
  getAuthSession(request) {
    return getSession(request.headers.get("Cookie"));
  },
  async createAuthSession(data, redirectTo) {
    try {
      let session = await getSession();
      for (let key in data)
        typeof data[key] == "string" ? session.set(key, data[key]) : session.set(key, JSON.stringify(data[key]));
      return redirectTo ? (0, import_node3.redirect)(redirectTo, {
        headers: {
          "Set-Cookie": await commitSession(session)
        }
      }) : (0, import_node3.json)(
        { status: "success" },
        {
          headers: {
            "Set-Cookie": await commitSession(session)
          },
          status: 201
        }
      );
    } catch (error) {
      return (0, import_node3.json)(
        {
          errorCode: "session/create",
          errorMessage: `Could not create user session: ${error}`
        },
        {
          status: 500
        }
      );
    }
  },
  async destroyAuthSession(request, keys, redirectTo) {
    let session = await getSession(request.headers.get("Cookie"));
    return typeof keys == "string" ? session.unset(keys) : keys.forEach((key) => session.unset(key)), redirectTo ? (0, import_node3.redirect)(redirectTo, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    }) : (0, import_node3.json)(
      { status: "success" },
      {
        headers: {
          "Set-Cookie": await commitSession(session)
        },
        status: 204
      }
    );
  }
};

// app/auth.server/index.ts
var auth2 = new FirebaseAuth(authSession);

// app/routes/protected.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), meta2 = () => ({
  title: "Protected Page"
}), loader = async ({ request }) => (await auth2.requireUser(request, "admin", "/"), await auth2.user(request));
function Secrets() {
  let user = (0, import_react3.useLoaderData)() || { username: "foo", id: "bar", name: "baz", role: "shazam" };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "remix__page", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { children: "Protected Page" }, void 0, !1, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: [
      "Hello ",
      user.name
    ] }, void 0, !0, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Form, { method: "post", action: "/logout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { children: "Logout" }, void 0, !1, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 28,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { children: "User Details" }, void 0, !1, {
        fileName: "app/routes/protected.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("table", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("th", { children: "Field" }, void 0, !1, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 35,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("th", { children: "Value" }, void 0, !1, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 36,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/protected.tsx",
          lineNumber: 34,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/protected.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tbody", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "id" }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 41,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: user.id }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 42,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 40,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "username" }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 45,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: user.username }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 46,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 44,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "name" }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 49,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: user.name }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 50,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: "role" }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 53,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("td", { children: user.role }, void 0, !1, {
              fileName: "app/routes/protected.tsx",
              lineNumber: 54,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/protected.tsx",
            lineNumber: 52,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/protected.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/protected.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { children: "DB Users" }, void 0, !1, {
        fileName: "app/routes/protected.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Outlet, {}, void 0, !1, {
        fileName: "app/routes/protected.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/protected.tsx",
      lineNumber: 59,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/protected.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/protected.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/routes/protected/index.tsx
var protected_exports2 = {};
__export(protected_exports2, {
  default: () => SecretData
});
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function SecretData() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { children: "Some Secret Stuff" }, void 0, !1, {
    fileName: "app/routes/protected/index.tsx",
    lineNumber: 2,
    columnNumber: 10
  }, this);
}

// app/routes/db-test.tsx
var db_test_exports = {};
__export(db_test_exports, {
  loader: () => loader2
});
var import_node4 = require("@remix-run/node");

// app/models/user.ts
var User = class {
  constructor(username = "", role = "", id = "", preferences) {
    this.username = username;
    this.role = role;
    this.id = id;
    this.preferences = preferences;
    this.preferences = preferences || null;
  }
  getUsername() {
    return this.username;
  }
  setUsername(username) {
    this.username = username;
  }
  getRole() {
    return this.role;
  }
  setRole(role) {
    this.role = role;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getPreferences() {
    return { ...this.preferences };
  }
  setPreferences(prefs) {
    this.preferences = prefs;
  }
};

// app/controllers.server/controller-types.ts
var DBResult = class {
  constructor(records, affected = 0) {
    this.records = records;
    this.affected = affected;
    this.records = records || [], this.affected = affected || this.records.length;
  }
  count() {
    return this.affected;
  }
  rows() {
    return this.records;
  }
}, Controller = class {
  constructor(collection, db3) {
    this.collection = collection;
    this.db = db3;
  }
};

// app/controllers.server/users.ts
var Users = class extends Controller {
  constructor(db3) {
    super("users", db3);
  }
  async create(userData) {
    if (userData.username) {
      if (await this.getByUsername(userData.username))
        throw Error("Users/createUser - user already exists");
      userData.role || (userData.role = "guest");
      try {
        let u = (await this.db.executeInsert(userData, { collection: this.collection })).rows().pop();
        return new User(u.username, u == null ? void 0 : u.role, u == null ? void 0 : u.id, u == null ? void 0 : u.preferences);
      } catch (error) {
        throw Error(`Users/createUser - ${error}`);
      }
    } else
      throw Error("Users/createUser - could not create user, missing required field");
  }
  async read(options) {
    return (await this.db.executeQuery({ ...options, collection: this.collection })).rows().map((record) => {
      let u = record;
      return new User(u.username, u.role, u.id, u.preferences);
    });
  }
  async update(userData) {
    if (userData.id) {
      if (!await this.getById(userData.id))
        throw Error("Users/updateUser - user does not exist");
      try {
        let result = await this.db.executeUpdate(userData, {
          collection: this.collection,
          where: { field: "id", operator: "==", value: userData.id }
        });
        return ((record) => {
          let u = record;
          return new User(u.username, u.role, u.id, u.preferences);
        })(result.rows().pop());
      } catch (error) {
        throw Error(`Users/updateUser - ${error}`);
      }
    } else
      throw Error("Users/updateUser - could not update user, missing required field");
  }
  async delete(userData) {
    if (userData.id) {
      if (!await this.getById(userData.id))
        throw Error("Users/deleteUser - user does not exist");
      try {
        let result = await this.db.executeDelete(
          {
            id: userData.id
          },
          { collection: this.collection, where: { field: "id", operator: "==", value: userData.id } }
        );
        return ((record) => {
          let u = record;
          return new User(u.username, u.role, u.id, u.preferences);
        })(result.rows().pop());
      } catch (error) {
        throw Error(`Users/deleteUser - ${error}`);
      }
    } else
      throw Error("Users/deleteUser - could not update user, missing required field");
  }
  async getById(id) {
    let result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: "id", operator: "==", value: id }
    });
    if (result.count() === 1) {
      let u = result.rows().pop();
      return new User(u.username, u.role, u.id, u.preferences);
    } else
      return null;
  }
  async getByUsername(username) {
    let result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: "username", operator: "==", value: username }
    });
    if (result.count() === 1) {
      let u = result.rows().pop();
      return new User(u.username, u.role, u.id, u.preferences);
    } else
      return null;
  }
  allByRole(role) {
    return this.read({ collection: this.collection, where: { field: "role", operator: "==", value: role } });
  }
};

// app/db.server/firestore-db.ts
var FirestoreDB = class {
  constructor(db3) {
    this.db = db3;
  }
  async executeQuery(options) {
    try {
      let query = db.collection(options.collection);
      if (options.where) {
        let w = options.where;
        query = query.where(w.field, w.operator, w.value);
      }
      if (options.orderBy) {
        let o = options.orderBy;
        query = query.orderBy(o.field, o == null ? void 0 : o.direction);
      }
      if (options.limit) {
        let l = options.limit;
        query = query.limit(l.max), l.offset && (query = query.offset(l.offset));
      }
      let models = (await query.get()).docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return new DBResult(models);
    } catch (error) {
      console.error("firestoreDB/executeQuery", error);
    }
    return new DBResult([]);
  }
  async executeInsert(model, options) {
    try {
      let collectionRef = db.collection(options.collection), inserted;
      return Object.getOwnPropertyDescriptor(model, "id") ? inserted = await collectionRef.doc(model.id).set(model) : inserted = (await (await collectionRef.add(model)).get()).data(), inserted ? new DBResult([inserted]) : new DBResult([]);
    } catch (error) {
      console.error("firestoreDB/executeInsert", error);
    }
    return new DBResult([]);
  }
  async executeUpdate(model, options) {
    var _a, _b, _c;
    try {
      let docs = await db.collection(options.collection).where(
        (_a = options.where) == null ? void 0 : _a.field,
        (_b = options.where) == null ? void 0 : _b.operator,
        (_c = options.where) == null ? void 0 : _c.value
      ).get(), results = [];
      return docs.size > 0 && await docs.forEach(async (doc) => {
        doc.ref.update(model), results.push({ ...doc.data(), ...model });
      }), new DBResult(results);
    } catch (error) {
      console.error("firestoreDB/executeDelete", error);
    }
    return new DBResult([]);
  }
  async executeDelete(model, options) {
    var _a, _b, _c;
    try {
      let docs = await db.collection(options.collection).where(
        (_a = options.where) == null ? void 0 : _a.field,
        (_b = options.where) == null ? void 0 : _b.operator,
        (_c = options.where) == null ? void 0 : _c.value
      ).get(), results = [];
      return docs.size > 0 && await docs.forEach((doc) => {
        doc.ref.delete({ exists: !0 }), results.push(doc.data());
      }), new DBResult(results);
    } catch (error) {
      console.error("firestoreDB/executeDelete", error);
    }
    return new DBResult([]);
  }
  getDb() {
    return this.db;
  }
}, firestoreDb = new FirestoreDB(db);

// app/db.server/index.ts
var db2 = firestoreDb;

// app/controllers.server/index.ts
var users = new Users(db2);

// app/routes/db-test.tsx
var loader2 = async ({ request }) => {
  let op = new URL(request.url).searchParams.get("op"), user;
  switch (op) {
    case "create":
      return user = { id: "testid", username: "test@example.com", role: "guest", preferences: { theme: "dark" } }, (0, import_node4.json)(await users.create(user));
      break;
    case "read":
      return (0, import_node4.json)(await users.getById("Wv3jQLi5CUUlsBfeiJLOjTta5wWP"));
    case "update":
      return user = { id: "testid", role: "admin", preferences: { theme: "light" } }, (0, import_node4.json)(await users.update(user));
      break;
    case "delete":
      return user = { id: "testid" }, (0, import_node4.json)(await users.delete(user));
      break;
    default:
      return (0, import_node4.json)(await users.allByRole("admin"));
  }
};

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action,
  loader: () => loader3
});
var import_node5 = require("@remix-run/node");
var loader3 = async () => (0, import_node5.redirect)("/"), action = async ({ request }) => auth2.logout(request, "/");

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  action: () => action2,
  default: () => Index,
  loader: () => loader4,
  meta: () => meta3
});
var import_react4 = require("react"), import_react5 = require("@remix-run/react"), import_node6 = require("@remix-run/node");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), meta3 = () => ({
  title: "Sign Up Page"
}), action2 = async ({ request }) => {
  try {
    let form = await request.formData(), email = form.get("email"), password = form.get("password"), confirm = form.get("confirm");
    if (!email || email.trim() === "")
      return (0, import_node6.json)(
        {
          status: "validationFailure",
          errorCode: "signup/invalid-email",
          errorMessage: "Email field cannot be empty"
        },
        { status: 400 }
      );
    if (!password || !confirm || password.trim() === "" || password !== confirm)
      return (0, import_node6.json)(
        {
          status: "validationFailure",
          errorCode: "signup/invalid-password",
          errorMessage: "Password fields cannot be empty and must match"
        },
        { status: 400 }
      );
    let res = await (await auth2.createAccount({ username: email, password })).json();
    return await users.create({ id: res.user.uid, role: "guest", username: res.user.email, preferences: { theme: "dark" } }), (0, import_node6.redirect)("/");
  } catch (error) {
    return console.error("signup/general", `Could not create the account - ${error}`), (0, import_node6.json)(
      {
        status: "error",
        errorCode: "signup/general",
        errorMessage: "There was a problem creating the account"
      },
      { status: 500 }
    );
  }
}, loader4 = async ({ request }) => await auth2.user(request) ? (0, import_node6.redirect)("/") : null;
function Index() {
  let actionError = (0, import_react5.useActionData)(), emailRef = (0, import_react4.useRef)(null), passwordRef = (0, import_react4.useRef)(null), confirmRef = (0, import_react4.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "remix__page", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", { children: "Sign Up Page" }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "Everyone can view the home page." }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 87,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("section", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Form, { className: "remix__form", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { children: "Sign Up Form" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { htmlFor: "email", children: "Email:" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "text", id: "email", name: "email", ref: emailRef }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { htmlFor: "email", children: "Password:" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "password", id: "password", name: "password", ref: passwordRef }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 96,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("label", { htmlFor: "email", children: "Confirm Password:" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 98,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "password", id: "confirm", name: "confirm", ref: confirmRef }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 100,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { type: "submit", children: "Sign Up" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 101,
        columnNumber: 13
      }, this),
      (actionError == null ? void 0 : actionError.errorCode) && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("em", { children: [
        "Sign up failed: ",
        actionError.errorMessage
      ] }, void 0, !0, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 104,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 103,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 90,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 85,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 84,
    columnNumber: 5
  }, this);
}

// app/routes/tester.tsx
var tester_exports = {};
__export(tester_exports, {
  default: () => Tester,
  loader: () => loader5
});
var import_node7 = require("@remix-run/node"), import_react6 = require("@remix-run/react");
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), loader5 = async () => (0, import_node7.json)(await users.getById("Wv3jQLi5CUUlsBfeiJLOjTta5wWP"));
function Tester() {
  let user = (0, import_react6.useLoaderData)();
  return console.log(user), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "remix__page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("main", { children: "TESTER" }, void 0, !1, {
      fileName: "app/routes/tester.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    user && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { children: [
      "some user",
      user.username
    ] }, void 0, !0, {
      fileName: "app/routes/tester.tsx",
      lineNumber: 16,
      columnNumber: 16
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/tester.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  action: () => action3,
  default: () => Index2,
  loader: () => loader6,
  meta: () => meta4
});
var import_react7 = require("react"), import_react8 = require("@remix-run/react"), import_node8 = require("@remix-run/node");
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), meta4 = () => ({
  title: "Home Page"
}), action3 = async ({ request }) => {
  try {
    let form = await request.formData(), email = form.get("email"), password = form.get("password");
    return !email || email.trim() === "" ? (0, import_node8.json)(
      {
        status: "error",
        errorCode: "signup/invalid-email",
        errorMessage: "Email field cannot be empty"
      },
      { status: 400 }
    ) : !password || password.trim() === "" ? (0, import_node8.json)(
      {
        status: "error",
        errorCode: "signup/invalid-password",
        errorMessage: "Password field cannot be empty"
      },
      { status: 400 }
    ) : auth2.login({ username: email, password });
  } catch {
    return (0, import_node8.json)(
      {
        status: "error",
        errorCode: "login/general",
        errorMessage: "There was a problem logging in"
      },
      { status: 500 }
    );
  }
}, loader6 = async ({ request }) => await auth2.user(request);
function Index2() {
  let actionError = (0, import_react8.useActionData)(), user = (0, import_react8.useLoaderData)(), emailRef = (0, import_react7.useRef)(null), passwordRef = (0, import_react7.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "remix__page", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { children: "Home Page" }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 72,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: "Everyone can view the home page." }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 73,
      columnNumber: 9
    }, this),
    user && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_jsx_dev_runtime7.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: [
        "Hello ",
        user.name,
        ", you can now view the ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react8.Link, { to: "/protected", children: "protected page." }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 77,
          columnNumber: 55
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 76,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react8.Form, { method: "post", action: "/logout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { children: "Logout" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 80,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 75,
      columnNumber: 11
    }, this) || /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("section", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react8.Form, { className: "remix__form", method: "post", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { children: "Login Form" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { htmlFor: "email", children: "Email:" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 87,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("input", { type: "text", id: "email", name: "email", ref: emailRef }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 88,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 89,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { htmlFor: "email", children: "Password:" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 90,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("input", { type: "password", id: "password", name: "password", ref: passwordRef }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 91,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 92,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { type: "submit", children: "Login" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 93,
        columnNumber: 15
      }, this),
      (actionError == null ? void 0 : actionError.errorCode) && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("em", { children: [
        "Login failed: ",
        actionError.errorMessage
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 96,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 95,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 85,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 84,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 71,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "8c7d54a0", entry: { module: "/build/entry.client-C53OCUIZ.js", imports: ["/build/_shared/chunk-QQXQO5U5.js", "/build/_shared/chunk-FOBQCQPJ.js", "/build/_shared/chunk-5KL4PAQL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-4KQFWZOH.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/db-test": { id: "routes/db-test", parentId: "root", path: "db-test", index: void 0, caseSensitive: void 0, module: "/build/routes/db-test-2ET3D5GN.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-IBZX4YCU.js", imports: ["/build/_shared/chunk-ZPFOYRVQ.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-DOMDNNGV.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/protected": { id: "routes/protected", parentId: "root", path: "protected", index: void 0, caseSensitive: void 0, module: "/build/routes/protected-WP5BEJS3.js", imports: ["/build/_shared/chunk-ZPFOYRVQ.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/protected/index": { id: "routes/protected/index", parentId: "routes/protected", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/protected/index-KHZKN6EH.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-TDYTJ6ZE.js", imports: ["/build/_shared/chunk-ZPFOYRVQ.js", "/build/_shared/chunk-HGYPKNEV.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/tester": { id: "routes/tester", parentId: "root", path: "tester", index: void 0, caseSensitive: void 0, module: "/build/routes/tester-SJ22CV4V.js", imports: ["/build/_shared/chunk-HGYPKNEV.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, url: "/build/manifest-8C7D54A0.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/protected": {
    id: "routes/protected",
    parentId: "root",
    path: "protected",
    index: void 0,
    caseSensitive: void 0,
    module: protected_exports
  },
  "routes/protected/index": {
    id: "routes/protected/index",
    parentId: "routes/protected",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: protected_exports2
  },
  "routes/db-test": {
    id: "routes/db-test",
    parentId: "root",
    path: "db-test",
    index: void 0,
    caseSensitive: void 0,
    module: db_test_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/tester": {
    id: "routes/tester",
    parentId: "root",
    path: "tester",
    index: void 0,
    caseSensitive: void 0,
    module: tester_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
