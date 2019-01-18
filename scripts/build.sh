#!/bin/bash
#------------------------------------------------ I N I T 
# Install Xcode build tool
xcode-select --install;

# Install node & watchman if not present
brew list node || brew install node;
brew list watchman || brew install watchman;

# Install React-Native CLI
npm install -g react-native-cli;

# Install FlexOffice client dependencies
yarn install;

# use system rvm
source ~/.rvm/scripts/rvm
rvm use system;
#------------------------------------------------ E N V. V A R S

FLEX_PROJECT_PATH=$(echo $(cd .. ; pwd))
echo "FLEX_PROJECT_PATH : $FLEX_PROJECT_PATH"

if [ -e $FLEX_PROJECT_PATH/archive ]
then
    rm -rf $FLEX_PROJECT_PATH/archive
fi

mkdir $FLEX_PROJECT_PATH/archive
echo "FOLDER archive created"

cd $FLEX_PROJECT_PATH/ios

export CERT_NAME=$(security find-identity -v -p codesigning | grep -o '".*"' | sed 's/"//g' | grep  "Distribution");

export PRODUCT_BUNDLE_IDENTIFIER=$(xcodebuild -showBuildSettings | grep "PRODUCT_BUNDLE_IDENTIFIER" | awk '{print $3}')

export PRODUCT_TARGET_NAME=$(xcodebuild -showBuildSettings | grep "TARGETNAME" | awk '{print $3}')

#------------------------------------------------ G E T    P R O V I S I O N I N G    P R O F I L E    N A M E

PROV_PROFILE_FILE_CONTENT=$FLEX_PROJECT_PATH/input.xml
PEM_FILE=$FLEX_PROJECT_PATH/file.pem

CERT_XPATH="string(plist/dict/key[text() = 'DeveloperCertificates']/following-sibling::array[1]/data)"
PROV_PROFILE_NAME="string(plist/dict/key[text() = 'Name']/following-sibling::string)"
PROV_PROFILE_NAME_TARGET=""
APP_ID_NAME="string(plist/dict/key[text() = 'AppIDName']/following-sibling::string)"
APP_ID_NAME_TARGET=""
CERT_HEADER="-----BEGIN CERTIFICATE-----"
CERT_FOOTER="-----END CERTIFICATE-----"
PLATFORM_TYPE="Distribution"
CERT_SUBJECT=""
PROV_PROFILE_NAME_FINAL="TMP"
PLIST_FILE_PATH=$FLEX_PROJECT_PATH/config/Info-AdHoc.plist

cd ~/Library/MobileDevice/Provisioning\ Profiles;

if [ -e $PEM_FILE ]
then
    rm $PEM_FILE
fi

if [ -e $PROV_PROFILE_FILE_CONTENT ]
then
    rm $PROV_PROFILE_FILE_CONTENT
fi

echo "GET PROVISIONING PROFILE NAME FOR APP"

while read -d $'\0' file; 
do 
    security cms -D -i $file > $PROV_PROFILE_FILE_CONTENT &&
    echo $CERT_HEADER > $PEM_FILE  &&
    echo $(xmllint --xpath "$CERT_XPATH" $PROV_PROFILE_FILE_CONTENT) >> $PEM_FILE &&
    echo $CERT_FOOTER >> $PEM_FILE &&
    APP_ID_NAME_TARGET=$(xmllint --xpath "$APP_ID_NAME" $PROV_PROFILE_FILE_CONTENT) &&
    PROV_PROFILE_NAME_TARGET=$(xmllint --xpath "$PROV_PROFILE_NAME" $PROV_PROFILE_FILE_CONTENT) &&
    CERT_SUBJECT=$(openssl x509 -subject -in $PEM_FILE -noout) &&

    if [[ ("$APP_ID_NAME_TARGET" = "$PRODUCT_TARGET_NAME") && ($CERT_SUBJECT =~ $PLATFORM_TYPE) ]]; then
        PROV_PROFILE_NAME_FINAL=$PROV_PROFILE_NAME_TARGET
    fi
done < <(find . -print0) 
# "< <(find . -print0)"" : add this allows variables in loop to be accessible (not in sub-shell)
# cf.https://stackoverflow.com/questions/16854280/a-variable-modified-inside-a-while-loop-is-not-remembered


if [ -e $PLIST_FILE_PATH ]
then
	rm $PLIST_FILE_PATH
fi

cp $FLEX_PROJECT_PATH/config/Info-Template.plist $PLIST_FILE_PATH

sed -i -e "s/PRODUCT_BUNDLE_IDENTIFIER/$PRODUCT_BUNDLE_IDENTIFIER/g" $PLIST_FILE_PATH
sed -i -e "s/PROV_PROFILE_NAME/$PROV_PROFILE_NAME_FINAL/g" $PLIST_FILE_PATH

cd $FLEX_PROJECT_PATH/ios;

# REMOVE OLD Archives and IPA

if [ -e $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.xcarchive ] 
then
	rm -rf $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.xcarchive
fi

if [ -e $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.ipa ] 
then
	rm -rf $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.ipa
fi

# Create the Archive and use Xcode build legacy system
xcodebuild -project $PRODUCT_TARGET_NAME.xcodeproj \
              	-scheme $PRODUCT_TARGET_NAME \
              	-destination generic/platform=iOS build \
              	-sdk iphoneos \
              	-configuration $PRODUCT_TARGET_NAME \
              	archive -archivePath $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.xcarchive \
		        -UseModernBuildSystem=NO;

# Create the .ipa and use Xcode build legacy system
xcodebuild -exportArchive -archivePath $FLEX_PROJECT_PATH/archive/$PRODUCT_TARGET_NAME.xcarchive -exportPath $FLEX_PROJECT_PATH/archive -exportOptionsPlist $PLIST_FILE_PATH -UseModernBuildSystem=NO;

# NEXT -> DEPLOY TO STORE

# CLEAN
if [ -e $PEM_FILE ]
then
    rm $PEM_FILE
fi

if [ -e $PROV_PROFILE_FILE_CONTENT ]
then
    rm $PROV_PROFILE_FILE_CONTENT
fi