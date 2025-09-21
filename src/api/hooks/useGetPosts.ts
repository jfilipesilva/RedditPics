import { useInfiniteQuery } from '@tanstack/react-query'
import useExecuteQuery from '../helpers/useExecuteQuery'
import { RedditPosts } from '../types'

export type PostType = 'new' | 'top' | 'hot'

const useGetPosts = (postType: PostType) => {
  const { execute } = useExecuteQuery()

  return useInfiniteQuery({
    queryKey: ['posts', postType],
    queryFn: ({ pageParam }) => {
      const after = pageParam ? `&after=${pageParam}` : ''
      return execute<RedditPosts>(
        `https://api.reddit.com/r/pics/${postType}.json?limit=10${after}`,
      )
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage?.data?.after,
  })
}

export default useGetPosts
