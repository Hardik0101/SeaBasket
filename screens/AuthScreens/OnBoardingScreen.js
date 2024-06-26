import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {Colors} from '../../constant/styles';
import ButtonComponent from '../../components/UI/ButtonComponent';
import {AuthContext} from '../../store/auth-context';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('window');

function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const authCtx = useContext(AuthContext);
  const handleScroll = event => {
    const {contentOffset} = event.nativeEvent;
    const page = Math.round(contentOffset.x / width);
    setCurrentPage(page);
  };

  function handleLogin() {
    const gtoken = 'true';
    authCtx.setGuestUserToken(gtoken);
  }

  const pages = [
    {
      image: require('../../assets/images/step1.png'),
      title: 'Welcome to our SeaBasket App!',
      description: 'Explore endless shopping possibilities with our app.',
      notice: ' Swipe to continue ➤',
    },
    {
      image: require('../../assets/images/step2.png'),
      title: ' Easy Shopping Experience',
      description:
        'Effortless browsing and seamless checkout for stress-free shopping.',
      notice: ' Swipe to continue ➤',
    },
    {
      image: require('../../assets/images/step3.png'),
      title: 'Exclusive Offers Await',
      description:
        'Unlock unique discounts and special offers tailored to your interests.',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {pages.map((page, index) => (
          <View key={index} style={styles.pageContainer}>
            <Image style={styles.image} source={page.image} />
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.description}>{page.description}</Text>
            <Text style={styles.notice}>{page.notice}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.button}>
        {currentPage === pages.length - 1 && (
          <>
            <View style={styles.buttons}>
              <ButtonComponent
                buttonColor={'#2b5c3a'}
                color={'#FFFFFF'}
                children={'Get Started'}
                onPress={handleLogin}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'AnekDevanagari',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.secondary,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'AnekDevanagari',
    color: Colors.primary300,
  },
  image: {
    marginBottom: 10,
    width: width - 40,
    height: width - 40,
  },
  button: {
    marginBottom: 50,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  notice: {
    marginTop: 14,
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary300,
  },
});

export default OnboardingScreen;
