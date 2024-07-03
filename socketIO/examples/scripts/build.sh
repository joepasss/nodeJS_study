#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js --no-deprecation"
npx tsc --project ./src/server/tsconfig.json
npx webpack --config ./webpack/webpack.prod.config.ts
