import React, {useCallback, useRef} from 'react';

import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export interface Props {
  tabs: {
    name: string;
    component: React.ReactNode;
  }[];
  tabColor?: string;
}

const Tabbar = ({tabs, tabColor = '#efefef'}: Props) => {
  const xPosition = new Animated.Value(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const screenWidth = Dimensions.get('screen').width;

  const moveTo = (to: number) => {
    Animated.timing(xPosition, {
      toValue: to,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const handleTabPress = useCallback(
    (menuIndex: number) => {
      scrollRef.current?.scrollTo({x: screenWidth * menuIndex});
    },
    [screenWidth],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            style={styles.tabButton}
            key={index}
            onPress={() => handleTabPress(index)}>
            <Animated.Text
              style={{
                color: xPosition.interpolate({
                  inputRange: [
                    ((index - 1) * screenWidth) / tabs.length,
                    (index * screenWidth) / tabs.length,
                    ((index + 1) * screenWidth) / tabs.length,
                  ],
                  outputRange: ['#b8b8b8', '#000', '#b8b8b8'],
                  extrapolate: 'clamp',
                }),
              }}>
              {tab.name}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.border} />
      <Animated.View
        style={{
          width: screenWidth / tabs.length,
          backgroundColor: tabColor,
          transform: [
            {
              translateX: xPosition,
            },
            {
              scaleX: 0.7,
            },
          ],
        }}
      />
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        decelerationRate={0.5}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const {contentOffset} = e.nativeEvent;
          moveTo(contentOffset.x / tabs.length);
        }}>
        {tabs.map((tab, index) => (
          <ScrollView key={index}>
            <View>{tab.component}</View>
          </ScrollView>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tabbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  border: {
    height: 3,
    marginBottom: -3,
    backgroundColor: '#747476',
    scaleX: 0.9,
  },
  tabButton: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: Dimensions.get('screen').width,
  },
});
