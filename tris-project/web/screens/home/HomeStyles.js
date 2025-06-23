import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_MARGIN = width * 0.025;
const CARD_WIDTH = (width / 2) - (CARD_MARGIN * 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: width * 0.03,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: width * 0.03,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    marginHorizontal: CARD_MARGIN,
    marginBottom: CARD_MARGIN * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 0.6,
  },
  cardContent: {
    padding: width * 0.03,
  },
  cardTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: width * 0.01,
  },
  cardDescription: {
    fontSize: width * 0.035,
    color: '#333',
    marginBottom: width * 0.01,
  },
  cardPlayers: {
    fontSize: width * 0.03,
    color: '#888',
  },
});

export default styles;
