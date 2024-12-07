// AppText.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

function AppText({ texto, style }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    padding: 10,
    borderRadius: 8, 
    marginVertical: 10,
    textAlign: 'center',
  },
  text: {
    color: '#000', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppText;