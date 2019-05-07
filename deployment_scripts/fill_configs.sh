#!/bin/bash
printf "
{
	\"email\": \"$API_EMAIL\",
	\"password\": \"$API_PASSWORD\",
	\"token\": \"$API_TOKEN\",
	\"_id\": \"$API_ID\"
}
" > "$1/api.json"
printf "
{
	\"idRegex\": \"$REGEX_ID\",
	\"placeRegex\": \"$REGEX_PLACE\"
}
" > "$1/regex.json"
printf "
{
	\"address\": \"$SERVER_ADDRESS\",
	\"sockets\": \"$SERVER_SOCKETS\"
}
" > "$1/server.json"
printf "$PLACES_CONFIG" > "$1/places.json"