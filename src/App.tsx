import { StyleSheet, View } from 'react-native'
import MainStack from "./navigation/ MainStack";

function App() {
  return (
    <View style={styles.container}>
      <MainStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
