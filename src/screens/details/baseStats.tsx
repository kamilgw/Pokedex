import React from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';

const BaseStats = ({pokemon}) => {
  const getProgressBarColor = (progressValue: number): string =>
    progressValue < 50 ? 'red' : 'green';
  return (
    <ScrollView style={styles.scrollContainer}>
      {pokemon.stats.map((stat) => (
        <View key={stat.url} style={styles.stat}>
          <Text color="grey" style={{width: 100}}>
            {stat.name}
          </Text>

          <View style={styles.progressBarContainer}>
            <Text style={styles.statText}>{stat.base_stat}</Text>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressBarActualValue,
                  {
                    width: `${stat.base_stat}%`,
                    backgroundColor: getProgressBarColor(
                      parseInt(stat.base_stat),
                    ),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default BaseStats;
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: 410,
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 10,
  },
  statText: {
    width: 30,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  stat: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    overflow: 'hidden',
    height: 4,
    marginLeft: 15,
    backgroundColor: 'lightgray',
  },
  progressBarActualValue: {
    height: 4,
  },
  title: {
    fontSize: 20,
    color: '#303943',
    lineHeight: 42,
    fontWeight: 'bold',
  },
});
