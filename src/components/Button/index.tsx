import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => (
  <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)