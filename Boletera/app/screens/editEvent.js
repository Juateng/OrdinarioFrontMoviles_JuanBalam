import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

function EditEvent({ route, navigation }) {
  const { event } = route.params;

  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [place, setPlace] = useState(event.place);
  const [description, setDescription] = useState(event.description);

  const handleEdit = async () => {
    try {
      const response = await fetch('https://backdesarollomovil.onrender.com/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date,
          place,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Evento actualizado correctamente');
        navigation.goBack(); // Volver a la pantalla anterior
      } else {
        Alert.alert('Error', data.msg || 'Error al actualizar el evento');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el evento');
      console.error('Error updating event:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Evento</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del evento"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Fecha"
      />
      <TextInput
        style={styles.input}
        value={place}
        onChangeText={setPlace}
        placeholder="Lugar"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        multiline
      />
      <Button title="Actualizar Evento" onPress={handleEdit} />
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default EditEvent;