
[![Build Status](https://app.bitrise.io/app/8ba0832124e4cdf2/status.svg?token=HTfEgn2kTcAN_FI2qXEqeQ&branch=feature/refactoring)](https://app.bitrise.io/app/8ba0832124e4cdf2)
[![Coverage Status](https://coveralls.io/repos/github/ayshiff/flex-rn-client/badge.svg?branch=master)](https://coveralls.io/github/ayshiff/flex-rn-client?branch=master)
[![CircleCI](https://circleci.com/gh/ayshiff/flex-rn-client.svg?style=svg)](https://circleci.com/gh/ayshiff/flex-rn-client)
![Flex-Office](assets/Presentation.jpg?raw=true) 

Simple mobile client in React-Native for **flex-server** project

# Steps to follow

## Installing dependencies

You will need Node, Watchman, the React Native command line interface, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

### Node, Watchman

We recommend installing Node and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:
```
brew install node
brew install watchman
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

### The React Native CLI

Node comes with npm, which lets you install the React Native command line interface.

Run the following command in a Terminal:
```npm install -g react-native-cli```

### Xcode

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 9.4 or newer.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

## Configuration

Make sure you have filled your API environment files by editing the ```.env```file :
(Follow these steps to have your server working :
[flex-rn-server](https://github.com/ayshiff/flex-server)) 

`api.json`:

```
{
  "email": process.env.EMAIL,
  "password': process.env.PASSWORD,
  "token': process.env.TOKEN,
  "_id': process.env._ID
}
```

In ```.env```file, you should put your environment values.

Example for a Heroku and mLab configuration :

```
DB_URL="https://mydb.herokuapp.com/api/"
EMAIL="test@test.com"
PASSWORD="admintest"
TOKEN="molkujgdvxbcjynk,liu,jlkjhnéàç!è(§'evbfkn,kmlkjhkkjh"
_ID="oiukhfgdbcjynukykuy"
```

Be sure that your ```.env``` file is included in ```.gitignore``` file !

For `server.json`:

```
{
  "address": ""
}
```

(For android deployment use ```10.0.2.2``` for the host)

And for `regex.json`:

You also have to configure environment variables of the *flex server* project.
`CONFIG_REGEX`, `PLACE_REGEX`, `WIFI_REGEX`

## Run on a real iOS Device

1. Go to your Apple Dev Center account : declare phone UDID, App Id, Profile, Certificate
2. In Terminal, clone the project and run on the project root directory
```
yarn install
```
3. Go to ios folder and open Xcode project
```
open FlexOffice.xcodeproj
```
4. In Xcode, use dev certificate for targets (main and test)
5. Modify App Delegate implementation : 
```
FlexOfficeDelegate.m
--------------------
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  (...)
  return YES;
}

```

6. In Terminal, launch following command : 
```
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios 
```

7. Build in Xcode
8. Copy ```ios/main.jsbundle``` and paste into FlexOffice.app folder.

Ex : 
```
/Users/<user>/Library/Developer/Xcode/DerivedData/FlexOffice-cpkjlqzwsfrxcheazdsfgbnyfzbv/Build/Products/Release-iphoneos/FlexOffice.app/
```
9. Run the app in Xcode

## Running your React Native application in the Simulator

Run ```react-native run-ios``` inside your React Native project folder:
```
cd flex-rn-client
npm install
react-native run-ios
```

## Running your React Native application on a real Device

In the Apple Dev Center

. Declare your app

. Create a provisioning profile

In Xcode

. Use your provisioning profile

. Change the FlexOffice Scheme Run Build Configuration from 'Debug' to 'Release'

. In Xcode, Select File -> Project/Workspace Setting. You will see a Build System option to select the Legacy Build System as shown below

![xcode build setting](https://i.stack.imgur.com/hdaJu.png)


. Clear your project and "Derived Data" Build 

. In Terminal, got to ```ios``` subfolder and run :

```node /<YOUR_FOLDER>/flex-rn-client/node_modules/react-native/local-cli/cli.js bundle --entry-file index.js --platform ios --dev false --reset-cache --bundle-output main.jsbundle --assets-dest /```

. Then copy ```ios/main.jsbundle``` file to :
```/Users/<USERNAME>/Library/Developer/Xcode/DerivedData/FlexOffice-XXX/Build/Products/Release-iphoneos/FlexOffice.app/```

. Run your project :

You should see a new Terminal window appear for Metro Bundler.

## Generating Signed APK

For Android deployment: 

See the **[current doc](https://facebook.github.io/react-native/docs/signed-apk-android)**

Note: the current version of `react-native` is not patched and you need to add :

```
classpath 'com.android.tools.build:gradle:3.0.0'
distributionUrl=https://services.gradle.org/distributions/gradle-4.1-all.zip
android.enableAapt2=false
```

It will fix the issue with `uncompiled PNG file passed as argument. Must be compiled first into .flat file.. error`.

Inside `gradle.properties`. 
(This is a temporaly fix and it will be fixed in the most recents versions of react-native !)


# ScreenShots

![Flex-Office](assets/flexoffice.png?raw=true)

# Project Structure

```
.
├── App.js
├── Components
│   ├── Leave
│   │   ├── LeaveScreen.js
│   │   ├── LeaveScreenStyles.js
│   │   ├── LeaveScreenType.js
│   │   └── components
│   │       └── LeaveButton.js
│   ├── Login
│   │   ├── LoginScreen.js
│   │   ├── LoginScreenStyles.js
│   │   ├── LoginScreenType.js
│   │   └── components
│   │       ├── InputLogin.js
│   │       └── LoginButton.js
│   ├── Profile
│   │   ├── Places
│   │   │   ├── PlacesScreen.js
│   │   │   └── components
│   │   │       ├── FetchPlacesButton.js
│   │   │       ├── ZoneCard.js
│   │   │       └── styles
│   │   │           └── FetchPlacesButtonStyle.js
│   │   ├── ProfileScreen.js
│   │   ├── ProfileScreenStyles.js
│   │   ├── Users
│   │   │   ├── UsersScreen.js
│   │   │   └── components
│   │   │       ├── FindPlacesCard.js
│   │   │       ├── ListPlaces.js
│   │   │       └── styles
│   │   │           └── FindPlacesCardStyle.js
│   │   ├── animation.json
│   │   └── components
│   │       ├── HeaderCard.js
│   │       ├── ManualInsertionCard.js
│   │       ├── QRCodeCard.js
│   │       ├── QRCodeComponent.js
│   │       └── styles
│   │           ├── HeaderCardStyle.js
│   │           ├── ManualInsertionCardStyle.js
│   │           └── QRCodeCardStyle.js
│   └── Settings
│       ├── SettingsScreen.js
│       ├── SettingsScreenStyles.js
│       └── components
│           ├── DeconnectionButton.js
│           └── styles
│               └── DeconnectionButtonStyle.js
├── Navigation
│   ├── NavigationApp.js
│   └── components
│       ├── ProfileImage.js
│       └── reducer.js
├── README.md
├── __tests__
├── utils
│   ├── LocationNotice.js
│   ├── OfflineNotice.js
│   ├── services
│   │   ├── index.js
│   │   └── pushNotification.js
│   └── utils.js
├── android
├── app.json
├── config
│   ├── api.json
│   ├── regex.json
│   └── server.json
├── index.js
├── ios
├── package-lock.json
├── package.json
├── views
│   ├── Leave
│   │   ├── LeaveScreen.js
│   │   ├── LeaveScreenStyles.js
│   │   └── LeaveScreenType.js
│   ├── Login
│   │   ├── LoginScreen.js
│   │   ├── LoginScreenStyles.js
│   │   └── LoginScreenType.js
│   ├── Places
│   │   └── PlacesScreen.js
│   ├── Profile
│   │   ├── ProfileScreen.js
│   │   └── ProfileScreenStyles.js
│   ├── Settings
│   │   ├── SettingsScreen.js
│   │   └── SettingsScreenStyles.js
│   └── Users
│       └── UsersScreen.js
└── yarn.lock
```

# List of commands

- start: 

```node node_modules/react-native/local-cli/cli.js start```

- test: 

```jest```

- lint: 

```eslint Components```

- pretty: 

```prettier --semi false --print-width 100 --single-quote--trailing-comma all --write \"Components/\*_/_.js\"```

- flow: 

```flow```

- lint:fix: 

```eslint Components/ --fix```

The project uses [Flow](https://flow.org/) for type checking. Feel free to increase the type checking coverage by adding some tests 👍.

The project also use [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/). You can see lint warnings / errors by running    
`npm run lint`.


# Current State

| Screen components | State                                                                | Props      | API routes         | Flow support |
| ------------------ | -------------------------------------------------------------------- | ---------- | ------------------ | ------------ |
| Home               |                                                                      | navigation |                    | [x]           |
| Login              | `name:string ,fname:string, id: string, place: string, search: Array<object>, debug: Array<any>, historical: Array<object>` | navigation | /login_user        | [x]           |
| Profile            | `name:string ,fname:string, id: string, place: string, search: Array<object>, debug: Array<any>, historical: Array<object>` | navigation | GET /places POST / | [x]           |
| Scan               | `name:string ,fname:string, id: string, place: string, search: Array<object>, debug: Array<any>, historical: Array<object>` | navigation | GET /places        | []           |
| Leave              | `name:string ,fname:string, id: string, place: string, search: Array<object>, debug: Array<any>, historical: Array<object>` | navigation | POST /             | [x]           |


# TROUBLESHOOTINGS
1. iOS : When running from Xcode, the app crashes just after the launchscreen

```
"undefined is not an object(evaluating 'RNFSFileTypeRegular')"
```

RESOLUTION : 
Run this command on project root in Terminal :
```
$ react-native link react-native
```

2. iOS : When building in Xcode, Metro bundler failed :
```
"Cannot find module './assets/empty-module.js"
```

RESOLUTION : cf. https://github.com/yarnpkg/yarn/issues/2206 : you may check whether your .yarnclean containing a line assets. If yes, delete that line and do ```rm -rf node_modules && yarn``` to see if this fixes your issue. This helped me.