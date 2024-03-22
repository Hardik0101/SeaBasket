import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../../constant/styles';
import {Card, Icon} from 'react-native-paper';

function ItemScrollCard({items, detailsHandler}) {
  return (
    <>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.twoItems}>
          {items.map((product, index) => (
            <Card
              key={index}
              onPress={() => detailsHandler(product.id)}
              style={styles.card}>
              <Card.Cover
                source={{uri: product.image}}
                style={styles.image}
                resizeMode="contain"
              />
              <Card.Content style={styles.itemTitleView}>
                <Text variant="titleLarge" style={styles.itemTitle}>
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
                  <Text variant="bodyMedium" style={styles.itemPrice}>
                    ₹{(product.price * 87.37).toFixed(0)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 30,
                    }}>
                    <Icon source={'star'} color="#d2c900" size={14} />
                    <Text variant="bodyMedium" style={styles.itemRate}>
                      {product.rating.rate}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  twoItems: {
    flexDirection: 'row',
    width: '100%',
    gap: 4,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingHorizontal: 6,
    height: '100%',
  },
  card: {
    width: 170,
    paddingTop: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 4,
  },
  image: {
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  title: {
    color: Colors.primary,
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
  },
  itemTitleView: {
    backgroundColor: Colors.primary200,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: 4,
    height: 56,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: 'AnekDevanagari',
    color: Colors.text,
    width: 136,
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
});

export default ItemScrollCard;
