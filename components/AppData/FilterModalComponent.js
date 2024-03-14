import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Cancel} from '../../assets/icons';
import {Colors} from '../../constant/styles';
function FilterModalComponent({
  modalVisible,
  setModalVisible,
  filterHandler,
  typeItems,
}) {
  return (
    // Modal From react-native
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.bgTrans}></View>
        <View style={styles.modalView}>
          <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Cancel width={24} height={24} />
            </TouchableOpacity>
          </View>
          {typeItems.map(filterItem => (
            <TouchableOpacity
              key={filterItem.name}
              style={styles.filterOption}
              onPress={() => {
                setModalVisible(!modalVisible);
                filterHandler(filterItem.name);
              }}>
              <Text style={styles.textStyle}>{filterItem.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

export default FilterModalComponent;

const styles = StyleSheet.create({
  bgTrans: {
    backgroundColor: Colors.bgcolor,
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  modalView: {
    backgroundColor: Colors.primary200,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    width: 200,
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary300,
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 10,
  },
});
