# phonegap-angular-client
[![Build Status](https://travis-ci.org/sullivanpt/phonegap-angular-client.png?branch=master)](https://travis-ci.org/sullivanpt/phonegap-angular-client)

Building out an Android App based on these
instructions http://lucaspaulger.com/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/.
Using AngularJS and Yeoman generator-angular.

Goal is to create a OAuth2.0 client to use against the mean-sso project.

## Get started

* install android SDK and add SDK's 'tools' and 'platform-tools' to your path.
* npm install -g yo generator-angular phonegap
* git@github.com:sullivanpt/phonegap-angular-client.git
* npm install
* bower install
* phonegap plugin add <item> # for each required plugin listed in the ./phonegap.json file

## Develop

* grunt -- Build the device for android
* grunt serve -- Test the app off the device (device features should gracefully fail).
* phonegap run android -- Test the app on android (hint: 'adb logcat' is your friend).

Hint: If your android plugin or build dependencies get messed up you can delete the ./plugins/android.json file
and the ./platforms/android folder, then rebuild.

## TODO

* Implement authentication against meanSso prototype at http://intense-brushlands-5559.herokuapp.com/.
* Build 'generator-angular-phonegap' based on the generator-angular-fullstack proxy.
