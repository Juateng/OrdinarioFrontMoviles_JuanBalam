import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const ViewTicketScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://backdesarollomovil.onrender.com/ticket-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setTicketData(data.ticket); // Guardar los datos completos del ticket
      } else {
        setError(data.msg); // Mostrar mensaje de error
      }
    } catch (err) {
      setError('Error al obtener el ticket.'); // Error en la conexión
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ver Ticket</Text>

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

      <Button title="Ver Ticket" onPress={handleSubmit} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {ticketData && (
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketText}>Usuario: {ticketData.username}</Text>
          <Text style={styles.ticketText}>Correo: {ticketData.email}</Text>
          <Text style={styles.ticketText}>Evento: {ticketData.name}</Text>
          <Text style={styles.ticketText}>Fecha del evento: {ticketData.event_date}</Text>
          <Text style={styles.ticketText}>Lugar: {ticketData.event_place}</Text>
          <Text style={styles.ticketText}>Descripción: {ticketData.event_description}</Text>
        </View>
      )}
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  ticketInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  ticketText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ViewTicketScreen;
