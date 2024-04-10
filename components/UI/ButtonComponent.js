import * as React from 'react';
import {Button} from 'react-native-paper';
import {Colors} from '../../constant/styles';
import {StyleSheet} from 'react-native';

const ButtonComponent = ({icon, mode, onPress, children, disabled}) => (
  <Button
    disabled={disabled}
    icon={icon}
    mode={mode}
    onPress={onPress}
    style={[styles.button, disabled ? styles.disabledButton : null]}
    labelStyle={[styles.buttonText]}
    buttonColor={'#2b5c3a'}
    textColor={'#FFFFFF'}>
    {children}
  </Button>
);

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 36,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
  },
  disabledButton: {
    backgroundColor: Colors.primary100,
  },
});
