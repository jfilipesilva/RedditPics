import { PropsWithChildren } from 'react'
import NetInfo from '@react-native-community/netinfo'
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

type Props = Readonly<PropsWithChildren>
const queryClient = new QueryClient()

export default function QueryProvider({ children }: Props) {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
