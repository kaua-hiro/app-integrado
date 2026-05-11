import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { salvarPedido, buscarHistoricoPedidos } from '../database/bancoDados';

export default function PedidosScreen() {
  const [lanche, setLanche] = useState(40);
  const [bebida, setBebida] = useState(8);
  const [total, setTotal] = useState(48);
  const [historico, setHistorico] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const USUARIO_ID_MOCK = 1;

  useEffect(() => {
    setTotal(Number(lanche) + Number(bebida));
  }, [lanche, bebida]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const dados = await buscarHistoricoPedidos(USUARIO_ID_MOCK);
      setHistorico(dados);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const handleConfirmarPedido = async () => {
    const valLanche = Number(lanche);
    const valBebida = Number(bebida);

    const nomeLanche = valLanche === 40 ? 'Pizza' : valLanche === 30 ? 'Hambúrguer' : 'Sushi';
    const nomeBebida = valBebida === 8 ? 'Refrigerante' : valBebida === 10 ? 'Suco' : 'Água';
    const resumo = `1x ${nomeLanche}, 1x ${nomeBebida} - Total: R$ ${total},00`;

    try {
      await salvarPedido(USUARIO_ID_MOCK, resumo);
      setMensagem('Pedido confirmado com sucesso!');
      carregarHistorico(); 
      
      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      setMensagem('Erro ao salvar pedido.');
    }
  };
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Container Interno que segura a responsividade */}
      <View style={styles.innerContainer}>
        
        <View style={styles.header}>
          <Text style={styles.subtitle}>FAÇA SEU PEDIDO</Text>
          <Text style={styles.title}>DevFood</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Escolha seu lanche</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.emoji}>🍕</Text>
            <Picker
              selectedValue={lanche}
              style={styles.picker}
              onValueChange={(itemValue) => setLanche(itemValue)}
            >
              <Picker.Item label="Pizza - R$ 40,00" value={40} />
              <Picker.Item label="Hambúrguer - R$ 30,00" value={30} />
              <Picker.Item label="Sushi - R$ 50,00" value={50} />
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Escolha sua bebida</Text>
          <View style={styles.pickerContainer}>
            <Text style={styles.emoji}>🧃</Text>
            <Picker
              selectedValue={bebida}
              style={styles.picker}
              onValueChange={(itemValue) => setBebida(itemValue)}
            >
              <Picker.Item label="Refrigerante - R$ 8,00" value={8} />
              <Picker.Item label="Suco - R$ 10,00" value={10} />
              <Picker.Item label="Água - R$ 5,00" value={5} />
            </Picker>
          </View>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoTitle}>Resumo do pedido</Text>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoText}>1x Lanche</Text>
            <Text style={styles.resumoText}>R$ {lanche},00</Text>
          </View>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoText}>1x Bebida</Text>
            <Text style={styles.resumoText}>R$ {bebida},00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.resumoRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalValue}>R$ {total},00</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleConfirmarPedido}>
          <Text style={styles.buttonText}>Confirmar Pedido - R$ {total},00</Text>
        </TouchableOpacity>

        {mensagem !== '' && (
          <Text style={styles.mensagemSucesso}>{mensagem}</Text>
        )}

        <View style={styles.historicoContainer}>
          <Text style={styles.historicoTitle}>Meus Pedidos Anteriores</Text>
          {historico.map((item, index) => (
            <View key={index} style={styles.historicoItem}>
              <Text style={styles.historicoDesc}>{item.descricao}</Text>
              <Text style={styles.historicoData}>
                {new Date(item.data).toLocaleDateString('pt-BR')} - {new Date(item.data).toLocaleTimeString('pt-BR')}
              </Text>
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  /* Nova Regra: Centraliza o conteúdo dentro do ScrollView */
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center', 
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  /* Nova Regra: Limita a largura máxima no PC e ocupa 100% no Mobile */
  innerContainer: {
    width: '100%',
    maxWidth: 500, 
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    ...Platform.select({
      web: {
        borderWidth: 0,
        outline: 'none',
        backgroundColor: 'transparent',
      }
    })
  },
  resumoCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resumoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resumoText: {
    fontSize: 16,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E63946',
  },
  button: {
    backgroundColor: '#E63946',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagemSucesso: {
    color: '#2A9D8F',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historicoContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  historicoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historicoItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#E63946',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  historicoDesc: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  historicoData: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  }
});