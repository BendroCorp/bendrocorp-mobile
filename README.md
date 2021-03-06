# BENDROCORP MOBILE
The BendroCorp mobile applications repository. Currently we use Ionic Framework for our mobile applications.

## INSTALLATION
1. Clone the repo
2. cd && npm i
3. ionic serve
4. Fiddle on :smile:

## APP TESTING
To use in a simulator you have to create a more full fledged native build of the Cordova application. Most of the steps here are primarily for reference. Only certain team members have the credentials and ability to make app store releases.

#### iOS
https://ionicframework.com/docs/publishing/app-store

```
ionic cordova platform add ios
ionic cordova build ios --prod --verbose
```

From here, open the `.xcworkspace` file in `./platforms/ios/` to start Xcode.

Once open, ensure that the correct certificate is selected, then select `Archive` from the `Product > Archive` menu.

#### Android
https://ionicframework.com/docs/publishing/play-store

Ensure v1.8 of the JDK is installed
Ensure that JAVA_HOME is populated
```
export JAVA_HOME=`/usr/libexec/java_home -v 1.8`
```
Build for production release
```
```
ionic cordova platform add android
```
Ensure that the Google Services JSON is copied over to `platforms/android/app` (this file is not publically available)
```
cp ~/google-services.json ./platforms/android
```
```
ionic cordova build android --prod --release
```
This will produce an unsigned .apk which must be signed. For reference only, if these credentials did not exist you would produce them with the following command:
```
keytool -genkey -v -keystore bendrocorp-android-release-key.keystore -alias bendrocorp -keyalg RSA -keysize 2048 -validity 10000
```
(But in reality these credentials are safely stored for when we make releases)

Creating the signed release .apk by running the jarsigner tool which is also included in the Android SDK:
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./bendrocorp-android-release-key.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk bendrocorp
```
Finally, the zip align tool must be ran to optimize the APK. The `zipalign` tool can be found in `/path/to/Android/sdk/build-tools/VERSION/zipalign`. For example, on macOS with Android Studio installed, `zipalign` is in `~/Library/Android/sdk/build-tools/VERSION/zipalign`
```
~/Library/Android/sdk/build-tools/29.0.2/zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk bendrocorp.apk
```
## CONTRIBUTING
Due to the nature of the mobile application world we generally do not allow non-staff pull requests for the mobile application. This may change in the future. The intention is that over time the mobile applications will have parity with the web application.