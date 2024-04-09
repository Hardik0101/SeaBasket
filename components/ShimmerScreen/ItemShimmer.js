import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
function ItemShimmer() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          marginTop: 4,
          marginHorizontal: 6,
        }}>
        <View
          style={{
            width: 170,
            height: 218,
            borderRadius: 8,
            marginTop: 4,
          }}
        />
        <View
          style={{
            width: 170,
            height: 218,
            borderRadius: 8,
            marginTop: 4,
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
export default ItemShimmer;
