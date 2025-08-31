import * as React from 'react';
import { ViewProps, StyleProp, ViewStyle } from 'react-native';

export interface SlidingPaneRef {
  warpLeft: () => void;
  slideLeft: () => void;
  warpCenter: () => void;
  slideCenter: () => void;
  warpRight: () => void;
  slideRight: () => void;
}

export interface SlidingPaneProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export class SlidingPane extends React.Component<SlidingPaneProps> {}

export interface SlidingPaneWrapperRef {
  slideAllLeft: () => void;
  slideAllRight: () => void;
  setActive: (index: number) => void;
  /** Consumer assigns this array of child pane refs after mounting. */
  childPanes?: SlidingPaneRef[];
}

export interface SlidingPaneWrapperProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  activePane?: number;
}

export class SlidingPaneWrapper extends React.Component<SlidingPaneWrapperProps> {}

export {};

