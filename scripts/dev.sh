#!/bin/bash

# Load nvm and use correct Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node.js version from .nvmrc
nvm use

# Run the command passed as arguments
exec "$@"
