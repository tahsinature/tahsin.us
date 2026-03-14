#!/bin/bash

# Load Doppler secrets and create .env file
# Checks for DOPPLER_TOKEN or DOPPLER_TOKEN_MY_PERSONAL environment variable

rootDir="$(dirname "$0")/../"

# check if DOPPLER_TOKEN is set, if not, check DOPPLER_TOKEN_MY_PERSONAL
if [ -z "$DOPPLER_TOKEN" ]; then
  if [ -z "$DOPPLER_TOKEN_MY_PERSONAL" ]; then
    echo "Neither DOPPLER_TOKEN nor DOPPLER_TOKEN_MY_PERSONAL is set"
    exit 1
  else
    export DOPPLER_TOKEN="$DOPPLER_TOKEN_MY_PERSONAL"
    echo "Using DOPPLER_TOKEN_MY_PERSONAL"
  fi
else
  echo "DOPPLER_TOKEN is set"
fi

# navigate to the root directory
cd "$rootDir" || exit

# verify doppler is installed
if ! command -v doppler &> /dev/null; then
  echo "doppler CLI not found. Install it first."
  exit 1
fi

# pull secrets from Doppler
doppler secrets -p tahsin-us -c prd download --no-file --format env > .env || { echo "Failed to pull secrets"; exit 1; }
echo "Secrets pulled successfully"
