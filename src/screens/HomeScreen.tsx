import { useCallback, useMemo, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import useGetPosts, { PostType } from '../api/hooks/useGetPosts'
import Typography from '../components/atoms/Typography/Typography'
import Post from '../components/molecules/Post/Post'
import TabsBar from '../components/molecules/TabsBar/TabsBar'
import useTabBar from '../hooks/useTabBar'
import { MainStackScreenProps } from '../navigation/MainStack'

const HomeScreen = ({ navigation }: MainStackScreenProps<'HomeScreen'>) => {
  const [isRefetching, setIsRefetching] = useState(false)
  const postTypes: PostType[] = useMemo(() => ['new', 'top', 'hot'], [])
  const { tabSelected, handleSetTabSelected } = useTabBar(postTypes[0])

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    fetchNextPage,
  } = useGetPosts(tabSelected as PostType)

  const postsData = data?.pages.flatMap(
    (page) => page?.data.children.map((post) => post.data) ?? [],
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

  const handleRefreshList = async () => {
    setIsRefetching(true)
    await refetch()
    setIsRefetching(false)
  }

  const renderListEmptyComponent = useCallback(
    () => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <ActivityIndicator size={50} />
        ) : (
          <Typography>
            {isError
              ? 'Something went wrong. Please try again later.'
              : 'No posts found'}
          </Typography>
        )}
      </View>
    ),
    [isError, isLoading],
  )

  const renderListFooterComponent = useCallback(
    () =>
      isFetchingNextPage && postsData && postsData.length > 0 ? (
        <ActivityIndicator size={50} />
      ) : null,
    [isFetchingNextPage, postsData],
  )

  return (
    <SafeAreaView style={styles.root}>
      <TabsBar
        tabsNames={postTypes}
        tabSelected={tabSelected}
        onSetPostType={handleSetTabSelected}
      />
      <FlashList
        data={postsData}
        refreshing={isRefetching}
        onRefresh={handleRefreshList}
        onEndReached={handleOnEndReached}
        ListEmptyComponent={renderListEmptyComponent}
        ListFooterComponent={renderListFooterComponent}
        contentContainerStyle={styles.listContentContainer}
        ListFooterComponentStyle={styles.listFooterContainer}
        keyExtractor={(item, index) => item?.id ?? `post-${index}`}
        renderItem={({ item }) => (
          <Post post={item} onPostPress={handlePostPress} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  listContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  listFooterContainer: {
    paddingVertical: 20,
  },
})

export default HomeScreen
