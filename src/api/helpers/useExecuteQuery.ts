const useExecuteQuery = () => {
  const execute = async <TResult>(endpoint: string) => {
    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('HTTP error:', response.status, response.statusText)

        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const resultData = await response.json()
      return resultData as TResult
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error executing query:', error)
      throw error
    }
  }

  return { execute }
}

export default useExecuteQuery
