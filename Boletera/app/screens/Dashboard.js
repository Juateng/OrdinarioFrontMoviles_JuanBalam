import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import AppText from '../components/AppText';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Dashboard({ navigation }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Inicializa en null para manejar el estado de carga

  useEffect(() => {
    // Verificar si el token está en el almacenamiento local
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      // Redirigir al login solo después de que isAuthenticated se haya actualizado
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]); // Esto se ejecutará solo cuando isAuthenticated cambie

  if (isAuthenticated === null) {
    // Mostrar pantalla de carga mientras verificas la autenticación
    return <View><AppText texto="Cargando..." color="white" /></View>;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/3185113.jpg')}
    >
      <View style={styles.buttonContainer}> 
        <AppText texto={"Bienvenido, ¿Qué desea hacer?"} color="white" />
        <AppButton 
          text={'Mi perfil'} 
          color='primary' 
          onPress={() => navigation.navigate('Profile')} 
        />
        <AppButton 
          text={'Eventos'} 
          color='white' 
          onPress={() => navigation.navigate('Eventos')} 
        />
        <AppButton 
          text={'Mis tickets'} 
          color='primary' 
          onPress={() => navigation.navigate('ViewTicket')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
    margin: 20,
  },
});

export default Dashboard;