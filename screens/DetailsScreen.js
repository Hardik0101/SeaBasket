import {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearState, fetchAllProducts} from '../store/dataSlice';

function DetailScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(clearState());
    };
  }, []);

  //   console.log(data.data.allproducts);
  let product = data.data.allproducts;
  return (
    <ScrollView>
      {product.map((item, index) => (
        <>
          <Text key={index}>{item.id}</Text>

          <Text key={index}>{item.title}</Text>
        </>
      ))}
    </ScrollView>
  );
}

export default DetailScreen;
