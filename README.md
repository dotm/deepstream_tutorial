# Setup Guide

- run `npm install` if you haven't
- Install deepstream server (open source version)
- Run in terminal: `deepstream start`
- When you run the deepstream server find the line that specifies the socket endpoint
  - `INFO | Listening for websocket connections on 0.0.0.0:6020/deepstream`
- Copy the socket endpoint into the deepstream's client initialization process (in App.js)
  - `import createDeepstream from 'deepstream.io-client-js';`
  - `this.ds = createDeepstream('0.0.0.0:6020/deepstream');`
- Run the client server (React server): `npm run start`
- Open the client server in a browser
  - Default client server for create-react-app is http://localhost:3000/