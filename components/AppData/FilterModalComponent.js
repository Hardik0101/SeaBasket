import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Modal, Portal} from 'react-native-paper';
import {Colors} from '../../constant/styles';
import IconButtonComponent from '../UI/IconButton';

function FilterModalComponent({
  modalVisible,
  setModalVisible,
  filterHandler,
  typeItems,
}) {
  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(!modalVisible)}
        contentContainerStyle={styles.modalView}>
        <View style={styles.closeButton}>
          <IconButtonComponent
            icon={'close'}
            size={10}
            onPress={() => setModalVisible(!modalVisible)}
            mode={'outlined'}
          />
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
      </Modal>
    </Portal>
  );
}

export default FilterModalComponent;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.primary200,
    padding: 10,
    margin: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  textStyle: {
    color: 'black',
    fontFamily: 'AnekDevanagari',
    textAlign: 'center',
    fontSize: 18,
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
    top: -2,
    right: -2,
  },
});
