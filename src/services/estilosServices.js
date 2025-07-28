import { collection, doc, addDoc, getDocs, deleteDoc } from './config'
import { db } from './config'
import { getCurrentUserId } from './auth'

//Añadir estilo al usuario
export const addEstiloToUser = async (estiloObj) => {
  const userId = await getCurrentUserId()
  if (!userId) throw new Error('Usuario no antenticado')

  const estilosRef = collection(doc(db, 'users', userId), 'estilos')

  const result = await addDoc(estilosRef, estiloObj)
  return result.id
}

//Obtener estilos del usuario 

export const getEstilosDeUsuario = async () => {
  const userId = await getCurrentUserId()
  console.log('Obteniendo estilos del usuario:', userId)
  if (!userId) throw new Error('Usuario no autenticado')

  const estilosRef = collection(doc(db, 'users', userId), 'estilos')
  const result = await getDocs(estilosRef)
  return result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}


//Eliminar un estilo Id

export const deleteEstilosDeUsuario = async (estiloId) => {
  const userId = await getCurrentUserId()

  if (!userId) throw new Error('usuario no autenticado')

  const estiloRef = doc(db, 'users', userId, 'estilos', estiloId)
  await deleteDoc(estiloRef)
}