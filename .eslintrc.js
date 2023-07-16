module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaFeatures': {
            'jsx': true
        },
        ecmaVersion: "latest", // "latest"
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'react-hooks' // "react"
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',                    // allow unused variables
        '@typescript-eslint/no-explicit-any': 'off',                   // allow any
//        '@typescript-eslint/explicit-module-boundary-types': 'off',    // require you to explicitly specify the types of functions' return values and arguments when they are exported from a module
        '@typescript-eslint/ban-ts-comment': 'off',                    //flag any usage of TypeScript-specific comment directives, such as "@ts-ignore" or "@ts-check"
        'no-debugger': 'off',                                          //warn you if there are any instances of debugger statements, which are often used for debugging purposes and can be accidentally left in the code.
//        "@typescript-eslint/no-non-null-assertion": "off",             // e.g. variable! allowing the use of non-null assertions. Non-null assertions are denoted by the exclamation mark (!) and tell TypeScript that a variable is not null or undefined, even if its type suggests it could be. The rule would typically warn you about using non-null assertions and encourage you to handle nullability properly.
//        "@typescript-eslint/no-inferrable-types": "off",               // e.g. let num = 0;
//        "@typescript-eslint/no-var-requires": "off",                   // e.g. const {PriorityQueue} = require('./priority-queue'), Require statement not part of import statement,
        '@typescript-eslint/ban-types': 'off',                         // e.g. algorithm: object | Function, Don't use `object` as a type. The `object` type is currently hard to use
//        "@typescript-eslint/no-empty-interface": "off"                 // e.g. interface I_TreeMultiSet<T> extends I_BST<T> {}, flag empty interfaces in your code. Empty interfaces are typically used as markers or placeholders, and this rule would suggest removing them to keep the codebase clean.
//         "react-hooks/rules-of-hooks": "error",                        // part of the eslint-plugin-react-hooks package, ensures that hooks are used according to the rules defined by React. It helps catch common mistakes such as using hooks conditionally, not calling hooks in the top-level of the component, or using hooks inside loops or conditions where their order could change.
//         "react-hooks/exhaustive-deps": "warn",                        //  part of the eslint-plugin-react-hooks ,ensure that the dependency array passed to the useEffect and useCallback hooks includes all the dependencies required for proper functionality. When using these hooks, it's important to specify all the variables or values that the effect or callback function depends on. This rule warns if any dependencies are missing from the array or if unnecessary dependencies are included, which can lead to bugs or performance issues.
//         "react/prop-types": "off"                                     // part of the eslint-plugin-react package and checks whether you have defined PropTypes for your React components. PropTypes are a way to declare the expected types of the component's props, providing type checking and documentation for the component's API. This rule encourages you to define PropTypes for your components to improve code quality, maintainability, and catch potential prop-related bugs.
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    }
}
