# react-native-sliding-panes

A simple set of React Native components that allow for views that slide in and out on command. They can be wired up to a Gesture Recognizer for swiping, or to touchable highlights for quick navigation. Here is a quick view of the example 

![example](http://i.imgur.com/cYui5Uf.gif)

### Installation

From a terminal navigate to your project folder and type: 

`npm install react-native-sliding-panes --save`

or add the following line to your dependencies within package.json and then `npm install`

`"react-native-sliding-panes": "1.0.1"`

### Usage
#### SlidingPane

The SlidingPane component can be used all on its own, or with a group of other SlidingPane instances within a SlidingPaneWrapper component. 

To use SlidingPane by itself then be sure to import the class at the top of the file you want to use it: 

`import {SlidingPane} from 'react-native-sliding-panes';`

Then within your code put the `<SlidingPane>` tag wherever you'd like it to appear. You can pass whatever styles you like to it just like it was a normal `<View>` tag. Be sure to create a ref to it as well so that you can use the member functions to animate it. Finally, place whatever content you want within just like it was a normal `<View>`:

```
<SlidingPane style={{ flex: 1, borderColor: 'red', borderWidth: '1' }} ref={ (myPane) => this.myPane = myPane }>
  <View>
    <Text>This is myPane</Text>
  </View>
</SlidingPane>
```

To animate the component there are a number of instance methods available on the ref you createed for the component. For example if you want the pane to warp to the center simply type `this.myPane.warpCenter()`. If you want the pane to slide off the right side of the screen simply type `this.myPane.slideRight()`. The list of methods available are:

* `warpLeft()`
* `slideLeft()`
* `warpCenter()`
* `slideCenter()`
* `warpRight()`
* `slideRight()`

#### SlidingPaneWrapper

You can use the SlidingPane components within a SlidingPaneWrapper to help you with managing multiple panes. 

Just a very basic README for now. Will type up a much more detailed one soon. If you want to run the example project
simply check out the files, navigate to the 'Example' folder in Terminal, type `npm install` to install all the dependent
modules, then type `react-native run-ios` or `react-native run-android` to see the example in action. 
