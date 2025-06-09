import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 16,
    letterSpacing: 1,
  },
  text: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#0072ff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  trademark: {
    marginBottom: 10,
    textAlign: 'center',
  },
  trademarkBold: {
    fontWeight: 'bold',
  },
  image: {
  width: 120,
  height: 120,
  alignSelf: 'center',
  marginBottom: 20,
 },
 overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.7)',
  justifyContent: 'center',
  alignItems: 'center',
},
overlayContent: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 24,
  alignItems: 'center',
},
closeButton: {
  marginTop: 16,
  paddingVertical: 8,
  paddingHorizontal: 24,
  backgroundColor: '#0072ff',
  borderRadius: 16,
},
closeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default styles;
