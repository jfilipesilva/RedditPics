import { useCallback } from 'react'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator } from 'react-native'
import useGetPosts, { PostType } from '../api/hooks/useGetPosts'
import Post from '../components/molecules/Post/Post'
import TabsBar from '../components/molecules/TabsBar/TabsBar'
import useTabBar from '../hooks/useTabBar'
import { MainStackScreenProps } from '../navigation/ MainStack'

const HomeScreen = ({ navigation }: MainStackScreenProps<'HomeScreen'>) => {
  const postTypes: PostType[] = ['new', 'top', 'hot']
  const { tabSelected, handleSetTabSelected } = useTabBar(postTypes[0])

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPosts(
    tabSelected as PostType,
  )

  const postsData = data?.pages.flatMap((page) =>
    page?.data.children.map((post) => post.data),
  )

  const handlePostPress = useCallback(
    (postUrl: string) => {
      navigation.navigate('PostScreen', { postUrl })
    },
    [navigation],
  )

  const handleOnEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <FlashList
      data={postsData}
      onEndReached={handleOnEndReached}
      ListHeaderComponent={
        <TabsBar tabsNames={postTypes} onSetPostType={handleSetTabSelected} />
      }
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      renderItem={({ item: post }) => (
        <Post post={post} onPostPress={handlePostPress} />
      )}
    />
  )
}

export default HomeScreen
