import { useQuery } from '@tanstack/react-query'
import useExecuteQuery from '../helpers/useExecuteQuery'
import { RedditPosts } from '../types'

type PostType = 'new' | 'top' | 'hot'

const useGetPosts = (postType: PostType) => {
  const { execute } = useExecuteQuery()

  return useQuery({
    queryKey: ['posts', postType],
    queryFn: () =>
      execute<RedditPosts>(`https://api.reddit.com/r/pics/${postType}.json`),
  })
}

export default useGetPosts
