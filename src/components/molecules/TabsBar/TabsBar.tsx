import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Typography from '../../atoms/Typography/Typography'

type TabsBarProps = {
  tabsNames: string[]
  tabSelected: string
  onSetPostType: (tabName: string) => void
}

const TabsBar = ({ tabsNames, tabSelected, onSetPostType }: TabsBarProps) => {
  return (
    <View style={styles.root}>
      {tabsNames.map((tabName) => (
        <TouchableOpacity
          key={tabName}
          style={styles.tabButton}
          onPress={() => onSetPostType(tabName)}
        >
          <Typography
            style={[
              styles.tabName,
              tabSelected === tabName && styles.activeTab,
            ]}
          >
            {tabName.toUpperCase()}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    padding: 10,
  },
  tabName: {
    fontSize: 18,
  },
  activeTab: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
})

export default TabsBar
