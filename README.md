# WeekMenu

> GOALS

* testing Qasar
* (re)learn firebase
* deploy on Android and iOS

> USE
* create a simple app to organise the menu of the week
* share it with other

> WHERE ARE WE
* first debug apk generated
* getting the week menu is possible
* update daymenu available
* delete input field is available
* add input field is available

> MAJOR BUGS
* to save change in an update meal the user have to click outside of the field before clicking in the SAVE button
* if all the inputs of a daily menu is deleted the database will lose his menu field, that crash the render of the weekmenu

> MINOR BUGS
* manage the keyboard of the phone

> TO DO
* add token authentication to secure the database
* add nice effects on input delete and add
* add the reset function to delete the week menu when the week is over
* maybe rething the database model

![VISUEL](https://github.com/oliviapycz/WeekMenu/raw/master/maquette.png)

> DEPLOY ON DEBUG MODE
* in the root directory
```
quasar build -m cordova -T android
```
* in the src-cordova folder that was generated
```
cordova build
```
* the debug apk is generated in :
```
cd platforms/android/app/build/outputs/apk/debug
```