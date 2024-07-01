#!/bin/bash

export NODE_OPTIONS="--import ./register-hooks.js --no-deprecation"

SERVER_MODE=false
CLIENT_MODE=false

while getopts "sc" opt; do
	case ${opt} in
	s)
		SERVER_MODE=true
		;;
	c)
		CLIENT_MODE=true
		;;
	\?)
		echo "Usage: $0 [-c client] [-s server]"
		exit 1
		;;
	esac
done

if [ "$SERVER_MODE" = true ]; then
	npx nodemon --watch "src/**/*.ts" --exec "ts-node" ./src/server/index.ts
fi

if [ "$CLIENT_MODE" = true ]; then
	npx webpack serve --config ./webpack/webpack.dev.config.ts
fi

if [ "$SERVER_MODE" = false ] && [ "$CLIENT_MODE" = false ]; then
	echo "Usage: $0 [-c client] [-s server]"
	exit 1
fi
