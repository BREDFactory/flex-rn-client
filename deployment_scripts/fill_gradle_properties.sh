echo "MYAPP_RELEASE_STORE_FILE=my-release-key.keystore" >> ../gradle.properties
echo "MYAPP_RELEASE_KEY_ALIAS=my-key-alias" >> ../gradle.properties
echo "MYAPP_RELEASE_STORE_PASSWORD=$1" >> ../gradle.properties
echo "MYAPP_RELEASE_KEY_PASSWORD=$1" >> ../gradle.properties
echo "android.enableAapt2=false" >> ../gradle.properties