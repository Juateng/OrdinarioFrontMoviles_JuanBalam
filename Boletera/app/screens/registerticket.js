import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const RegisterTicketScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleRegisterTicket = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('https://backdesarollomovil.onrender.com/ticket-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          name,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage(data.msg); // Mostrar mensaje de éxito
      } else {
        setError(data.msg); // Mostrar mensaje de error
      }
    } catch (err) {
      setError('Hubo un error al registrar el ticket.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Ticket</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Evento"
        value={name}
        onChangeText={setName}
      />

      <Button title="Registrar Ticket" onPress={handleRegisterTicket} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {message && <Text style={styles.successText}>{message}</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterTicketScreen;
