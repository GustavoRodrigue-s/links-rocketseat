import { colors } from '@/theme'
import { Stack } from 'expo-router'

export default function RootLayout() {
  const backgroundColor = colors.gray[950]

  return (
    <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor } 
      }} 
    />
  )
}