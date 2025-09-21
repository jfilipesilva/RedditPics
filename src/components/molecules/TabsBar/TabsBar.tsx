import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Typography from '../../atoms/Typography/Typography'

type TabsBarProps = {
  tabsNames: string[]
  onSetPostType: (tabName: string) => void
}

const TabsBar = ({ tabsNames, onSetPostType }: TabsBarProps) => {
  return (
    <View style={styles.root}>
      {tabsNames.map((name) => (
        <TouchableOpacity
          key={name}
          style={styles.tabButton}
          onPress={() => onSetPostType(name)}
        >
          <Typography style={styles.tabName}>{name.toUpperCase()}</Typography>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    padding: 10,
  },
  tabName: {
    fontSize: 18,
  },
})

export default TabsBar
