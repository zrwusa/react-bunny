module.exports = {
  env: {
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "react-hooks"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-debugger": "off",
//    "@typescript-eslint/no-non-null-assertion": "off",  // e.g. variable!
//    "@typescript-eslint/no-inferrable-types": "off", // e.g. let num: number = 0;
//    "@typescript-eslint/no-var-requires": "off", // Require statement not part of import statement, e.g. const {PriorityQueue} = require('./priority-queue')
//    "@typescript-eslint/ban-types": "off",  // Don't use `object` as a type. The `object` type is currently hard to use, e.g. algorithm: object | Function
//    "@typescript-eslint/no-empty-interface": "off" // e.g. interface I_TreeMultiSet<T> extends I_BST<T> {}
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  }
}
