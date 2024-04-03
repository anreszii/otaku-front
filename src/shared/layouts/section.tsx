import {
  View,
  Text,
  ScrollView,
  ScrollViewProps,
  LayoutChangeEvent,
} from "react-native";
import React, { useState } from "react";

interface Props extends ScrollViewProps {}

export const Section = ({ children, style, ...props }: Props) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setIsScrollEnabled(contentHeight > scrollViewHeight);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setScrollViewHeight(event.nativeEvent.layout.height);
  };

  return (
    <ScrollView
      style={[style, { flex: 1 }]}
      scrollEnabled={isScrollEnabled}
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
