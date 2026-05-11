import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const SectionPicker = ({ titulo, itens, selecionado, setSelecionado, estiloFundo, corBorda }) => {
  return (
    <View style={[styles.section, { backgroundColor: estiloFundo, borderLeftColor: corBorda }]}>
      <Text style={styles.label}>{titulo}</Text>
      <Picker
        selectedValue={selecionado}
        onValueChange={(itemValue) => setSelecionado(itemValue)}
        style={styles.picker}
      >
        {Object.keys(itens).map((key) => (
          <Picker.Item 
            key={key} 
            label={`${key} - R$ ${itens[key].preco.toFixed(2).replace('.', ',')}`} 
            value={key} 
          />
        ))}
      </Picker>
      <Image 
        source={{ uri: itens[selecionado].img }} 
        style={styles.image} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#495057',
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 10,
  }
});