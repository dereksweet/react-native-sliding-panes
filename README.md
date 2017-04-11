# react-native-sliding-panes

A simple set of React Native components that allow for views that slide in and out on command. They can be wired up to a Gesture Recognizer for swiping, or to touchable highlights for quick navigation. Here is a quick view of the example project:

![example](http://i.imgur.com/cYui5Uf.gif)

### Installation

From a terminal navigate to your project folder and type: 

`npm install react-native-sliding-panes --save`

or add the following line to your dependencies within package.json and then `npm install`

`"react-native-sliding-panes": "1.0.3"`

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
      <View><Text>Pane 1</Text</View>
  </SlidingPane>
  <SlidingPane ref={ (pane2) => { this.pane2 = pane2} }>
      <View><Text>Pane 2</Text</View>
  </SlidingPane>
  <SlidingPane ref={ (pane3) => { this.pane3 = pane3} }>
      <View><Text>Pane 3</Text</View>
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

### Example Code

There is an simple React Native example project available within the 'Example' folder. If you want to run the example project and see the components in action simply check out the files, navigate to the 'Example' folder in a terminal, type `npm install` to install all the dependent modules, then type `react-native run-ios` or `react-native run-android` to see the example in action.
