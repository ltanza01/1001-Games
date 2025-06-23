import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const PADDING = width * 0.06;
const TITLE_FONT = width * 0.08;
const TEXT_FONT = width * 0.042;
const BUTTON_FONT = width * 0.045;
const IMAGE_SIZE = width * 0.32;
const BUTTON_PADDING_V = width * 0.03;
const BUTTON_PADDING_H = width * 0.08;
const BORDER_RADIUS = width * 0.06;
const MODAL_PADDING = width * 0.06;
const CLOSE_BUTTON_PADDING_V = width * 0.02;
const CLOSE_BUTTON_PADDING_H = width * 0.06;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: PADDING,
  },
  title: {
    fontSize: TITLE_FONT,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: PADDING * 0.7,
    letterSpacing: 1,
    textAlign: 'center',
  },
  text: {
    fontSize: TEXT_FONT,
    color: '#222',
    textAlign: 'center',
    marginBottom: PADDING * 1.3,
    lineHeight: TEXT_FONT * 1.5,
  },
  button: {
    backgroundColor: '#0072ff',
    paddingVertical: BUTTON_PADDING_V,
    paddingHorizontal: BUTTON_PADDING_H,
    borderRadius: BORDER_RADIUS,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: BUTTON_FONT,
    letterSpacing: 1,
  },
  trademark: {
    marginBottom: PADDING * 0.4,
    textAlign: 'center',
  },
  trademarkBold: {
    fontWeight: 'bold',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignSelf: 'center',
    marginBottom: PADDING * 0.5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS * 1.2,
    padding: MODAL_PADDING,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: PADDING * 0.3,
    paddingVertical: CLOSE_BUTTON_PADDING_V,
    paddingHorizontal: CLOSE_BUTTON_PADDING_H,
    backgroundColor: '#0072ff',
    borderRadius: BORDER_RADIUS * 0.7,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: BUTTON_FONT,
  },
});

export default styles;
