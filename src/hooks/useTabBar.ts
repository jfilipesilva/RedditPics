import { useState } from 'react'

const useTabBar = (initialState = '') => {
  const [tabSelected, setTabSelected] = useState(initialState)

  const handleSetTabSelected = (tabName: string) => {
    setTabSelected(tabName)
  }

  return { tabSelected, handleSetTabSelected }
}

export default useTabBar
