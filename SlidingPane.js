import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';

export default class SlidingPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftAnim: new Animated.Value(0)
    };
  }
  warpLeft() {
    var {width} = Dimensions.get('window');

    this.setState({leftAnim: new Animated.Value(-width)});
  }
  slideLeft() {
    var {width} = Dimensions.get('window');

    Animated.spring(
      this.state.leftAnim,
      {toValue: -width}
    ).start();
  }
  warpCenter() {
    this.setState({leftAnim: new Animated.Value(0)});
  }
  slideCenter() {
    Animated.spring(
      this.state.leftAnim,
      {toValue: 0}
    ).start();
  }
  slideRight() {
    var {width} = Dimensions.get('window');

    Animated.spring(
      this.state.leftAnim,
      {toValue: width}
    ).start();
  }
  warpRight() {
    var {width} = Dimensions.get('window');

    this.setState({leftAnim: new Animated.Value(width)});
  }
  render() {
    return (
      <Animated.View
        style={[...this.props.style, { position: 'absolute', width: '100%', height: '100%', left: this.state.leftAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
