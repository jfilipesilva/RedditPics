import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/PostScreen'

type MainStackParamList = {
  HomeScreen: undefined
  PostScreen: { postUrl: string }
}

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>

const Stack = createNativeStackNavigator<MainStackParamList>()

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Reddit' }}
        />
        <Stack.Screen
          name="PostScreen"
          component={PostScreen}
          options={{ title: 'Post' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStack
