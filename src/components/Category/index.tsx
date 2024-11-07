import { Pressable, PressableProps, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '@/theme'

import { styles } from './styles'

interface CategoryProps extends PressableProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isSelected: boolean;
}

export const Category: React.FC<CategoryProps> = ({ 
  name, 
  icon, 
  isSelected, 
  ...rest 
}) => {
  const color = isSelected ? colors.green[300] : colors.gray[400]

  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  )
}