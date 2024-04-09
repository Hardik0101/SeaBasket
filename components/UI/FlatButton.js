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
      style={styles.button}
      labelStyle={styles.buttonText}>
      {children}
    </Button>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 36,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: 16,
  },
});
