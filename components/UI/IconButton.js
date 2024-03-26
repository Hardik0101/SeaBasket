import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';

function IconButtonComponent({
  icon,
  onPress,
  size,
  mode,
  iconColor,
  containerColor,
}) {
  return (
    <IconButton
      icon={icon}
      iconColor={iconColor}
      size={size}
      onPress={onPress}
      mode={mode}
      style={styles.iconButton}
      containerColor={containerColor}
    />
  );
}

export default IconButtonComponent;

const styles = StyleSheet.create({
  iconButton: {
    borderRadius: 6,
    color: '#2b5c3a',
  },
});
