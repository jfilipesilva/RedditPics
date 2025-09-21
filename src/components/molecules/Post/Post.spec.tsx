import { act, render, userEvent } from '@testing-library/react-native'
import { ChildData } from '../../../api/types'
import Post from './Post'

const postData: Partial<ChildData> = {
  id: '1',
  title: 'Test Post',
  author: 'test_user',
  created_utc: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
  score: 100,
  num_comments: 20,
  url: 'https://example.com/test-post',
  thumbnail: 'https://via.placeholder.com/150',
  thumbnail_width: 150,
  thumbnail_height: 150,
}

const onPostPressSpy = jest.fn()

const renderComponent = () =>
  render(<Post post={postData as ChildData} onPostPress={onPostPressSpy} />)

describe('Post', () => {
  describe('Render', () => {
    it('renders correctly', () => {
      const { getByText } = renderComponent()

      expect(getByText(postData.title!)).toBeDefined()
      expect(getByText(`u/${postData.author!}`)).toBeDefined()
      expect(getByText(`${postData.score} votes`)).toBeDefined()
      expect(getByText(`${postData.num_comments} comments`)).toBeDefined()
      expect(getByText('1 hour ago')).toBeDefined()
    })
  })

  describe('Actions', () => {
    it('calls onPostPress when pressed', async () => {
      const { getByRole } = renderComponent()

      await userEvent.press(getByRole('button'))

      act(() => {
        jest.runAllTimers()
      })

      expect(onPostPressSpy).toHaveBeenCalledWith(postData.url)
    })
  })
})
