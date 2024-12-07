import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Button, Modal, Alert } from 'react-native';

function Eventos({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('https://backdesarollomovil.onrender.com/all');
        const data = await response.json();
        setEventos(data.Eventos);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const openModal = (evento) => {
    setSelectedEvent(evento);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch('https://backdesarollomovil.onrender.com/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedEvent.name }), // Enviamos el nombre del evento
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Evento eliminado correctamente');
        setEventos(eventos.filter((evento) => evento._id !== selectedEvent._id)); // Eliminamos el evento de la lista local
        closeModal(); // Cerramos el modal
      } else {
        throw new Error('Error al eliminar el evento');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el evento');
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = () => {
    if (selectedEvent) {
      navigation.navigate('EditEvent', { event: selectedEvent }); // Navegar a la pantalla de edición, pasando el evento
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Crear Nuevo Evento" onPress={() => navigation.navigate('Crear Evento')} />
      </View>
      {eventos.map((evento) => (
        <TouchableOpacity key={evento._id} style={styles.card} onPress={() => openModal(evento)}>
          <Text style={styles.eventName}>{evento.name}</Text>
          <Text style={styles.eventDate}>{evento.date}</Text>
          <Text style={styles.eventLocation}>{evento.place}</Text>
          <Text style={styles.eventDescription}>{evento.description}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal para ver detalles del evento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                <Text style={styles.modalText}>Fecha: {selectedEvent.date}</Text>
                <Text style={styles.modalText}>Lugar: {selectedEvent.place}</Text>
                <Text style={styles.modalText}>Descripción: {selectedEvent.description}</Text>
                
                <View style={styles.modalButtons}>
                  <Button title="Cerrar" onPress={closeModal} />
                  <Button title="Eliminar" color="red" onPress={handleDelete} />
                  <Button title="Editar" onPress={handleEdit} />
                </View>

                {/* Botón Registrar en una nueva fila */}
                <View style={styles.registerButtonContainer}>
                  <Button title="Registrar" color="green" onPress={() => alert('Registrado')} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  buttonContainer: {
    marginBottom: 20, // Aquí se añade el margen entre el botón y el primer evento
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left', // Alineación a la derecha
  },
  eventDate: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
    textAlign: 'left', // Alineación a la derecha
  },
  eventLocation: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
    textAlign: 'left', // Alineación a la derecha
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left', // Alineación a la derecha
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-start', // Alineación de contenido del modal a la derecha
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left', // Alineación a la derecha
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left', // Alineación a la derecha
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  registerButtonContainer: {
    marginTop: 20, // Separa el botón Registrar de los anteriores
    width: '100%',
  },
});

export default Eventos;