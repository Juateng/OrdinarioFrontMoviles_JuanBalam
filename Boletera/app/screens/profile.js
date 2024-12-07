import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Simula datos de usuario (puedes reemplazarlo con datos reales más adelante)
  const user = {
    username: 'UsuarioEjemplo',
    email: 'usuario@example.com',
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    navigation.navigate('Login'); // Redirige a la pantalla de Login
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información del Usuario</Text>
        <Text style={styles.userText}>Nombre de usuario: {user.username}</Text>
        <Text style={styles.userText}>Email: {user.email}</Text>
      </View>

      {/* Botón para cerrar sesión */}
      <Button title="Cerrar sesión" color="#007bff" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  userText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default ProfileScreen;