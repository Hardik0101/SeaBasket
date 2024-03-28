import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Modal, Portal, RadioButton} from 'react-native-paper';
import {Colors} from '../../constant/styles';
import IconButtonComponent from '../UI/IconButton';

function SortModalComponent({
  modalVisible,
  setModalVisible,
  filterHandler,
  typeItems,
}) {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (typeItems.length > 0) {
      setSelectedItem(typeItems[0].name);
    }
  }, [typeItems]);

  const handleSelectItem = itemName => {
    setSelectedItem(itemName);
    filterHandler(itemName);
    setModalVisible(!modalVisible);
  };

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(!modalVisible)}
        contentContainerStyle={styles.modalView}>
        <View style={styles.closeButton}>
          <IconButtonComponent
            icon={'close'}
            size={16}
            onPress={() => setModalVisible(!modalVisible)}
            mode={'outlined'}
            iconColor={'#000000'}
            containerColor={'#ffffff'}
          />
        </View>

        {typeItems.map(filterItem => (
          <TouchableOpacity
            key={filterItem.name}
            activeOpacity={1}
            style={styles.filterOption}
            onPress={() => handleSelectItem(filterItem.name)}>
            <View style={styles.sortType}>
              <RadioButton
                value={filterItem.name}
                status={
                  selectedItem === filterItem.name ? 'checked' : 'unchecked'
                }
              />
              <Text style={styles.textStyle}>{filterItem.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Modal>
    </Portal>
  );
}

export default SortModalComponent;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Colors.bgcolor,
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
    top: -40,
    right: -2,
  },
  sortType: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
