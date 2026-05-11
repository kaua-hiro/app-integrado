import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { salvarIMC, buscarHistoricoIMC } from "../database/bancoDados";


export default function ImcScreen({ navigation }) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState("Preencha os campos");
  const [corPainel, setCorPainel] = useState("#232946");
  const [usuarioId] = useState(1); // TODO: Pegar do contexto de usuário logado

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const historico = await buscarHistoricoIMC(usuarioId);
      console.log('📊 Histórico de IMC:', historico);
    } catch (error) {
      console.error('❌ Erro ao carregar histórico:', error);
    }
  };


  // Formata altura automaticamente para X.XX
  const handleAlturaChange = (text) => {
    const numeros = text.replace(/\D/g, "");
    let formatada = numeros;
    if (numeros.length > 2) {
      formatada = `${numeros.slice(0, 1)}.${numeros.slice(1, 3)}`;
    } else if (numeros.length > 1) {
      formatada = `${numeros.slice(0, 1)}.${numeros.slice(1)}`;
    }
    setAltura(formatada.slice(0, 4));
  };


  // Calcula IMC e define status e cor
  const calcularIMC = async () => {
    const p = parseFloat(peso.replace(",", "."));
    const a = parseFloat(altura);
    if (isNaN(p) || isNaN(a) || a <= 0) {
      alert("Insira valores válidos para peso e altura.");
      return;
    }
    const imcCalc = (p / (a * a)).toFixed(1);
    setResultado(imcCalc);
    if (imcCalc < 18.5) {
      setStatus("Baixo Peso");
      setCorPainel("#3A86FF");
    } else if (imcCalc >= 18.5 && imcCalc <= 24.9) {
      setStatus("Saudável");
      setCorPainel("#43AA8B");
    } else if (imcCalc >= 25 && imcCalc <= 29.9) {
      setStatus("Sobrepeso");
      setCorPainel("#FFD60A");
    } else if (imcCalc >= 30 && imcCalc <= 39.9) {
      setStatus("Obesidade");
      setCorPainel("#FF8800");
    } else {
      setStatus("Obesidade Grave");
      setCorPainel("#FF006E");
    }

    // ✅ NOVO: Salvar no banco de dados
    try {
      await salvarIMC(usuarioId, imcCalc, p, a);
      console.log('✅ IMC salvo no banco');
    } catch (error) {
      console.error('❌ Erro ao salvar IMC:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#181A20" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>IMC Fácil</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>CALCULADORA DE IMC</Text>
          <View style={styles.inputGroup}>
            <View style={[styles.resultBox, { backgroundColor: corPainel }]}> 
              <Text style={styles.resultLabel}>IMC</Text>
              <Text style={styles.resultValue}>
                {resultado !== null ? resultado : "--"}
              </Text>
              <Text style={styles.resultStatus}>{status}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Peso (kg) ex: 70.5"
              keyboardType="numeric"
              value={peso}
              onChangeText={setPeso}
              placeholderTextColor="#A0A0A0"
            />
            <View>
              <TextInput
                style={styles.input}
                placeholder="Altura (ex: 175 para 1.75m)"
                keyboardType="numeric"
                value={altura}
                onChangeText={handleAlturaChange}
                maxLength={4}
                placeholderTextColor="#A0A0A0"
              />
              <Text style={styles.helpText}>
                Digite apenas números (ex: 175)
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={calcularIMC}>
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>
              TABELA DE CLASSIFICAÇÃO
            </Text>
          </View>
          <View style={styles.tableRowLabel}>
            <Text style={styles.columnHeader}>IMC</Text>
            <Text style={styles.columnHeader}>STATUS</Text>
            <Text style={styles.columnHeader}>GRAU</Text>
          </View>
          <TableRow label="MENOR QUE 18,5" desc="BAIXO PESO" grau="0" />
          <TableRow label="ENTRE 18,5 E 24,9" desc="SAUDÁVEL" grau="0" />
          <TableRow label="ENTRE 25,0 E 29,9" desc="SOBREPESO" grau="I" />
          <TableRow label="ENTRE 30,0 E 39,9" desc="OBESIDADE" grau="II" />
          <TableRow label="MAIOR QUE 40,0" desc="OBESIDADE GRAVE" grau="III" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const TableRow = ({ label, desc, grau }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableCell}>{label}</Text>
    <Text style={styles.tableCell}>{desc}</Text>
    <Text style={[styles.tableCell, { textAlign: "center" }]}>{grau}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181A20",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 20,
  },
  logoText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#43AA8B",
    letterSpacing: 3,
    textShadowColor: "rgba(67,170,139,0.3)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  card: {
    backgroundColor: "#232946",
    width: "90%",
    maxWidth: 400,
    borderRadius: 15,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#F4F4F4",
    marginBottom: 20,
  },
  resultBox: {
    width: 140,
    height: 110,
    borderRadius: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#232946",
  },
  resultLabel: { color: "#F4F4F4", fontSize: 13 },
  resultValue: { color: "#F4F4F4", fontSize: 26, fontWeight: "bold" },
  resultStatus: { color: "#F4F4F4", fontSize: 15, fontWeight: "500" },
  inputGroup: {
    width: "100%",
  },
  input: {
    backgroundColor: "#232946",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    color: "#F4F4F4",
    borderWidth: 1,
    borderColor: "#393E46",
  },
  helpText: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: -8,
    marginBottom: 10,
    paddingLeft: 5,
  },
  button: {
    backgroundColor: "#3A86FF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    width: "90%",
    maxWidth: 600,
    backgroundColor: "#232946",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#393E46",
  },
  tableHeader: {
    backgroundColor: "#3A86FF",
    padding: 12,
  },
  tableHeaderText: {
    color: "#F4F4F4",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  tableRowLabel: {
    flexDirection: "row",
    backgroundColor: "#232946",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#393E46",
  },
  columnHeader: {
    flex: 1,
    color: "#A0A0A0",
    fontWeight: "bold",
    fontSize: 11,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#393E46",
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    color: "#F4F4F4",
    fontSize: 12,
    textAlign: "center",
  },
});
