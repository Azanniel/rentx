import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react"

import { api } from "../services/api"
import { database } from "../database"
import { User as ModelUser } from "../database/models/User"

interface User {
  id: string
  user_id: string
  email: string
  name: string
  driver_license: string
  avatar: string
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn: (credentials: SignInCredentials) => Promise<void>
  updatedUser: (user: User) => Promise<void>
  signOut: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User)

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      })

      const { token, user } = response.data

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      await database.write(async () => {
        const userCollection = database.get<ModelUser>("users")
        const dataUser = await userCollection.create((newUser) => {
          newUser.user_id = user.id
          newUser.name = user.name
          newUser.email = user.email
          newUser.driver_license = user.driver_license
          newUser.avatar = user.avatar
          newUser.token = token
        })

        const userData = dataUser._raw as unknown as User
        setData(userData)
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async function signOut() {
    try {
      await database.write(async () => {
        const userSelected = await database
          .get<ModelUser>("users")
          .find(data.id)
        await userSelected.destroyPermanently()
      })

      setData({} as User)
    } catch (error) {
      throw error
    }
  }

  async function updatedUser(user: User) {
    try {
      await database.write(async () => {
        const userSelected = await database
          .get<ModelUser>("users")
          .find(user.id)

        await userSelected.update((userData) => {
          userData.name = user.name
          userData.avatar = user.avatar
          userData.driver_license = user.driver_license
        })

        setData(user)
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userLoaded = await database.get<ModelUser>("users").query().fetch()

      if (userLoaded.length > 0) {
        const userData = userLoaded[0]._raw as unknown as User

        api.defaults.headers.common.Authorization = `Bearer ${userData.token}`
        setData(userData)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        updatedUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
