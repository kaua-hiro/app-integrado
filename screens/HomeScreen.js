import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const apps = [
    {
      id: 'IMC',
      title: 'Calculadora de IMC',
      icon: '📊',
      description: 'Calcule seu IMC e histórico',
    },
    {
      id: 'Conversor',
      title: 'Conversor de Moedas',
      icon: '💱',
      description: 'Converta moedas em tempo real',
    },
    {
      id: 'SistemaSolar',
      title: 'Sistema Solar',
      icon: '🌍',
      description: 'Explore planetas e galáxias',
    },
    {
      id: 'Pedidos',
      title: 'Histórico de Pedidos',
      icon: '📦',
      description: 'Seus pedidos e histórico',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Sistema Integrado</Text>
          <Text style={styles.subtitle}>Bem-vindo! Escolha um aplicativo</Text>
        </View>

        <View style={styles.gridContainer}>
          {apps.map((app) => (
            <TouchableOpacity
              key={app.id}
              style={styles.appCard}
              onPress={() => navigation.navigate(app.id)}
            >
              <Text style={styles.appIcon}>{app.icon}</Text>
              <Text style={styles.appTitle}>{app.title}</Text>
              <Text style={styles.appDescription}>{app.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  appCard: {
    width: '48%',
    backgroundColor: '#232946',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A86FF',
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  appIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  appDescription: {
    fontSize: 11,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF006E',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
