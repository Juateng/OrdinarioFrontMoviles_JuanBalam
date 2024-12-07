import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function CreateEvent({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventPlace, setEventPlace] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleSubmit = () => {
    setLoading(true); // Indicamos que estamos haciendo una solicitud
    setError(null); // Limpiamos errores previos

    fetch('https://backdesarollomovil.onrender.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: eventName,
        date: eventDate,
        place: eventPlace,
        description: eventDescription,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`); // Si la respuesta no es ok, lanzamos un error
        }
        return response.text(); // Obtenemos la respuesta como texto primero
      })
      .then(text => {
        try {
          const data = JSON.parse(text); // Intentamos parsear el texto a JSON
          console.log('Evento creado:', data);
          navigation.goBack(); // Regresar a la pantalla de eventos
        } catch (error) {
          setError('Error al procesar la respuesta del servidor.');
          console.error('Error al parsear el JSON:', error);
        }
      })
      .catch(error => {
        setError('Error al crear evento. Intenta nuevamente.');
        console.error('Error al crear evento:', error);
      })
      .finally(() => {
        setLoading(false); // Desactivamos el indicador de carga
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>
      {error && <Text style={styles.errorText}>{error}</Text>} {/* Mostrar error si existe */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Lugar"
        value={eventPlace}
        onChangeText={setEventPlace}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={eventDescription}
        onChangeText={setEventDescription}
      />
      <Button
        title={loading ? "Creando..." : "Crear Evento"}
        onPress={handleSubmit}
        disabled={loading} // Desactivamos el botón mientras estamos cargando
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default CreateEvent;