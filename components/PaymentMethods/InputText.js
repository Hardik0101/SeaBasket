import React, {useState} from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constant/styles';

const InputText = ({
  children,
  keyboardType,
  maxLength,
  placeholder,
  secureTextEntry,
  updatedValue,
  value,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{children}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholderTextColor={'gray'}
        maxLength={maxLength}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={updatedValue}
        value={value}
        style={[styles.input, error && styles.errorInput]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    fontSize: 16,
    letterSpacing: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderColor: Colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    padding: 4,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  errorInput: {
    borderColor: 'red',
    fontFamily: 'AnekDevanagari',
  },
  errorText: {
    color: 'red',
    fontFamily: 'AnekDevanagari',
  },
});

export default InputText;
