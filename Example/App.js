import React, { Component } from 'react';
import {View, Text, TouchableHighlight, Platform} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {SlidingPane, SlidingPaneWrapper} from 'react-native-sliding-panes';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8ECC2'
  },
  navBarBuffer: {
    height: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFFFFF'
  },
  navBar: {
    height: 40,
    backgroundColor: '#EEEEFF',
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    flexDirection: 'row'
  },
  navLink: {
    flex: 1,
    alignItems: 'center'
  },
  navLinkText: {
    paddingTop: 10,
    paddingBottom: 10
  },
  paneText: {
    fontSize: 22
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setupSlidingPanes();
  }

  setupSlidingPanes() {
    this.pane1.warpCenter();
    this.pane2.warpRight();
    this.pane3.warpRight();
    this.pane4.warpRight();
    this.slidingPaneWrapper.childPanes = [this.pane1, this.pane2, this.pane3, this.pane4];
  }

  render() {
    const swipe_config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    let navLinkClicked = (text) => {
      switch (text) {
        case '1':
          this.slidingPaneWrapper.setActive(0);
          break;
        case '2':
          this.slidingPaneWrapper.setActive(1);
          break;
        case '3':
          this.slidingPaneWrapper.setActive(2);
          break;
        case '4':
          this.slidingPaneWrapper.setActive(3);
          break;
      }
    };

    const onSwipe = (gestureName, gestureState) => {
      const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      switch (gestureName) {
        case SWIPE_LEFT:
          this.slidingPaneWrapper.slideAllLeft();
          break;
        case SWIPE_RIGHT:
          this.slidingPaneWrapper.slideAllRight();
          break;
        default:
          break;
      }
    };

    let renderNavBarButton = (text, additional_styles) => {
      return  <TouchableHighlight style={ [styles.navLink, additional_styles] }
                                  onPress={() => {navLinkClicked(text)}}>
                <View style={ { flexDirection: 'row' } }>
                  <Text style={styles.navLinkText}>{text}</Text>
                </View>
              </TouchableHighlight>
    };

    return (
      <View style={styles.container}>
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state)}
          config={swipe_config}>
          <View style={{ width: '100%' }}>
            <View style={styles.navBarBuffer} />
            <View style={styles.navBar}>
              { renderNavBarButton('1', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
              { renderNavBarButton('2', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
              { renderNavBarButton('3', { borderRightColor: '#CCCCCC', borderRightWidth: 1 }) }
              { renderNavBarButton('4', {}) }
            </View>
          </View>
          <SlidingPaneWrapper style={{}} ref={(slidingPaneWrapper) => { this.slidingPaneWrapper = slidingPaneWrapper }}>
            <SlidingPane style={[{borderColor: '#FF9999', borderWidth: 2}]}
                         ref={ (pane1) => { this.pane1 = pane1} }>
              <View style={styles.container}>
                <Text style={styles.paneText}>1</Text>
              </View>
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#FF9999', borderWidth: 2}]}
                         ref={ (pane2) => { this.pane2 = pane2} }>
              <View style={styles.container}>
                <Text style={styles.paneText}>2</Text>
              </View>
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#FF9999', borderWidth: 2}]}
                         ref={ (pane3) => { this.pane3 = pane3} }>
              <View style={styles.container}>
                <Text style={styles.paneText}>3</Text>
              </View>
            </SlidingPane>
            <SlidingPane style={[{borderColor: '#FF9999', borderWidth: 2}]}
                         ref={ (pane4) => { this.pane4 = pane4} }>
              <View style={styles.container}>
                <Text style={styles.paneText}>4</Text>
              </View>
            </SlidingPane>
          </SlidingPaneWrapper>
        </GestureRecognizer>
      </View>
    );
  }
}
