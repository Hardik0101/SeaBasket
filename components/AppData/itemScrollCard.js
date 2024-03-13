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

const ItemScrollCard = ({items, detailsHandler}) => {
  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.twoItems}>
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
                    ? `${product.title.substring(0, 20)}...`
                    : product.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  twoItems: {
    flexDirection: 'row',
    width: '100%',
    gap: 6,
    flexWrap: 'wrap',
  },
  scrollContainer: {
    paddingHorizontal: 6,
    height: '100%',
  },
  card: {
    width: '49%',
    height: 230,
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
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: 130,
    height: 150,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitleView: {
    width: 160,
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
  contentContainer: {
    paddingBottom: 6,
  },
});

export default ItemScrollCard;
