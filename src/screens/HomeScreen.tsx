import { Text, View } from 'react-native'
import useGetPosts from '../api/hooks/useGetPosts'

const HomeScreen = () => {
  const { data } = useGetPosts('top')

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen - Posts count: {data?.data.children.length}</Text>
    </View>
  )
}

export default HomeScreen
