# Simon Says

## overview

Recreated the memory game, Simon Says, while playing with React Native. Their latest verions seems to include [react-native-web](https://github.com/necolas/react-native-web), which essentially is a wrapper creating React DOM for the web. I thought this is very cool idea becuase that means we write our code once, and there will be native versions for iOS, Android, and Web.



## Build

Install dependencies:

**npm install** or **yarn**

Use the commands:

**npm start** or **npm run web** to run on the web.

If you have the iOS simulator / android emulator:

**npm run ios** or **npm run android**

Alternatively, I've used [expo ](https://expo.io/) to test without the need for the iOS/Android SDK,
but you would need a physical apple/android device, and to download the [Expo app](https://expo.io/tools), then scan the QR code.

**expo start --ios --android**


## Bugs / Todos

* Haven't tested for iPhones, but for Androids, did notice the attempt for nested pointevents in the views isn't working correctly.
* Also the Web component isn't very responsive to smaller devices (such as iPhone 5, Galaxy S5, iPhone non-Plus). Since there's no direct media queries, we could use [react-native-css-media-query-processor](https://github.com/kristerkari/react-native-css-media-query-processor) to create responsive styling. I'ved also used absolute positioning to the window, which I don't think is ideal and can be improved.
* The UI could also use some polishing.
* I started with [Stylesheets.create](https://reactnative.dev/docs/stylesheet) but ended with inline styling becuase it was faster. Ideally, I would like to refactor more of the inline styling to Stylesheets.
* I wrote everything under one view, but I think this could be refactored and split into multiple components, and use [redux](https://redux.js.org/) for the deterministic state management. Redux isn't something I've used yet, so wasn't sure of the learning curve here.

## Challenges

React Native is definitely growing, but there was some limitations I encountered for example the [Modals](https://reactnative.dev/docs/modal) aren't supported for the Web at the moment. There are some open source community projects that I could've used but none out of the box. I ended up just creating my own version by doing a view overlay with a faded backgrounded.
