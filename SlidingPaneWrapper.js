import React, { Component } from 'react';
import { View } from 'react-native';

export default class SlidingPaneWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.activePane = this.props.activePane || 0;
  }

  slideAllLeft() {
    if (this.activePane != (this.childPanes.length - 1)) {
      this.childPanes[this.activePane].slideLeft();
      this.childPanes[this.activePane + 1].slideCenter();
      this.activePane = this.activePane + 1;
    }
  }

  slideAllRight() {
    if (this.activePane != 0) {
      this.childPanes[this.activePane].slideRight();
      this.childPanes[this.activePane - 1].slideCenter();
      this.activePane = this.activePane - 1;
    }
  }

  setActive(index) {
    if (index != this.activePane) {
      if (index < this.activePane) {
        this.childPanes[this.activePane].slideRight();
        this.childPanes[index].slideCenter();
      } else if (index > this.activePane) {
        this.childPanes[this.activePane].slideLeft();
        this.childPanes[index].slideCenter();
      }

      for (let i = 0; i < index; i++){
        if (i != this.activePane){
          this.childPanes[i].warpLeft();
        }
      }

      for (let i = index + 1; i < (this.childPanes.length - 1); i++) {
        if (i != this.activePane){
          this.childPanes[i].warpRight();
        }
      }

      this.activePane = index;
    }
  }

  render() {
    return (
      <View
        style={[...this.props.style, { flex: 1 }]}>
        {this.props.children.map((Child) => {
          return Child
        })}
      </View>
    );
  }
}
