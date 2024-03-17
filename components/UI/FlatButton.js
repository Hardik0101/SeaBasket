import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constant/styles';
// import {Colors} from '../../constant/style';

function FlatButton({children, onPress}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Anek-Devanagari',
    textAlign: 'center',
    color: Colors.primary300,
  },
});
