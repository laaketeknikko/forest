module.exports = {
   root: true,
   env: { browser: true, es2020: true },
   extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
   ],
   ignorePatterns: ["dist", ".eslintrc.cjs"],
   parser: "@typescript-eslint/parser",
   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
   settings: { react: { version: "18.2" } },
   plugins: ["react-refresh", "mui-path-imports"],
   rules: {
      "mui-path-imports/mui-path-imports": "error",

      // Enabling this rule flags all React Three Fiber components.
      "react/no-unknown-property": 0,
      "react-refresh/only-export-components": [
         "warn",
         { allowConstantExport: true },
      ],
   },
}

