import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

function WobbleExample(props) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        title="wobble"
        onPress={() => {
          // will be filled in later
        }}
      />
    </>
  );
}