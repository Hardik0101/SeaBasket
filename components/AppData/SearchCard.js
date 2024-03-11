import {StyleSheet, TextInput, View} from 'react-native';
import {Colors} from '../../constant/styles';
import {Search} from '../../assets/icons';

function SearchCard() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        returnKeyType="search"
      />
      <Search width={28} height={28} />
    </View>
  );
}

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
});
