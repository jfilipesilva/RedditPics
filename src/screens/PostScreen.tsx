import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import { MainStackScreenProps } from '../navigation/MainStack'

const PostScreen = ({ route }: MainStackScreenProps<'PostScreen'>) => {
  const { postUrl } = route.params

  return (
    <SafeAreaView style={styles.root}>
      <WebView
        startInLoadingState
        source={{ uri: postUrl }}
        renderLoading={() => <ActivityIndicator />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})

export default PostScreen
