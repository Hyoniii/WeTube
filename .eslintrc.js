module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {},
  settings: {
    "eslint.lintTask.enable": true,
    "eslint.enable": true,
    "eslint.debug": true
  }
};
