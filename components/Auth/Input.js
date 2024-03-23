import {View, Text, TextInput, StyleSheet, Icon} from 'react-native';
import {Colors} from '../../constant/styles';

function Input({
  label,
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
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.primary100}
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
    borderBottomColor: Colors.primary100,
    borderBottomWidth: 2,
    fontSize: 16,
    color: Colors.primary100,
    fontWeight: '300',
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
