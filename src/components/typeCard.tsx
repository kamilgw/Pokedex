import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface TypeCardProps {
  type: string;
}

const TypeCard = ({type}: TypeCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.type}>Typ: {type}</Text>
    </View>
  );
};

export default TypeCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 16,
    borderRadius: 50,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  type: {
    color: '#fff',
  },
});
