import { useState, useCallback } from 'react'
import { View, Image, TouchableOpacity, FlatList, Modal, Text, Alert, Linking } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { router, useFocusEffect } from 'expo-router'

import { categories } from '@/utils'
import { colors } from '@/theme'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import { Categories, Link, Option } from '@/components'

import { styles } from './styles'

export default function Index() {
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].name)
  const [selectedLink, setSelectedLink] = useState<LinkStorage | null>(null)

  const filteredLinks = links.filter(({ category }) => category === selectedCategory)

  const getLinks = async () => {
    try {
      const response = await linkStorage.get()
      setLinks(response)
    } catch {
      Alert.alert("Erro", "Não foi possível listar os links")
    }
  }

  const removeLink = async () => {
    try {
      await linkStorage.remove(selectedLink!.id)
      getLinks()
      setSelectedLink(null)
    } catch {
      Alert.alert("Erro", "Não foi possível excluir o link")
    }
  }

  const handleRemove = async () => {
    Alert.alert("Excluir", "Deseja realmente excluir?", [
      { style: 'cancel', text: 'Não' },
      { text: 'Sim', onPress: removeLink }
    ])
  }

  const handleOpen = async () => {
    try {
      await Linking.openURL(selectedLink!.url)
      setSelectedLink(null)
    } catch {
      Alert.alert("Link", "Não foi possível abrir o link")
    }
  }

  useFocusEffect(useCallback(() => {
    getLinks()
  }, []))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <TouchableOpacity onPress={() => router.navigate("/add")}>
          <MaterialIcons name="add" size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      
      <Categories selected={selectedCategory} onChange={setSelectedCategory} />

      <FlatList 
        data={filteredLinks}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link name={item.name} url={item.url} onDetails={() => setSelectedLink(item)}  />
        )}
      />

      <Modal transparent visible={!!selectedLink} animationType='slide'>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalCategory}>{selectedLink?.category}</Text>
              <TouchableOpacity onPress={() => setSelectedLink(null)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLinkName}>{selectedLink?.name}</Text>
            <Text style={styles.modalUrl}>{selectedLink?.url}</Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon='delete' variant='secondary' onPress={handleRemove} />
              <Option name="Abrir" icon='language' onPress={handleOpen} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
