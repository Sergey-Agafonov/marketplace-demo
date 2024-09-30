module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-warning-comments": ["warn"],
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "moment",
            message:
              "moment.js is a legacy project. Consider using date-fns or dayjs or native JavaScript Date APIs.",
          },
        ],
      },
    ],
  },
};
