import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, FlatList, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { planetsData, galaxiesData } from '../data';

export default function SistemaSolarScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('planets');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentData = activeTab === 'planets' ? planetsData : galaxiesData;

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Stellar Explorer</Text>
        <Text style={styles.subtitle}>Explore as maravilhas do Cosmos</Text>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeTab === 'planets' && styles.activeBtn]}
            onPress={() => setActiveTab('planets')}
          >
            <Text style={[styles.toggleText, activeTab === 'planets' && styles.activeText]}>Sistema Solar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeTab === 'galaxies' && styles.activeBtn]}
            onPress={() => setActiveTab('galaxies')}
          >
            <Text style={[styles.toggleText, activeTab === 'galaxies' && styles.activeText]}>Galáxias</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={currentData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridList}
        columnWrapperStyle={styles.row}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>

            {selectedItem && (
              <ScrollView contentContainerStyle={styles.modalBody}>
                <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                
                <View style={styles.badges}>
                  <Text style={styles.badge}>{selectedItem.type}</Text>
                </View>
                
                <Text style={styles.modalDesc}>{selectedItem.description}</Text>
                
                <View style={styles.attributes}>
                  <Text style={styles.attrText}>Diâmetro: {selectedItem.diameter}</Text>
                  <Text style={styles.attrText}>Distância: {selectedItem.distance}</Text>
                  {selectedItem.gravity && <Text style={styles.attrText}>Gravidade: {selectedItem.gravity}</Text>}
                  {selectedItem.moons && <Text style={styles.attrText}>Luas: {selectedItem.moons}</Text>}
                  {selectedItem.temp && <Text style={styles.attrText}>Temperatura: {selectedItem.temp}</Text>}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05050a' },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00d2ff', textTransform: 'uppercase' },
  subtitle: { color: '#a0aab2', fontSize: 14, marginTop: 5 },
  toggleContainer: { flexDirection: 'row', marginTop: 20, gap: 10 },
  toggleBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  activeBtn: { backgroundColor: '#8a2be2', borderColor: '#8a2be2' },
  toggleText: { color: '#ffffff', fontWeight: '600' },
  activeText: { color: '#ffffff' },
  gridList: { padding: 10 },
  row: { justifyContent: 'space-between' },
  card: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 15, margin: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  cardImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', maxHeight: '85%', backgroundColor: '#111118', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  closeBtn: { alignSelf: 'flex-end', padding: 10 },
  closeBtnText: { color: '#a0aab2', fontSize: 30 },
  modalBody: { alignItems: 'center', paddingBottom: 20 },
  modalImage: { width: 200, height: 200, borderRadius: 100, marginBottom: 20 },
  modalTitle: { fontSize: 28, color: '#ffffff', fontWeight: 'bold', marginBottom: 10 },
  badges: { flexDirection: 'row', marginBottom: 15 },
  badge: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#00d2ff', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20, textTransform: 'uppercase', fontSize: 12 },
  modalDesc: { color: '#a0aab2', textAlign: 'center', lineHeight: 22, marginBottom: 20 },
  attributes: { width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', padding: 15, borderRadius: 15 },
  attrText: { color: '#ffffff', marginBottom: 5, fontSize: 14 }
});