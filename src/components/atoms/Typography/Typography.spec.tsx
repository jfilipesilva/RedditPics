import { describe, it, expect } from '@jest/globals'
import { render } from '@testing-library/react-native'
import Typography from './Typography'

describe('Typography', () => {
  it('renders correctly', () => {
    const text = 'Typography'

    const { getByText } = render(<Typography>{text}</Typography>)
    expect(getByText(text)).toBeDefined()
  })
})
