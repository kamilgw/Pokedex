const getColorFromType = (type: string) => {
  switch (type) {
    default:
      return '#000'
    case 'bug':
      return '#a1c661'
    case 'dark':
      return '#6d594a'
    case 'dragon':
      return '#333F96'
    case 'electric':
      return '#F3CA45'
    case 'fairy':
      return '#EBA8C3'
    case 'fighting':
      return '#b33c31'
    case 'fire':
      return '#fb6c6c'
    case 'flying':
      return '#83A2E3'
    case 'ghost':
      return '#6c5b94'
    case 'grass':
      return '#74b264'
    case 'ground':
      return '#c8c075'
    case 'ice':
      return '#77E3FB'
    case 'normal':
      return '#a9a87e'
    case 'poison':
      return '#8b31b1'
    case 'psychic':
      return '#D2436D'
    case 'rock':
      return '#b5a04b'
    case 'steel':
      return '#4C91B2'
    case 'water':
      return '#599FEC'
  }
}

export default getColorFromType