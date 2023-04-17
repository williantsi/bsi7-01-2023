
import { Button, StyleSheet, Text, View } from 'react-native';

import { useState, useEffect } from 'react';
import api from './api';

export default function App() {
  const [data_resposta, setResposta] = useState('');
  const [data_pergunta, setPergunta] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setPergunta("O que é chipset?");
    api.get("chat/"+data_pergunta).then((response) => {
      
      setResposta(response.data.resposta); 
     
      
    });

   
    
    });

    

  return (
    <View style={styles.container}>

      <Text style={{fontWeight: 'bold', fontSize: 18}}>{data_pergunta}</Text>

      <Text>{data_resposta}</Text>

    </View>
  );  
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '95%',
    paddingTop: '15%'
  },

    
});