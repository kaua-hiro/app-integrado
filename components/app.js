import { Text, View, StyleSheet, Image } from 'react-native';


export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Exemplo de asset local: personalize este espaço com sua logo ou imagem!
      </Text>
      <Image style={styles.logo} source={require('../assets/icon.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#43AA8B',
    textAlign: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#3A86FF',
  }
});
