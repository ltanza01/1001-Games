import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING = width * 0.06;
const TITLE_FONT = width * 0.09;
const ALERT_FONT = width * 0.045;
const BUTTON_FONT = width * 0.045;
const BUTTON_PADDING = width * 0.035;
const CARD_WIDTH = width * 0.7;
const CARD_RADIUS = width * 0.06;
const CARD_FONT = width * 0.048;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: PADDING,
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: PADDING,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.92,
    maxWidth: '98%',
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: 'bold',
    marginBottom: PADDING * 0.8,
    color: '#0072ff',
    textAlign: 'center',
  },
  alert: {
    color: '#b71c1c',
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: PADDING * 0.5,
    marginBottom: PADDING * 0.7,
    fontSize: ALERT_FONT,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ffeeba',
  },
  button: {
    padding: BUTTON_PADDING * 1.2,
    marginTop: 10,
    backgroundColor: '#0072ff',
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: BUTTON_FONT,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: '#1976d2',
    borderRadius: CARD_RADIUS,
    paddingVertical: PADDING * 0.6,
    paddingHorizontal: PADDING * 1.2,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CARD_WIDTH,
    alignSelf: 'center',
    elevation: 2,
  },
  scoreCardGold: {
    backgroundColor: '#FFD700',
  },
  scoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: CARD_FONT,
    width: 30,
  },
  scoreName: {
    color: '#fff',
    fontSize: CARD_FONT,
    flex: 1,
    marginLeft: 10,
  },
  scoreValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: CARD_FONT,
    width: 50,
    textAlign: 'right',
  },
  scoreTextGold: {
    color: '#b8860b',
  },
  scoreNameGold: {
    color: '#b8860b',
    fontWeight: 'bold',
  },
  scoreValueGold: {
    color: '#b8860b',
  },
});

export default styles;