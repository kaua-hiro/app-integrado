import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardPicker } from '../components/CardPicker';
import { produtos, bebidas } from '../constants/data';
import { calcularTotal, formatarMoeda, gerarResumoPedido } from '../utils/businessRules';

export const Home = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState('Hambúrguer');
  const [bebidaSelecionada, setBebidaSelecionada] = useState('Refrigerante');

  const total = calcularTotal(produtos[produtoSelecionado].preco, bebidas[bebidaSelecionada].preco);

  const confirmarPedido = () => {
    const resumo = gerarResumoPedido(produtoSelecionado, bebidaSelecionada, total);
    if (typeof window !== 'undefined' && window.alert) {
      window.alert(`✅ Pedido Confirmado!\n\n${resumo}`);
    } else {
      import('react-native').then(({ Alert }) => {
        Alert.alert("✅ Pedido Confirmado!", resumo, [{ text: "OK" }]);
      });
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.appContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>FAÇA SEU PEDIDO</Text>
            <Text style={styles.headerTitle}>DevFood</Text>
          </View>

          <CardPicker
            titulo="Escolha seu lanche"
            itens={produtos}
            selecionado={produtoSelecionado}
            setSelecionado={setProdutoSelecionado}
          />

          <CardPicker
            titulo="Escolha sua bebida"
            itens={bebidas}
            selecionado={bebidaSelecionada}
            setSelecionado={setBebidaSelecionada}
          />

          <View style={styles.receiptCard}>
            <Text style={styles.receiptTitle}>Resumo do pedido</Text>
            
            <View style={styles.receiptRow}>
              <Text style={styles.receiptItem}>1x {produtoSelecionado}</Text>
              <Text style={styles.receiptPrice}>{formatarMoeda(produtos[produtoSelecionado].preco)}</Text>
            </View>
            
            <View style={styles.receiptRow}>
              <Text style={styles.receiptItem}>1x {bebidaSelecionada}</Text>
              <Text style={styles.receiptPrice}>{formatarMoeda(bebidas[bebidaSelecionada].preco)}</Text>
            </View>

            <View style={styles.dashedLine} />

            <View style={styles.receiptRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatarMoeda(total)}</Text>
            </View>
          </View>

        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.9} onPress={confirmarPedido}>
            <Text style={styles.checkoutButtonText}>Confirmar Pedido</Text>
            <Text style={styles.checkoutButtonTotal}>{formatarMoeda(total)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EAECEE',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#FAFAFB',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8A94A6',
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1A1D1E',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1D1E',
    marginBottom: 16,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  receiptItem: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '500',
  },
  receiptPrice: {
    fontSize: 15,
    color: '#1A1D1E',
    fontWeight: '600',
  },
  dashedLine: {
    height: 1,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: '#1A1D1E',
    fontWeight: '800',
  },
  totalValue: {
    fontSize: 20,
    color: '#EA1D2C',
    fontWeight: '800',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  checkoutButton: {
    backgroundColor: '#EA1D2C',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 56,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  checkoutButtonTotal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  }
});