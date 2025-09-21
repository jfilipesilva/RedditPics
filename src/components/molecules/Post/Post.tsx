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
      accessibilityRole="button"
      style={styles.button}
      onPress={() => onPostPress(post.url)}
    >
      <Typography style={styles.title}>{post.title}</Typography>
      <View style={styles.card}>
        {post.thumbnail && (
          <Image
            source={{ uri: post.thumbnail }}
            style={{
              borderRadius: 20,
              aspectRatio: imageAspectRatio,
            }}
          />
        )}
        <View style={styles.metaContainer}>
          <Typography style={styles.metaText}>{`u/${post.author}`}</Typography>
          <Typography style={styles.metaText}>{post.score} votes</Typography>
          <Typography style={styles.metaText}>
            {post.num_comments} comments
          </Typography>
          <Typography style={styles.metaText}>
            {timeAgo(post.created_utc)}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 500,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  metaContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: 'grey',
    marginRight: 8,
  },
  button: {
    flex: 1,
    padding: 10,
    borderColor: 'lightgrey',
  },
})

export default Post
