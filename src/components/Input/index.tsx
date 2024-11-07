import { TextInput, TextInputProps } from "react-native";

import { colors } from "@/theme";

import { styles } from "./styles";

export const Input: React.FC<TextInputProps> = ({ ...rest }) => (
  <TextInput 
    style={styles.container} 
    placeholderTextColor={colors.gray[400]} 
    {...rest} 
  />
)