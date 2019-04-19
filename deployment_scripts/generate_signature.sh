#!/bin/bash
generate_input() {
    printf "$1\n$1\n\n\n\n\n\n\nyes\n"
}

echo "`generate_input $1`" | keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
