import { TouchableOpacity, Image, View, StyleSheet } from 'react-native'
import { ChildData } from '../../../api/types'
import { timeAgo } from '../../../utils/date'
import Typography from '../../atoms/Typography/Typography'

type PostProps = {
  post?: ChildData
  onPostPress: (postUrl: string) => void
}
const Post = ({ post, onPostPress }: PostProps) => {
  if (!post) return null

  const imageAspectRatio =
    post.thumbnail_width && post.thumbnail_height
      ? post.thumbnail_width / post.thumbnail_height
      : 1

  return (
    <TouchableOpacity
      style={{ padding: 10, borderBottomWidth: 1, flex: 1 }}
      onPress={() => onPostPress(post.url)}
    >
      <Typography>{post.title}</Typography>
      {post.thumbnail && (
        <Image
          source={{ uri: post.thumbnail }}
          style={{
            aspectRatio: imageAspectRatio,
          }}
        />
      )}
      <View style={styles.metaContainer}>
        <Typography style={styles.metaText}>{post.author}</Typography>
        <Typography style={styles.metaText}>{post.score} votes</Typography>
        <Typography style={styles.metaText}>
          {post.num_comments} comments
        </Typography>
        <Typography style={styles.metaText}>
          {timeAgo(post.created_utc)}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  metaContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  metaText: {
    marginRight: 8,
    color: 'grey',
    fontSize: 12,
  },
})

export default Post
