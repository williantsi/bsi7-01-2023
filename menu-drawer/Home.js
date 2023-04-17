import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';

export default function Home() {
  const drawerStatus = useDrawerStatus();
  console.log(drawerStatus);

  return (
    <View style={styles.container}>
      <Text>Welcome Home!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
