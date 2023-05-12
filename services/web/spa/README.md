# React App

- [React App](#react-app)
  - [Initialize the git repository](#initialize-the-git-repository)
    - [Create .gitignore](#create-gitignore)
  - [Initialize the project](#initialize-the-project)
    - [Create `package.json` file](#create-packagejson-file)
    - [Create source folder](#create-source-folder)
    - [Create html entry point](#create-html-entry-point)
    - [And our application components](#and-our-application-components)
  - [Run](#run)
    - [Open application in default browser](#open-application-in-default-browser)
  - [Build](#build)
  - [Init **Typescript**](#init-typescript)
    - [Enable `jsx/tsx` support](#enable-jsxtsx-support)
  - [Other tweaks](#other-tweaks)
    - [Type checking](#type-checking)
      - [ESLint](#eslint)
      - [Jest](#jest)
    - [All together](#all-together)

## Initialize the git repository

```bash
$ echo "# react_simple_form" >> README.md
$ git init
# Initialized empty Git repository in /home/mprymak/work/my/react_simple_form/.git/
$ git add README.md
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin git@github.com:MykolaPrymak/react_simple_form.git
$ git push -u origin main
```

### Create .gitignore

Also let's create list of files/folders that Git should ignore.

To do so - create `.gitignore` file with next content:

```bash
# IDE/Editors
.vscode/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage
lib-cov
coverage
.nyc_output

# Dependency directories
node_modules/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm
.parcel-cache
.cache

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Build files
dist/
```

## Initialize the project

### Create `package.json` file

```bash
$ yarn init

# yarn init v1.22.17
# warning package.json: No license field
question name (react_app_repo): react_app
question version (1.0.0): 0.0.1
question description: React Simple App with Parcel
question entry point (index.js): src/index.tsx
question repository url (git@github.com:JohnDoe/react_app_repo.git):
question author (John Doe <John.Doe@example.com>):
question license (MIT):
question private: yes
# success Saved package.json
# Done in **.**s.
```

and add project requirements

```bash
$ yarn add react react-dom
$ yarn add parcel typescript @types/react @types/react-dom --dev
```

Now our `project.json` will looks like

```json
{
  "name": "react_app",
  "version": "0.0.1",
  "description": "React Simple App with Parcel",
  "main": "src/index.tsx",
  "repository": "git@github.com:JohnDoe/react_app_repo.git",
  "author": "John Doe <John.Doe@example.com>",
  "license": "MIT",
  "private": true,
  "dependencies": {
    "react": "*",
    "react-dom": "*"
  },
  "devDependencies": {
    "parcel": "*",
    "typescript": "*",
    "@types/react": "*",
    "@types/react-dom": "*",
    "process": "*"
  }
}
```

Replace

```json
{
  "main": "src/index.tsx"
}
```

with

```json
{
  "source": "src/index.html"
}
```

because we build not module but application, and your build process will crash.

### Create source folder

This folder which will contains our application

```bash
$ mkdir src
```

### Create html entry point

```bash
$ touch index.html
```

With next basic content

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable Javascript to run this application.</noscript>
    <div id="app">
      <!-- Your react app will be rendered here -->
    </div>
    <script type="module" src="./index.tsx"></script>
  </body>
</html>
```

### And our application components

**Container:**

```javascript
import ReactDOM from "react-dom";
import { App } from "./App";

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
```

**And the application itself:**

```javascript
export function App() {
  return <h1>Hello world!</h1>;
}
```

## Run

Now we start run our [Parcel](https://parceljs.org/) application with next command:

```bash
$ yarn parcel src/index.html
```

But let's add useful commands into our `package.json` file

```json
{
  "scripts": {
    "start": "parcel",
    "prebuild": "run-s clean",
    "build": "parcel build",
    "clean": "rimraf ./dist"
  }
}
```

so we could run our app with just

```bash
$ yarn start
```

To have ability to run scripts in serial mode with `npm-s` add we need to add `npm-run-all` npm package

```bash
$ yarn add npm-run-all --dev
```



### Open application in default browser

Add `--open` to `parcel` command in your `package.json` file to open browser with your app after start the Parcel:

```json
{
  "scripts": {
    "start": "parcel --open"
  }
}
```

## Build

To build the production ready application version just run

```bash
$ yarn build
```

This command will remove old build in `dist` folder and create the new one.

## Init **Typescript**

We also want to benefit from the type check and other features of **Typescript**. So let's init our **Typescript** configuration.

```bash
$ npx tsc --init
```

This command will create `tsconfig.json` with basic configuration.

### Enable `jsx/tsx` support

To enable `jsx/tsx` files support we must add `"jsx": "react"` config option in `tsconfig.json` file.

```json
{
  "jsx": "react"
}
```

## Other tweaks

### [Type checking](https://parceljs.org/languages/typescript/#type-checking)

To perform type check add next line into `scripts` section of `package.json:`

```json
{
  "scripts": {
    "check": "tsc --noEmit"
  }
}
```

Run typecheck check with

```bash
$ yarn check
```

#### ESLint

Add dependencies for `eslint`:

```bash
$ yarn add eslint @eslint/create-config @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest --dev
```

Initialize the eslint config:

```bash
$ npx eslint --init
```

Add script section in `package.json:`

```json
{
  "scripts": {
    "lint": "eslint --ext ts,tsx src"
  }
}
```

Run `eslint` check with

```bash
$ yarn lint
```

#### Jest

Add dependencies for `jest`:

```bash
$ yarn add jest @types/jest eslint-plugin-react@latest --dev
```

Add script section in `package.json:`

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Add jest support for `eslint`. To do that - add jest as env in `.eslintrc.json` or `js`/`yaml` file:

```json
"env": {
    "jest": true
}
```

And create empty test file `src/index.test.ts` in src folder to avoid `jest` crash.

```typescript
describe("Empty Test Collection", () => {
  it("Empty Test", () => {
    expect(true).toBeTruthy();
  });
});
```

Run tests with

```bash
$ yarn test
```

### All together

To combine all previous commands and prepare/check your build for deploy - create `ci` script to combine all that commands in one:

```json
{
  "scripts": {
    "check": "tsc --noEmit",
    "lint": "eslint --ext ts,tsx src",
    "test": "jest",
    "ci": "yarn build && yarn test && yarn lint && yarn check"
  }
}
```

And run it all together

```bash
$ yarn ci
```
