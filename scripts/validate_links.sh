#!/usr/bin/env bash

JSON_FILE="public/data/artworkData.json"
echo "JSON_FILE: $JSON_FILE"

# Extract and clean links from JSON, removing unwanted characters
if ! mapfile -t LINKS < <(jq -r '.[] | select(.src != null) | .src' "$JSON_FILE" | sed 's/[][]//g'); then
  echo "Error: Failed to parse JSON."
  exit 1
fi

# Remove empty lines
LINKS=("${LINKS[@]/#/}")  

# Check if any links were extracted
if [ ${#LINKS[@]} -eq 0 ]; then
  echo "No links found in the JSON file."
  exit 1
fi

echo "Found ${#LINKS[@]} valid links."

# Function to check link status with retries
check_link() {
  LINK=$(echo $LINK | sed 's/^"//;s/"$//')

  echo "Processing: $LINK"
  
  # Perform request with curl and check HTTP status
  local HTTP_STATUS
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$LINK")

  if [[ $HTTP_STATUS -eq 000 ]]; then
    echo "Error: $LINK returned HTTP 000 (possible network or SSL issue)"
    return 1
  elif [[ $HTTP_STATUS -ne 200 ]]; then
    echo "Warning: $LINK returned HTTP $HTTP_STATUS"
    return 1
  else
    echo "Valid: $LINK returned HTTP 200"
    return 0
  fi
}

# Track non-200 links
declare -a FAILED_LINKS

# Check each link
for LINK in "${LINKS[@]}"; do
  check_link "$LINK" || FAILED_LINKS+=("$LINK")
done

# Summary
if [ ${#FAILED_LINKS[@]} -ne 0 ]; then
  echo "Some links returned errors:"
  printf "%s\n" "${FAILED_LINKS[@]}"
  exit 1
else
  echo "All links returned HTTP 200"
  exit 0
fi
