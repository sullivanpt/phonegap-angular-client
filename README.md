# phonegap-angular-client
[![Build Status](https://travis-ci.org/sullivanpt/phonegap-angular-client.png?branch=master)](https://travis-ci.org/sullivanpt/phonegap-angular-client)

Building out an Android App based on these
instructions http://lucaspaulger.com/javascript/2013/09/25/Mobile-apps-Phonegap-Yeoman/.
Using AngularJS and Yeoman generator-angular.

Goal is to create a OAuth2.0 client to use against the mean-sso project.

## Get started

** Requirements (as tested on Win 7/8.1 x64) **
* Android SDK Tools r22.3 (requires Java JDK 7); add 'tools' and 'platform-tools' to your path.
* Ant v1.9.3; add 'bin' to your path.
* (optional) Chrome v32.0.1700.102 for karma unit testing
* (optional) msysgit v1.8.5.2 for bash shell (and version control)
* Node.js v0.10.25
* npm install -g yo generator-angular

** One time setup **
* git clone git@github.com:sullivanpt/phonegap-angular-client.git
* cd phonegap-angular-client
* npm install
* bower install
* ./node_modules/.bin/phonegap plugin add <item> # for each required plugin listed in the ./phonegap.json file
* grunt

** Development scenarios **
* Use any of the generator-angular commands, with the following modifications:
* grunt -- Build the device for android
* grunt serve -- Test the app off the device (device features should gracefully fail).
* ./node_modules/.bin/phonegap run android -- Test the app on android (hint: 'adb logcat' is your friend).

Hint: If your android plugin or build dependencies get messed up you can delete the ./plugins/android.json file
and the ./platforms/android folder, then rebuild.

## TODO

* Build 'generator-angular-phonegap' based on the generator-angular-fullstack proxy.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
