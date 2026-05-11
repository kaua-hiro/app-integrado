import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let banco;

// 1. CONEXÃO (Ignora no Web)
export async function conectarBanco() {
  if (Platform.OS === 'web') return null; 
  
  if (!banco) {
    banco = await SQLite.openDatabaseAsync('sistema_integrado.db');
    await banco.execAsync('PRAGMA journal_mode = WAL');
  }
  return banco;
}

// 2. CRIAÇÃO DAS TABELAS
export async function criarTabelas() {
  if (Platform.OS === 'web') {
    console.log('🌐 Modo Web Ativado: Simulando banco de dados no LocalStorage.');
    return;
  }

  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS imc_historico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      resultado REAL,
      data TEXT
    );
    CREATE TABLE IF NOT EXISTS pedidos_historico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      descricao TEXT,
      data TEXT
    );
  `);
}

// 3. CRIAR CONTA DE USUÁRIO
export async function criarUsuario(nome, email, senha) {
  // Se for Web, salva no Navegador
  if (Platform.OS === 'web') {
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === email)) throw new Error('Email já em uso');
    
    const novoId = Date.now(); // Gera um ID falso
    usuarios.push({ id: novoId, nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return novoId;
  }

  // Se for Mobile, salva no SQLite
  const db = await conectarBanco();
  const resultado = await db.runAsync(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);',
    nome, email, senha
  );
  return resultado.lastInsertRowId;
}

// 4. FAZER LOGIN
export async function autenticarUsuario(email, senha) {
  if (Platform.OS === 'web') {
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    return usuario || null;
  }

  const db = await conectarBanco();
  const usuario = await db.getFirstAsync(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?;',
    email, senha
  );
  return usuario;
}

// 5. SALVAR HISTÓRICO DO IMC
export async function salvarImc(usuario_id, resultado) {
  const dataAtual = new Date().toISOString();

  if (Platform.OS === 'web') {
    let historico = JSON.parse(localStorage.getItem('imc_historico') || '[]');
    historico.push({ id: Date.now(), usuario_id, resultado, data: dataAtual });
    localStorage.setItem('imc_historico', JSON.stringify(historico));
    return;
  }

  const db = await conectarBanco();
  await db.runAsync(
    'INSERT INTO imc_historico (usuario_id, resultado, data) VALUES (?, ?, ?);',
    usuario_id, resultado, dataAtual
  );
}

// 6. SALVAR HISTÓRICO DE PEDIDOS
export async function salvarPedido(usuario_id, descricao) {
  const dataAtual = new Date().toISOString();

  if (Platform.OS === 'web') {
    let historico = JSON.parse(localStorage.getItem('pedidos_historico') || '[]');
    historico.push({ id: Date.now(), usuario_id, descricao, data: dataAtual });
    localStorage.setItem('pedidos_historico', JSON.stringify(historico));
    return;
  }

  const db = await conectarBanco();
  await db.runAsync(
    'INSERT INTO pedidos_historico (usuario_id, descricao, data) VALUES (?, ?, ?);',
    usuario_id, descricao, dataAtual
  );
}

// 7. BUSCAR HISTÓRICO DO IMC
export async function buscarHistoricoIMC(usuario_id) {
  if (Platform.OS === 'web') {
    let historico = JSON.parse(localStorage.getItem('imc_historico') || '[]');
    // Retorna apenas o histórico do usuário logado
    return historico.filter(item => item.usuario_id === usuario_id);
  }

  const db = await conectarBanco();
  const resultados = await db.getAllAsync(
    'SELECT * FROM imc_historico WHERE usuario_id = ? ORDER BY id DESC;',
    usuario_id
  );
  return resultados;
}

// 8. BUSCAR HISTÓRICO DE PEDIDOS
export async function buscarHistoricoPedidos(usuario_id) {
  if (Platform.OS === 'web') {
    let historico = JSON.parse(localStorage.getItem('pedidos_historico') || '[]');
    return historico.filter(item => item.usuario_id === usuario_id);
  }

  const db = await conectarBanco();
  const resultados = await db.getAllAsync(
    'SELECT * FROM pedidos_historico WHERE usuario_id = ? ORDER BY id DESC;',
    usuario_id
  );
  return resultados;
}