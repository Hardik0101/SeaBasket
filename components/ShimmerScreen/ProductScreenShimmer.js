import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ItemShimmer from './ItemShimmer';

function ProductScreenShimmer() {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 6,
            gap: 6,
          }}>
          <View
            style={{
              width: 120,
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 120,
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 120,
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginTop: 8,
          }}>
          <View
            style={{
              width: 100,
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 100,
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
        </View>
      </SkeletonPlaceholder>
      <ItemShimmer />
      <ItemShimmer />
      <ItemShimmer />
    </>
  );
}

export default ProductScreenShimmer;
