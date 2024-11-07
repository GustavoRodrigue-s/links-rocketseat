import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/theme';

import { styles } from './styles'

interface LinkProps {
  name: string;
  url: string;
  onDetails: () => void;
}

export const Link: React.FC<LinkProps> = ({ name, url, onDetails }) => (
  <View style={styles.container}>
    <View style={styles.details}>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.url} numberOfLines={1}>{url}</Text>
    </View>

    <TouchableOpacity onPress={onDetails}>
      <MaterialIcons name="more-horiz" size={20} color={colors.gray[400]} />
    </TouchableOpacity>
  </View>
)