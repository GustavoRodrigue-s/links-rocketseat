import { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

import { colors } from '@/theme'

import { Button, Categories, Input } from '@/components'

import { styles } from './styles'
import { linkStorage } from '@/storage/link-storage'

export default function Add() {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleAdd = async () => {
    if (!selectedCategory) {
      return Alert.alert("Categoria", "Selecione a categoria")
    }
    if (!name.trim()) {
      return Alert.alert("Nome", "Informe o nome")
    }
    if (!url.trim()) {
      return Alert.alert("Url", "Informe a url")
    }

    try {
      linkStorage.save({
        id: new Date().getTime().toString(),
        name,
        url,
        category: selectedCategory
      })

      Alert.alert("Sucesso", "Novo link adicionado", [
        { text: 'Ok', onPress: router.back }
      ])
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o link")
      console.error(error)
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          <MaterialIcons name="arrow-back" size={32} color={colors.gray[200]} />
        </TouchableOpacity>
        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>Selecione uma categoria</Text>

      <Categories selected={selectedCategory} onChange={setSelectedCategory} />

      <View style={styles.form}>
        <Input 
          placeholder="Nome" 
          autoCorrect={false} 
          value={name} 
          onChangeText={setName} 
        />
        <Input 
          placeholder="Url"
          autoCapitalize="none"
          value={url} 
          onChangeText={setUrl} 
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
    </View>
  )
}