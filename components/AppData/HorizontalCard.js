import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../../constant/styles';

const HorizontalCard = ({items, detailsHandler, children}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{children}</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.contentContainer}>
          {items.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => detailsHandler(product.id)}>
              <View style={styles.imageContainer}>
                <Image source={{uri: product.image}} style={styles.image} />
              </View>
              <View style={styles.itemTitleView}>
                <Text style={styles.itemPrice}>${product.price}</Text>
                <Text style={styles.itemTitle}>
                  {product.title.length > 10
                    ? `${product.title.substring(0, 15)}...`
                    : product.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 6,
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: 170,
    height: 230,
    marginRight: 6,
    padding: 6,
    marginTop: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary300,
  },
  imageContainer: {
    width: 130,
    height: 150,
  },

  itemTitleView: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary300,
  },
  itemPrice: {
    marginBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary300,
  },
});

export default HorizontalCard;
