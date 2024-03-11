import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constant/styles';

function VerticalCard({children, onPress, functions, item}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const popularData = await functions();
      setData(popularData);
    };

    fetchData();
  }, []);
  return (
    <>
      <Text style={styles.title}>{children}</Text>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          <>
            <View style={styles.twoItems}>
              {data.map((product, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => onPress(product.id)}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: product.image}}
                        style={styles.image}
                      />
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
                </>
              ))}
            </View>
          </>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 6,
    height: '100%',
  },
  contentContainer: {
    paddingBottom: 10,
  },
  twoItems: {
    flexDirection: 'row',
    width: '100%',
    gap: 6,
    flexWrap: 'wrap',
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
  },
  imageContainer: {
    width: 130,
    height: 150,
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
});

export default VerticalCard;
