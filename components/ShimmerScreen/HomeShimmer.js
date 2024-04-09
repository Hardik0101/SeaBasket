import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import HorizontalItemSimmer from './HorizontalItemShimmer';

function HomeShimmer() {
  return (
    <>
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            marginHorizontal: 6,
          }}>
          <View
            style={{
              width: '100%',
              height: 40,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: '100%',
              height: 180,
              borderRadius: 8,
              marginTop: 6,
            }}
          />
        </View>
      </SkeletonPlaceholder>
      <HorizontalItemSimmer />
      <HorizontalItemSimmer />
    </>
  );
}

export default HomeShimmer;
