import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constant/styles';

function LoadingOverlay({children}) {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size="large" />
      <Text style={styles.message}>{children}</Text>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary300,
  },
});
