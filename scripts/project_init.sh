#!/bin/bash

REPO_URL="git@github.com:joesbackoffice/nodejs_template.git"
TEMP_DIR=$(mktemp -d)

printf "\e[1m\e[32mnodejs project init script\e[0m\n"

git clone "$REPO_URL" "$TEMP_DIR"

shopt -s dotglob
mv "$TEMP_DIR"/* .

rm -rf .git
rm -rf "$TEMP_DIR"
