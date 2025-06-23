import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const HEADER_PADDING_TOP = width * 0.18;
const HEADER_ICON_SIZE = width * 0.09;
const MODAL_WIDTH = width * 0.85;
const MODAL_RADIUS = width * 0.08;
const MODAL_HEADER_PADDING = width * 0.06;
const MODAL_TITLE_FONT = width * 0.06;
const MENU_ITEM_FONT = width * 0.048;
const MENU_ITEM_EXIT_FONT = width * 0.043;
const SEARCHBAR_WIDTH = width * 0.7;
const SEARCHBAR_HEIGHT = width * 0.12;
const SEARCHBAR_FONT = width * 0.045;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: HEADER_PADDING_TOP,
    backgroundColor: '#007bff',
  },
  headerButton: {
    padding: width * 0.025,
    paddingBottom: 0,
  },
  headerText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  headerTextLabel: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  activeText: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: MODAL_WIDTH,
    backgroundColor: '#fff',
    borderRadius: MODAL_RADIUS,
    paddingVertical: 0,
    paddingHorizontal: 0,
    elevation: 12,
    minHeight: width * 0.55,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    borderTopLeftRadius: MODAL_RADIUS,
    borderTopRightRadius: MODAL_RADIUS,
    paddingHorizontal: MODAL_HEADER_PADDING,
    paddingVertical: MODAL_HEADER_PADDING,
  },
  modalTitle: {
    color: 'white',
    fontSize: MODAL_TITLE_FONT,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modalCloseButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: width * 0.05,
    padding: width * 0.012,
  },
  menuContent: {
    padding: width * 0.045,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.037,
    borderRadius: width * 0.037,
    marginBottom: width * 0.01,
    paddingHorizontal: width * 0.015,
  },
  menuIcon: {
    marginRight: width * 0.04,
  },
  menuItemText: {
    fontSize: MENU_ITEM_FONT,
    color: '#1976d2',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  menuItemStarText: {
    fontSize: MENU_ITEM_FONT,
    color: '#1976d2',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  menuItemExit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.032,
    borderRadius: width * 0.037,
    marginTop: width * 0.015,
    paddingHorizontal: width * 0.015,
  },
  menuItemExitText: {
    fontSize: MENU_ITEM_EXIT_FONT,
    color: '#e53935',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#e3e8f0',
    marginVertical: width * 0.005,
  },
  hamburgerButton: {
    padding: width * 0.025,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: width * 0.06,
    marginTop: 0,
    paddingHorizontal: 12,
    width: SEARCHBAR_WIDTH,
    height: SEARCHBAR_HEIGHT,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: SEARCHBAR_FONT,
    color: '#222',
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
});

export default styles;
