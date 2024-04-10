import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
function HorizontalItemSimmer() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={{marginHorizontal: 6}}>
        <View
          style={{
            width: 140,
            height: 24,
            borderRadius: 8,
            marginTop: 10,
            marginBottom: 4,
          }}
        />
        <View style={{flexDirection: 'row', gap: 8}}>
          <View
            style={{
              width: 168,
              height: 218,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 168,
              height: 218,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
          <View
            style={{
              width: 168,
              height: 218,
              borderRadius: 8,
              marginTop: 4,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}
export default HorizontalItemSimmer;
