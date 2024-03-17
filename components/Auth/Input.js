import {View, Text, TextInput, StyleSheet, Icon} from 'react-native';
import {Colors} from '../../constant/styles';

function Input({
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondary}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
    fontSize: 18,
    color: Colors.secondary,
    fontFamily: 'Anek-Devanagari',
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
