import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import React, {useState} from 'react';
import { API_KEY } from '@env';

export default function App() {
  
  const [resposta, setResposta] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [status, setStatus] = useState('Pesquisar');

  return (
    <View style={styles.container}>

      <ScrollView style={{borderWidth: resposta=='' ? 0 : 1, borderRadius: 10, paddingLeft: 10, borderColor: '#fff', width: '94%'}}>

        <Text selectable={true} style={styles.resposta}> 
          { resposta } 
        </Text>

      </ScrollView>

      <TextInput
        placeholder="Informe sua pergunta"
        onChangeText={text=>setPergunta(text)}
        style={styles.input}
        placeholderTextColor = "#fff"
      />

      <Button
        title={status}
        onPress={onPress}
        disabled={status=='Pesquisar' ? false : true }
      />

      <StatusBar style="auto" />

    </View>
    
  );

  async function onPress(){

    setStatus("Pesquisando...");

     // Requisição para chatgpt
     await fetch("https://api.openai.com/v1/completions", {
      
         // Método para enviar os dados
         method: "POST",

         // Dados ennviados no cabeçalho da requisição
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             Authorization: "Bearer " + API_KEY,
         },

         // Enviar os dados no corpo da requisição
         body: JSON.stringify({
             model: "text-davinci-003", //Modelo
             prompt: pergunta, // Texto da pergunta
             max_tokens: 2048, // Tamanho da resposta
             temperature: 0.7 // Criatividade na resposta
         }),
     })
         // Acessa o then quando obtiver resposta
         .then((resposta) => resposta.json())
         .then((dados) => {
             setResposta(dados.choices[0].text);
             setStatus("Pesquisar");
         })
         // Retorna catch quando gerar erro
         .catch(() => {
            setResposta("Sem resposta");
            setStatus("Pesquisar");
         });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#000',
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom:20,
    marginTop:20,
    color: '#fff'
  },
  resposta: {
    textAlign:'auto',
    color:'#999', 
    padding:10,
    
  },
  scrolview: {
    margin:2,
  }
});