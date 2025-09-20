const useExecuteQuery = () => {
  const execute = async <TResult>(endpoint: string) => {
    try {
      const result = await fetch(endpoint)
      const resultData = await result.json()
      return resultData as TResult
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error executing query:', error)
      return null
    }
  }

  return { execute }
}

export default useExecuteQuery
