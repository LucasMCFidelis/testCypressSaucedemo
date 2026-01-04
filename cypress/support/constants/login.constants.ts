export const loginErrors = {
  usernameRequired: "Username is required",
  passwordRequired: "Password is required",
  invalidCredentials: "Username and password do not match any user",
} as const;

export const loginSelectors = {
  loginContainer: '[data-test="login-container"]',
  username: '[data-test="username"]',
  password: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
};

export const SESSION_COOKIE_KEY = "session-username"
