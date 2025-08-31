# react-native-sliding-panes

Compatible with modern React Native (tested with React Native 0.7x and React 18).

A simple set of React Native components that allow for views that slide in and out on command. They can be wired up to a Gesture Recognizer for swiping, or to touchable highlights for quick navigation. Here is a quick view of the example project:

![example](http://i.imgur.com/cYui5Uf.gif)

### Installation

From a terminal navigate to your project folder and type:

`npm install react-native-sliding-panes`

or add the following line to your dependencies within package.json and then `npm install`

`"react-native-sliding-panes": "^2.0.0"`

### Usage
#### SlidingPane

The SlidingPane component can be used all on its own, or with any number of other SlidingPane instances within a SlidingPaneWrapper component.

To use SlidingPane by itself be sure to import the class at the top of the file you want to use it:

`import {SlidingPane} from 'react-native-sliding-panes';`

Then within your render method put the `<SlidingPane>` tag wherever you'd like it to appear. You can pass whatever styles you like to it just like it was a normal `<View>` tag. Be sure to create a ref to it as well so that you can use the member functions to animate it. Finally, place whatever content you want within just like it was a normal `<View>`:

```
<SlidingPane style={{ flex: 1, borderColor: 'red', borderWidth: '1' }} ref={ (myPane) => this.myPane = myPane }>
  <View>
    <Text>This is myPane</Text>
  </View>
</SlidingPane>
```

To animate the component there are a number of instance methods available on the ref you created for the component. For example if you want the pane to warp to the center without animating simply type `this.myPane.warpCenter()`. If you want the pane to slide off the right side of the screen simply type `this.myPane.slideRight()`. The list of methods available are:

* `warpLeft()`
* `slideLeft()`
* `warpCenter()`
* `slideCenter()`
* `warpRight()`
* `slideRight()`

#### SlidingPaneWrapper

You can use any number of SlidingPane components within a SlidingPaneWrapper to help you with managing multiple panes. Be sure to import both the SlidingPaneWrapper and SlidingPane components from your import statement:

`import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';`

Simply put the `<SlidingPaneWrapper>` tag wherever you would like your set of sliding panes to appear. Again, you can pass the wrapper whatever styles you like just as if it were a normal `<View>` tag. You will have to also create a ref to the wrapper so that you can use the member functions to animate the child panes. Here is an abbreviated sample, see the 'Example' folder code for a working example as demonstrated in the animated GIF above:

```
<SlidingPaneWrapper style={{ flex: 1 }} ref={(slidingPaneWrapper) => { this.slidingPaneWrapper = slidingPaneWrapper }}>
  <SlidingPane ref={ (pane1) => { this.pane1 = pane1} }>
      <View><Text>Pane 1</Text></View>
  </SlidingPane>
  <SlidingPane ref={ (pane2) => { this.pane2 = pane2} }>
      <View><Text>Pane 2</Text></View>
  </SlidingPane>
  <SlidingPane ref={ (pane3) => { this.pane3 = pane3} }>
      <View><Text>Pane 3</Text></View>
  </SlidingPane>
</SlidingPaneWrapper>
```

Within the component that contains the SlidingPaneWrapper, you will need a `componentDidMount()` method that sets up the sliding pane wrapper and the panes within. Here is an example:

```
componentDidMount() {
  this.pane1.warpCenter();
  this.pane2.warpRight();
  this.pane3.warpRight();
  this.slidingPaneWrapper.childPanes = [this.pane1, this.pane2, this.pane3];
}
```

Now you can use the SlidingPaneWrapper instance methods to move between the panes. For example you can use `SlideAllLeft()` for a swipe left motion that moves all the panes to the left. Or, you can use the `setActive(index)` method to select a specific chid pane and have the animation properly reflect the positioning of the panes (i.e. If the pane you are moving to is to the right of pane you were on, you will see the old pane slide off to the left while the new one slide in from the right). The list of methods available are:

* `slideAllLeft()`
* `slideAllRight()`
* `setActive(index)`

### Example app (in this repo)

There is a simple React Native example project in the `Example` folder. To run it:

1. From the repo root:
   - `cd Example`
   - `npm install`
2. iOS: install CocoaPods
   - `cd ios`
   - If using Ruby 3.2+, set the logger workaround once in the shell:
     - `export RUBYOPT="-r logger"`
   - `pod install`
   - `cd ..`
3. Run:
   - iOS: `react-native run-ios`
   - Android: `react-native run-android`

   If Android build fails with SDK not found, create `android/local.properties` with your SDK path:

   ```properties
   sdk.dir=/Users/<your-username>/Library/Android/sdk
   ```

   Or set an env var in your shell:

   ```bash
   export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
   ```

### Try it in a fresh React Native app (modern setup)

1. Create a new app:
   - `npx react-native@latest init SlidingPanesTest`
2. Add this package:
   - Quick local install while developing this repo: `npm install /absolute/path/to/react-native-sliding-panes`
   - Or pack and install (more reliable across environments):
     - In this repo root: `npm pack` (note the generated `.tgz` file)
     - In the new app: `npm install ../path-to/react-native-sliding-panes-<version>.tgz`
3. iOS only: from the new app, run `npx pod-install`.
4. Use the components in your app:

```
import React from 'react';
import { View, Text, Button } from 'react-native';
import { SlidingPane, SlidingPaneWrapper } from 'react-native-sliding-panes';

export default function App() {
  let wrapperRef = null;
  let pane1 = null, pane2 = null, pane3 = null;

  React.useEffect(() => {
    pane1?.warpCenter();
    pane2?.warpRight();
    pane3?.warpRight();
    if (wrapperRef) {
      wrapperRef.childPanes = [pane1, pane2, pane3];
    }
  }, [wrapperRef, pane1, pane2, pane3]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <Button title="1" onPress={() => wrapperRef?.setActive(0)} />
        <Button title="2" onPress={() => wrapperRef?.setActive(1)} />
        <Button title="3" onPress={() => wrapperRef?.setActive(2)} />
      </View>
      <SlidingPaneWrapper style={{ flex: 1 }} ref={(r) => (wrapperRef = r)}>
        <SlidingPane ref={(r) => (pane1 = r)}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pane 1</Text>
          </View>
        </SlidingPane>
        <SlidingPane ref={(r) => (pane2 = r)}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pane 2</Text>
          </View>
        </SlidingPane>
        <SlidingPane ref={(r) => (pane3 = r)}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pane 3</Text>
          </View>
        </SlidingPane>
      </SlidingPaneWrapper>
    </View>
  );
}
```

5. Run:
   - iOS: `npx react-native run-ios`
   - Android: `npx react-native run-android`


