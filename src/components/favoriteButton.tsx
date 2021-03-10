import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {usePokemon} from '../contexts';
import {saveDataPokedex} from '../store/asyncStorage';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

const FavoriteButton = ({id, name, type}) => {
  const {setMarkedAs} = usePokemon();
  const [isMarked, setIsMarked] = useState(true);
  const buttonHandler = () => {
    markPokemonAs(isMarked);
    setIsMarked(current => !current);
  };

  async function markPokemonAs(markAs) {
    await saveDataPokedex({id, type, name, markAs});
    setMarkedAs(markAs);
  }

  return (
    <TouchableOpacity
      style={styles.heartContainer}
      onPress={() => buttonHandler()}>
      <View style={styles.heartIconContainer}>
        <Icon name="heart-outline" size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};
export default FavoriteButton;

const styles = StyleSheet.create({
  heartContainer: {
    alignItems: 'center',
    height: '100%',
  },
  heartIconContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
});
