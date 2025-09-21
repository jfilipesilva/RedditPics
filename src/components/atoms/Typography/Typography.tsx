import { Text, TextProps } from 'react-native'

type TypographyProps = TextProps & {}

const Typography = ({ ...props }: TypographyProps) => {
  return <Text {...props}>{props.children}</Text>
}

export default Typography
