import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "links-storage"

export interface LinkStorage {
  id: string;
  name: string;
  url: string;
  category: string;
}

const get = async (): Promise<LinkStorage[]> => {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
  const response = storage ? JSON.parse(storage) : []

  return response
}

const save = async (newLink: LinkStorage) => {
  const storage = await get()
  const updated = JSON.stringify([...storage, newLink])

  await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)
}

const remove = async (id: string) => {
  const storage = await get()
  const updated = JSON.stringify(storage.filter(link => link.id !== id))

  await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)
}

export const linkStorage = { get, save, remove }