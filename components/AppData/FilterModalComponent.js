import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Modal, Portal} from 'react-native-paper';
import {Colors} from '../../constant/styles';
import IconButtonComponent from '../UI/IconButton';
import Slider from 'react-native-a11y-slider';

function FilterModalComponent({
  modalVisible,
  setModalVisible,
  filterHandler,
  typeItems,
  type,
}) {
  const [sliderValues, setSliderValues] = useState([200, 870]);
  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(type);
  }, [setFilter]);

  function handleSliderChange(values) {
    setSliderValues(values);
    setMax(values[1]);
    setMin(values[0]);
  }

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
          />
        </View>
        {filter === 'filter' && (
          <>
            <View style={{width: '90%'}}>
              <Slider
                min={500}
                max={10000}
                markerColor="black"
                values={sliderValues}
                labelTextStyle={{
                  color: 'black',
                  fontSize: 10,
                  fontWeight: 'bold',
                }}
                onChange={handleSliderChange}
              />
            </View>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() => {
                setModalVisible(!modalVisible);
                filterHandler(sliderValues);
              }}>
              <Text style={styles.textStyle}>Apply Filter</Text>
            </TouchableOpacity>
          </>
        )}

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
    top: -40,
    right: -2,
  },
});
