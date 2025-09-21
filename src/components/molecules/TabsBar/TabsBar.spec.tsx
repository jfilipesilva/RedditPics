import { render, userEvent } from '@testing-library/react-native'
import TabsBar from './TabsBar'

const tabNames = ['hot', 'new', 'top']
const tabSelected = tabNames[0]
const onSetPostTypeSpy = jest.fn()

const renderComponent = () => {
  return render(
    <TabsBar
      tabsNames={tabNames}
      tabSelected={tabSelected}
      onSetPostType={onSetPostTypeSpy}
    />,
  )
}

describe('TabBar', () => {
  describe('Render', () => {
    it('renders correctly', () => {
      const { getByText } = renderComponent()

      tabNames.forEach((name) => {
        expect(getByText(name.toUpperCase())).toBeDefined()
      })
    })

    it('highlights the selected tab', () => {
      const { getByText } = renderComponent()

      const selectedTab = getByText(tabSelected.toUpperCase())
      expect(selectedTab).toHaveStyle({
        fontWeight: 'bold',
        color: 'lightblue',
      })
    })
  })

  describe('Actions', () => {
    it('calls onSetPostType when a tab is pressed', async () => {
      const { getByText } = renderComponent()

      for (const name of tabNames) {
        await userEvent.press(getByText(name.toUpperCase()))
        expect(onSetPostTypeSpy).toHaveBeenCalledWith(name)
      }

      expect(onSetPostTypeSpy).toHaveBeenCalledTimes(tabNames.length)
    })
  })
})
