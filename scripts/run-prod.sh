#!/bin/bash

rootDir="$(dirname "$0")/../"

# Load Doppler secrets
"$rootDir/scripts/load-doppler-secrets.sh" || exit 1

# navigate to the root directory
cd "$rootDir" || exit

bun run server/index.ts
