import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { criarTabelas, conectarBanco } from './database/bancoDados';

// Importar as screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ImcScreen from './screens/ImcScreen';
import ConversorScreen from './screens/ConversorScreen';
import SistemaSolarScreen from './screens/SistemaSolarScreen';
import PedidosScreen from './screens/PedidosScreen';
import CadastroScreen from './screens/CadastroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Inicializa o banco de dados quando o app carrega
    inicializarBanco();
  }, []);

  const inicializarBanco = async () => {
    try {
      await conectarBanco();
      await criarTabelas();
      console.log('✅ Banco de dados inicializado');
    } catch (error) {
      console.error('❌ Erro ao inicializar banco:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#181A20' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Pilha de Autenticação */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen}
          options={{ headerShown: false }}
        />

        {/* Pilha Principal (após login) */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="IMC" 
          component={ImcScreen}
          options={{ title: 'Calculadora IMC' }}
        />
        <Stack.Screen 
          name="Conversor" 
          component={ConversorScreen}
          options={{ title: 'Conversor de Moedas' }}
        />
        <Stack.Screen 
          name="SistemaSolar" 
          component={SistemaSolarScreen}
          options={{ title: 'Sistema Solar' }}
        />
        <Stack.Screen 
          name="Pedidos" 
          component={PedidosScreen}
          options={{ title: 'Histórico de Pedidos' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
