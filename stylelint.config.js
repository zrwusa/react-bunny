module.exports = {
    customSyntax: require('postcss-scss'), // IDE also uses this
    files: ['**/*.scss', '**/*.css'],
    ignoreFiles: [
        'node_modules/**/*',
        'public/**/*',
        '**/*.min.css',
        '**/*.html'  // Ignore all HTML files
    ],
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-prettier'
    ],
    rules: {
      'block-no-empty': true, // Violation: .selector {}. Disallow empty blocks (e.g., {}).
      'color-no-invalid-hex': true, // Violation: color: #12abz4. Disallow invalid color hex codes.
      'comment-no-empty': true, // Violation: /*  */. Disallow empty comments.
      'declaration-block-no-duplicate-properties': [
        true, {
          'ignore': [
            'consecutive-duplicates-with-different-values'
          ]
        }
      ], // Violation: .selector { property: value; property: value; }. Disallow duplicate properties within a declaration block.
      'declaration-block-no-shorthand-property-overrides': true, // Violation: .selector { margin: 0; margin-left: 10px; }. Disallow using shorthand properties that override related longhand properties.
      'font-family-no-duplicate-names': true, // Violation: font-family: Arial, Arial, sans-serif;. Disallow duplicate font family names.
      'font-family-no-missing-generic-family-keyword': true, // Violation: font-family: Helvetica, sans-serif;. Disallow missing generic family keywords in font-family declarations.
      'function-calc-no-unspaced-operator': true, // Violation: width: calc(100%+20px);. Disallow an unspaced operator within `calc` functions.
      'function-linear-gradient-no-nonstandard-direction': true, // Violation: background: linear-gradient(top, #000, #fff);. Disallow nonstandard direction values in `linear-gradient` functions.
      'keyframe-declaration-no-important': true, // Violation: @keyframes animation { 0% { color: red !important; } }. Disallow the use of `!important` in keyframe declarations.
      'media-feature-name-no-unknown': true, // Violation: @media screen and (unknown-feature: value) { }. Disallow unknown media feature names.
      'no-descending-specificity': true, // Violation: .parent .child { color: red; } .child { color: blue; }. Disallow selectors with lower specificity to override selectors with higher specificity.
      'no-duplicate-at-import-rules': true, // Violation: @import 'path/file.css'; @import 'path/file.css';. Disallow duplicate `@import` rules.
      'no-duplicate-selectors': true, // Violation: .selector { } .selector { }. Disallow duplicate selectors.
      'no-empty-source': true, // Violation: (file is empty). Disallow empty sources (e.g., empty files).
      'no-invalid-double-slash-comments': true, // Violation: // This is a comment //. Disallow invalid double slash comments (e.g., // comment).
      'property-no-unknown': true, // Violation: prop-erty: value;. Disallow unknown properties.
      'selector-pseudo-class-no-unknown': true, // Violation: .selector:unknown-pseudo-class { }. Disallow unknown pseudo-class selectors.
      'selector-pseudo-element-no-unknown': true, // Violation: .selector::unknown-pseudo-element { }. Disallow unknown pseudo-element selectors.
      'selector-type-no-unknown': true, // Violation: unknown-type { }. Disallow unknown type selectors.
      'string-no-newline': true, // Violation: content: "This is a \n newline";. Disallow newlines in strings.
      'unit-no-unknown': true, // Violation: width: 100pxk;. Disallow unknown units.
      'at-rule-no-unknown': null, // Allow unknown at-rules. (This rule is explicitly set to null to disable it)
    }
}
