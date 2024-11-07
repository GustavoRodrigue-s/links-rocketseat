import { FlatList } from "react-native";

import { categories } from "@/utils";
import { Category } from "@/components/Category";

import { styles } from './styles'

interface CategoriesProps {
  selected: string;
  onChange: (category: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ selected, onChange }) => (
  <FlatList 
    data={categories}
    style={styles.container}
    contentContainerStyle={styles.content}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => (
      <Category 
        name={item.name} 
        icon={item.icon} 
        isSelected={item.name === selected}
        onPress={() => onChange(item.name)} 
      />
    )}
  />
)