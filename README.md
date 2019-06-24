# Twitch API Demo

### Description

This app searches for active live streams on Twitch based in an input query.

#### Features

- Uses the new Twitch API (helix) - You can get your client ID [here](https://dev.twitch.tv/console/apps).
- Uses `fetch` and polyfills with `whatwg-fetch` for unsupported browsers.
- Supports prefetch of previous and next pages of results.

Built with HTML, CSS, and JavaScript.

### How to run

This app uses Parcel to bundle the code. It's included as a dependency for the project.

1. Clone this repo

2. Run `npm install` or `yarn` to install the dependencies.

3. Run `npm start` or `yarn start` to start the development server.

4. Open `http://localhost:1234` in your browser.

### How to create a production build

1. Run `npm run build` or `yarn build`.

The output is configured to be in the `docs` folder to be used with GitHub pages. You can change this by either updating the `build` npm script inside the `package.json` file or by running `parcel build index.html -d "your-output-path"` in your terminal.

#### Features:

- Supports ES6 for development. Parcel will transpile the code automatically at dev and build time.
