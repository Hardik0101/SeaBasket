import React from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {Colors} from '../../constant/styles';
import {Card, Icon} from 'react-native-paper';

function HorizontalCard({items, detailsHandler, children}) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{children}</Text>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainer}>
        {items?.map(product => (
          <Card
            key={product.id}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  card: {
    width: 170,
    paddingTop: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 6,
    borderColor: 'lightgray',
    borderWidth: 1,
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
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
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
  cancelButton: {
    padding: 4,
  },
});

export default HorizontalCard;
