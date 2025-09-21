import { useCallback, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import useGetPosts, { PostType } from '../api/hooks/useGetPosts'
import { MainStackScreenProps } from '../navigation/ MainStack'
import { timeAgo } from '../utils/date'

const HomeScreen = ({ navigation }: MainStackScreenProps<'HomeScreen'>) => {
  const [postType, setPostType] = useState<PostType>('new')
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetPosts(postType)

  const postsData = data?.pages.flatMap((page) =>
    page?.data.children.map((post) => post.data),
  )
  const renderListHeader = useCallback(() => {
    const postTypes: PostType[] = ['new', 'top', 'hot']
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {postTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={{ padding: 10 }}
            onPress={() => setPostType(type)}
          >
            <Text style={{ fontSize: 18 }}>{type.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }, [])

  const handlePostPress = useCallback(
    (postUrl: string) => {
      navigation.navigate('PostScreen', { postUrl })
    },
    [navigation],
  )

  return (
    <FlashList
      data={postsData}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      }}
      ListHeaderComponent={renderListHeader}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      renderItem={({ item: post }) => {
        if (!post) return null
        const imageAspectRatio =
          post.thumbnail_width && post.thumbnail_height
            ? post.thumbnail_width / post.thumbnail_height
            : 1
        return (
          <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1, flex: 1 }}
            onPress={() => handlePostPress(post.url)}
          >
            <Text>{post.title}</Text>
            {post.thumbnail && (
              <Image
                source={{ uri: post.thumbnail }}
                style={{
                  aspectRatio: imageAspectRatio,
                }}
              />
            )}
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>{post.author}</Text>
              <Text style={styles.metaText}>{post.score} votes</Text>
              <Text style={styles.metaText}>{post.num_comments} comments</Text>
              <Text style={styles.metaText}>{timeAgo(post.created_utc)}</Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  metaContainer: { flexDirection: 'row', marginTop: 6 },
  metaText: { marginRight: 8, color: 'grey', fontSize: 12 },
})

export default HomeScreen
