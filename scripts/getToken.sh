#!/bin/bash

# Usage :
#   ./scripts/getToken.sh -a   → admin@ecoride.io
#   ./scripts/getToken.sh -u   → charlie@ecoride.io
#   ./scripts/getToken.sh      → user@ecoride.io

API_URL="http://localhost:5000/api/auth/login"

case "$1" in
  -a)
      EMAIL="admin@ecoride.io"
          PASSWORD="admin1234"
              ;;
                -u)
                    EMAIL="charlie@ecoride.io"
                        PASSWORD="charlie1234"
                            ;;
                              *)
                                  EMAIL="user@ecoride.io"
                                      PASSWORD="user1234"
                                          ;;
                                          esac

                                          echo "🔐 Getting token for $EMAIL ..."
                                          curl -s -X POST $API_URL \
                                            -H "Content-Type: application/json" \
                                              -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
                                                | jq -r '.token'
                                                
