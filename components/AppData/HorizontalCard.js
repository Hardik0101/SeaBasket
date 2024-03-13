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
import {Star} from '../../assets/icons';

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
                <Text style={styles.itemTitle}>
                  {product.title.length > 10
                    ? `${product.title.substring(0, 13)}...`
                    : product.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 4,
                  }}>
                  <Text style={styles.itemPrice}>${product.price}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                    <Star width={20} height={20} fill={Colors.primary300} />
                    <Text style={styles.itemRate}>{product.rating.rate}</Text>
                  </View>
                </View>
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
    paddingLeft: 6,
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    width: 170,
    height: 230,
    paddingTop: 6,
    marginTop: 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderColor: Colors.primary300,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    marginBottom: 4,
  },
  title: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitleView: {
    width: '100%',
    backgroundColor: Colors.primary100,
    padding: 4,
    height: 60,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary300,
    textAlign: 'justify',
  },
  itemPrice: {
    marginBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary300,
  },
  contentContainer: {
    paddingBottom: 6,
  },
  itemRate: {
    fontSize: 22,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
});

export default HorizontalCard;
