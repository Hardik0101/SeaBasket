import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {useRoute} from '@react-navigation/native';
import {clearState, fetchDetails} from '../store/redux/detailsSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import StepIndicator from 'react-native-step-indicator';
const stepLabels = [
  'Order Confirmed',
  'Out of Delivery',
  'Expected Delivery',
  'Order Delivered',
];

function OrderSummaryScreen() {
  const dispatch = useDispatch();
  const order = useSelector(states => states.myOrder.order);
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    function fetchData() {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, route.params.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay children="Loading..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error occurred while loading data.</Text>
      </View>
    );
  }

  const date = new Date();
  console.log(date);
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <>
        <View style={styles.stepIndicatorContainer}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            currentPosition={2}
            labels={stepLabels}
            stepCount={4}
          />
        </View>
        <View style={styles.stepsDate}>
          <Text style={styles.date}>31/03/2024</Text>
          <Text style={styles.date}>31/03/2024</Text>
          <Text style={styles.date}>31/03/2024</Text>
          <Text style={styles.date}>31/03/2024</Text>
        </View>
        <View style={styles.itemConatiner}>
          {order[route.params.id].check.map(product => (
            <View key={product.id} style={styles.dataConatiner}>
              <Image source={{uri: product.image}} style={styles.image} />
              <View style={styles.detailsContainer}>
                <Text style={styles.itemTitle}>{product.title}</Text>
                <Text style={styles.itemPrice}>
                  ₹{(product.price * 87.37).toFixed(0)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </>
    </ScrollView>
  );
}

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
    marginHorizontal: 6,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    width: 200,
  },
  dataConatiner: {
    padding: 4,
    flexDirection: 'row',
  },
  itemPrice: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  itemConatiner: {
    borderWidth: 1,
    borderColor: Colors.primary300,
    borderRadius: 10,
    marginTop: 6,
    padding: 6,
  },
  stepIndicatorContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  stepsDate: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  date: {
    color: Colors.text,
  },
});

const stepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4aae4f',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4aae4f',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#4aae4f',
};
