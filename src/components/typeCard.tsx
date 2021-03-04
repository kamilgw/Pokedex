import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface TypeCardProps {
  type: string;
}

const TypeCard = ({type}: TypeCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
};

export default TypeCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  type: {
    color: '#fff',
  },
});
