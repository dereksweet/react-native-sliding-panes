import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

export default class SlidingPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: new Animated.Value(0)
    };
  }
  warpLeft() {
    var {width} = Dimensions.get('window');

    this.state.translateX.setValue(-width);
  }
  slideLeft() {
    var {width} = Dimensions.get('window');

    Animated.spring(
      this.state.translateX,
      {toValue: -width, useNativeDriver: true}
    ).start();
  }
  warpCenter() {
    this.state.translateX.setValue(0);
  }
  slideCenter() {
    Animated.spring(
      this.state.translateX,
      {toValue: 0, useNativeDriver: true}
    ).start();
  }
  slideRight() {
    var {width} = Dimensions.get('window');

    Animated.spring(
      this.state.translateX,
      {toValue: width, useNativeDriver: true}
    ).start();
  }
  warpRight() {
    var {width} = Dimensions.get('window');

    this.state.translateX.setValue(width);
  }
  render() {
    return (
      <Animated.View
        style={[this.props.style, styles.pane, { transform: [{ translateX: this.state.translateX }] }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  pane: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
