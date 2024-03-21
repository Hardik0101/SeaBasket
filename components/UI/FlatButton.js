import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

function FlatButton({icon, mode, children, textColor, onPress}) {
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      textColor={textColor}
      style={styles.button}>
      {children}
    </Button>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
