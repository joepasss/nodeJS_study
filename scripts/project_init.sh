#!/bin/bash

TEMP_DIR=$(mktemp -d)

function node_project_init() {
  local repo_url="git@github.com:joesbackoffice/nodejs_template.git"
  printf "\e[1m\e[32mnodejs project init script\e[0m\n"

  git clone "$repo_url" "$TEMP_DIR"

  shopt -s dotglob
  mv "$TEMP_DIR"/* .

  rm -rf .git
  rm -rf "$TEMP_DIR"
}

function webpack_project_init() {
  local repo_url="git@github.com:joesbackoffice/webpack_template.git"
  printf "\e[1m\e[32mwebpack project init script\e[0m\n"

  git clone "$repo_url" "$TEMP_DIR"

  shopt -s dotglob
  mv "$TEMP_DIR"/* .

  rm -rf .git
  rm -rf "$TEMP_DIR"
}

while getopts "nw" opt; do
  case $opt in
  n)
    node_project_init
    ;;
  w)
    webpack_project_init
    ;;
  \?)
    printf "\e[4m\e[31mERROR!\e[0m\e[1m\e[33m Invalid option: -$OPTARG" >$2
    exit 1
    ;;
  esac
done

if [ $OPTIND -eq 1 ]; then
  printf "\e[4m\e[31mUSAGE:\e[0m\e[1m\e[33m -n (for nodejs project) -w (for webpack project)"
  exit 1
fi
