import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

function IconButtonComponent({icon, onPress, size, mode}) {
  return (
    <IconButton
      icon={icon}
      iconColor={'#FFFFFF'}
      size={size}
      onPress={onPress}
      mode={mode}
      style={styles.iconButton}
      containerColor={'#2b5c3a'}
    />
  );
}

export default IconButtonComponent;

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 6,
  },
});
