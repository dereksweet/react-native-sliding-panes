import React from 'react';
import { View, Text, TouchableHighlight, Platform, StyleSheet } from 'react-native';
// @ts-ignore - library does not ship types
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { SlidingPane, SlidingPaneWrapper } from 'react-native-sliding-panes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8ECC2',
  },
  navBarBuffer: {
    height: Platform.OS === 'ios' ? 60 : 0,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    height: 40,
    backgroundColor: '#EEEEFF',
    width: '100%',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  navLink: {
    flex: 1,
    alignItems: 'center',
  },
  navLinkText: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  paneText: {
    fontSize: 22,
  },
});

export default function App() {
  let wrapperRef: any = null;
  let pane1: any = null;
  let pane2: any = null;
  let pane3: any = null;
  let pane4: any = null;

  React.useEffect(() => {
    pane1?.warpCenter();
    pane2?.warpRight();
    pane3?.warpRight();
    pane4?.warpRight();
    if (wrapperRef) {
      wrapperRef.childPanes = [pane1, pane2, pane3, pane4];
    }
  }, [wrapperRef, pane1, pane2, pane3, pane4]);

  const swipe_config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const navLinkClicked = (text: string) => {
    switch (text) {
      case '1':
        wrapperRef?.setActive(0);
        break;
      case '2':
        wrapperRef?.setActive(1);
        break;
      case '3':
        wrapperRef?.setActive(2);
        break;
      case '4':
        wrapperRef?.setActive(3);
        break;
    }
  };

  const onSwipe = (gestureName: any) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        wrapperRef?.slideAllLeft();
        break;
      case SWIPE_RIGHT:
        wrapperRef?.slideAllRight();
        break;
      default:
        break;
    }
  };

  const renderNavBarButton = (text: string, additional_styles: any) => {
    return (
      <TouchableHighlight style={[styles.navLink, additional_styles]} onPress={() => navLinkClicked(text)}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.navLinkText}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <GestureRecognizer onSwipe={(direction: any) => onSwipe(direction)} config={swipe_config}>
        <View style={{ width: '100%' }}>
          <View style={styles.navBarBuffer} />
          <View style={styles.navBar}>
            {renderNavBarButton('1', { borderRightColor: '#CCCCCC', borderRightWidth: 1 })}
            {renderNavBarButton('2', { borderRightColor: '#CCCCCC', borderRightWidth: 1 })}
            {renderNavBarButton('3', { borderRightColor: '#CCCCCC', borderRightWidth: 1 })}
            {renderNavBarButton('4', {})}
          </View>
        </View>
        <SlidingPaneWrapper style={{}} ref={(r: any) => (wrapperRef = r)}>
          <SlidingPane style={[{ borderColor: '#FF9999', borderWidth: 2 }]} ref={(r: any) => (pane1 = r)}>
            <View style={styles.container}>
              <Text style={styles.paneText}>1</Text>
            </View>
          </SlidingPane>
          <SlidingPane style={[{ borderColor: '#FF9999', borderWidth: 2 }]} ref={(r: any) => (pane2 = r)}>
            <View style={styles.container}>
              <Text style={styles.paneText}>2</Text>
            </View>
          </SlidingPane>
          <SlidingPane style={[{ borderColor: '#FF9999', borderWidth: 2 }]} ref={(r: any) => (pane3 = r)}>
            <View style={styles.container}>
              <Text style={styles.paneText}>3</Text>
            </View>
          </SlidingPane>
          <SlidingPane style={[{ borderColor: '#FF9999', borderWidth: 2 }]} ref={(r: any) => (pane4 = r)}>
            <View style={styles.container}>
              <Text style={styles.paneText}>4</Text>
            </View>
          </SlidingPane>
        </SlidingPaneWrapper>
      </GestureRecognizer>
    </View>
  );
}
