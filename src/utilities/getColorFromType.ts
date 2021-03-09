const getColorFromType = (type: string) => {
  switch (type) {
    default:
      return '#000';
    case 'Bug':
      return '#a1c661';
    case 'Dark':
      return '#6d594a';
    case 'Dragon':
      return '#333F96';
    case 'Electric':
      return '#ffd86f';
    case 'Fairy':
      return '#EBA8C3';
    case 'Fighting':
      return '#b33c31';
    case 'Fire':
      return '#fb6c6c';
    case 'Flying':
      return '#83A2E3';
    case 'Ghost':
      return '#6c5b94';
    case 'Grass':
      return '#48d0b0';
    case 'Ground':
      return '#c8c075';
    case 'Ice':
      return '#77E3FB';
    case 'Normal':
      return '#a9a87e';
    case 'Poison':
      return '#9F6E97';
    case 'Psychic':
      return '#D2436D';
    case 'Rock':
      return '#b5a04b';
    case 'Steel':
      return '#4C91B2';
    case 'Water':
      return '#76bdfe';
  }
};

export default getColorFromType;
