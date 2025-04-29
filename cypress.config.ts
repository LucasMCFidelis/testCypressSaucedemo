import { defineConfig } from "cypress";
import dotenv from "dotenv"

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      userNameValid: process.env.USER_NAME,
      passwordValid: process.env.PASSWORD,
    },
  },
});
