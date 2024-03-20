import * as React from 'react';
import {Button} from 'react-native-paper';
import {Colors} from '../constant/styles';
import {StyleSheet} from 'react-native';

const ButtonComponent = ({
  icon,
  mode,
  onPress,
  color,
  children,
  buttonColor,
}) => (
  <Button
    icon={icon}
    mode={mode}
    onPress={onPress}
    style={styles.button}
    labelStyle={styles.buttonText}
    buttonColor={buttonColor}
    textColor={color}>
    {children}
  </Button>
);

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
  },
});
