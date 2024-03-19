import React, {useState} from 'react';
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

function HorizontalCard({items, detailsHandler, children}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{children}</Text>
        </View>
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
                      height: 22,
                    }}>
                    <Star width={12} height={12} fill={'#d2c900'} />
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
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
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
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
  },
  itemTitleView: {
    width: '100%',
    backgroundColor: Colors.primary200,
    padding: 4,
    height: 60,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: 'AnekDevanagari',
    color: Colors.text,
    textAlign: 'justify',
  },
  itemPrice: {
    marginBottom: 2,
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
    color: Colors.text,
  },
  contentContainer: {
    paddingBottom: 6,
  },
  itemRate: {
    fontSize: 18,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 6,
  },
  showAll: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  allData: {
    backgroundColor: Colors.bgcolor,
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  canclebutton: {
    padding: 4,
  },
});

export default HorizontalCard;
