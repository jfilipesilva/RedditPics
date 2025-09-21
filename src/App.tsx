import { StatusBar, StyleSheet, View } from 'react-native'
import QueryProvider from './contexts/QueryContext'
import MainStack from './navigation/ MainStack'

function App() {
  return (
    <QueryProvider>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <MainStack />
      </View>
    </QueryProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App
