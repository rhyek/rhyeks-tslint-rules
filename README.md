# rhyeks-tslint-rules@0.1.0

A few useful tslint rules.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install rhyeks-tslint-rules --save
```

This package is provided in these module formats:

- CommonJS

## Usage

In your `tslint.json`:

```
{
  ...
  "extends": [
    "rhyeks-tslint-rules"
  ],
  "rules": {
    "no-operator-on-type": [true, {
      "binary": [
        ["string", "string", ["+", "+=", "<", "<=", ">", ">="]],
        ["string", "number", ["+", "+="]], // order of types does not matter
      ]
    }],
  }
}
```

The rule by default does nothing. You must explicitly set what operators you want to disable.

## Dependencies

- [tslint](https://github.com/palantir/tslint): An extensible static analysis linter for the TypeScript language
- [typescript](https://github.com/Microsoft/TypeScript): TypeScript is a language for application scale JavaScript development

## Dev Dependencies

- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped): TypeScript definitions for Node.js

## License

[ISC]()
