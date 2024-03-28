import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox, Icon, Modal, Portal} from 'react-native-paper';
import {Colors} from '../../constant/styles';
import IconButtonComponent from '../UI/IconButton';
import Slider from 'react-native-a11y-slider';
import ButtonComponent from '../UI/ButtonComponent';

function FilterModalComponent({
  modalVisible,
  setModalVisible,
  filterHandler,
  typeItems,
  priceAndRateFilter,
  type,
}) {
  const [sliderValues, setSliderValues] = useState([600, 8000]);
  const [filter, setFilter] = useState([]);
  const [checkValue, setCheckValue] = useState([0]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setFilter(type);
  }, []);

  function handleSliderChange(values) {
    setSliderValues(values);
  }

  function handleValue(value) {
    setCheckValue(prevState => [...prevState, value]);
  }

  const handleToggleCheckbox = itemName => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
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
          </>
        )}
        {typeItems.map(filterItem => (
          <TouchableOpacity
            key={filterItem.name}
            activeOpacity={1}
            style={styles.filterOption}
            onPress={() => {
              handleValue(filterItem.value);
              handleToggleCheckbox(filterItem.name);
            }}>
            <View style={styles.filterType}>
              <Checkbox
                status={checkedItems[filterItem.name] ? 'checked' : 'unchecked'}
              />
              <Text style={styles.textStyle}>{filterItem.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.buttonContainre}>
          <ButtonComponent
            onPress={() => {
              setModalVisible(!modalVisible);
              filterHandler(sliderValues);
              priceAndRateFilter(checkValue);
            }}>
            Apply Filter
          </ButtonComponent>
        </View>
      </Modal>
    </Portal>
  );
}

export default FilterModalComponent;

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
  filterType: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  buttonContainre: {
    marginVertical: 10,
  },
});
