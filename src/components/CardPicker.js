import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { formatarMoeda } from '../utils/businessRules';

export const CardPicker = ({ titulo, itens, selecionado, setSelecionado }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{titulo}</Text>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: itens[selecionado].img }} 
            style={styles.image} 
            resizeMode="contain" 
          />
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selecionado}
            onValueChange={(itemValue) => setSelecionado(itemValue)}
            style={styles.picker}
          >
            {Object.keys(itens).map((key) => (
              <Picker.Item 
                key={key} 
                label={`${key} - ${formatarMoeda(itens[key].preco)}`} 
                value={key} 
                color="#1A1A1A"
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  imageWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  picker: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
    outlineStyle: 'none',
  }
});