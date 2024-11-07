import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/theme';

import { styles } from './styles'

interface OptionProps extends TouchableOpacityProps {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: 'primary' | 'secondary'
}

export const Option: React.FC<OptionProps> = ({ name, icon, variant = 'primary', ...rest }) => (
  <TouchableOpacity style={styles.container} {...rest}>
    <MaterialIcons 
      name={icon} 
      size={20} 
      color={variant === 'primary' ? colors.green[300] : colors.gray[400]} 
    />
    <Text 
      style={variant === 'primary' ? styles.primaryTitle : styles.secondaryTitle}
    >
        {name}
    </Text>
  </TouchableOpacity>
)