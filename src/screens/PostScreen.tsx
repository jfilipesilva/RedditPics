import { View } from 'react-native'
import WebView from 'react-native-webview'
import { MainStackScreenProps } from '../navigation/ MainStack'

const PostScreen = ({ route }: MainStackScreenProps<'PostScreen'>) => {
  const { postUrl } = route.params
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: postUrl }} />
    </View>
  )
}

export default PostScreen
