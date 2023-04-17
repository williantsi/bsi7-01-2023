import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { database } from './config/fb';
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Settings() {
  const [chaves, setChaves] = useState([]);
  const [novaChave, setNovaChave] = useState('');

  useEffect(() => {
    const collectionRef = collection(database, 'chaves');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

const unsubscribe = onSnapshot(q, querySnapshot => {
    console.log('querySnapshot unsusbscribe');

      setChaves(
        querySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
        }))
      );
    });
return unsubscribe;
},[]);

const onEdit = () => {
  const docRef = doc(database, 'chaves', chaves[0].id);
  updateDoc(docRef, {
      name: novaChave,
  });
}

  return (
    <View style={styles.container}>
  
    <Text>API_KEY do ChatGPT</Text>
        {chaves.map(chave => 
            <TextInput style={styles.input} key={chave.id} {...chave}
              onChangeText={text=>setNovaChave(text)} >
              {chave.name}
            </TextInput>)}
       
        <TouchableOpacity 
            onPress={onEdit}
            disabled={novaChave=='' ? true : false }
            style={styles.button}>
            
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#000',
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 15,
              paddingRight: 15,
              borderColor: novaChave=='' ? '#fff' : '#000',
              backgroundColor: novaChave=='' ? '#fff' : '#583',
            }}>

                <Text style={{color: novaChave=='' ? '#fff' : '#000'}}>Atualizar</Text>

            </Text>

        </TouchableOpacity>

        <StatusBar style="auto" />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:50,
    paddingLeft:'3%',
  },
  input: {
    borderColor: "gray",
    width: "90%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom:20,
    marginTop:20,
  },
});
