import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

function WelcomeScreen({ texto, navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/3185113.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/Designer.png')} />
        <AppText texto={"Eventos Mayab"} color="white" />
      </View>

      <View style={styles.startButton}>
        <AppButton 
          text="Comenzar" 
          color="white" 
          onPress={() => navigation.navigate('Dashboard')} 
        />
      </View>
    </ImageBackground>
  );
}

  
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    position: 'absolute',
    top: 120,
    alignItems: 'center',
  },
  startButton: {
    padding: 20,
    width: '100%',
  },
});

export default WelcomeScreen;