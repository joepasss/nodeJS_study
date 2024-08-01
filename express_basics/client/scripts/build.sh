#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js --no-deprecation"
npx webpack --config ./webpack/webpack.prod.config.ts
node ./server/index.ts
