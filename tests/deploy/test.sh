#!/usr/bin/env bash

testDir="$(dirname "${BASH_SOURCE[0]}")"

act \
--secret-file "secrets.env" \
--workflows ".github/workflows/discord.yml" \
--container-architecture "linux/amd64" \
--eventpath "$testDir/test.json"
