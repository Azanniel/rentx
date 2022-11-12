import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "styled-components/native"
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import * as Yup from "yup"

import { BackButton } from "../../components/BackButton"
import { Input } from "../../components/Input"
import { PasswordInput } from "../../components/PasswordInput"
import { Button } from "../../components/Button"

import { useAuth } from "../../hooks/auth"

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles"

type Option = "dataChange" | "passwordChange"

export function Profile() {
  const { user, signOut, updatedUser } = useAuth()

  const [option, setOption] = useState<Option>("dataChange")
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  const theme = useTheme()
  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  function handleOptionChange(optionType: Option) {
    setOption(optionType)
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (result.cancelled === false) {
      setAvatar(result.uri)
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatória"),
        name: Yup.string().required("Nome é obrigatório"),
      })

      const data = await schema.validate({ driverLicense, name })

      await updatedUser({
        ...user,
        avatar,
        name: data.name,
        driver_license: data.driverLicense,
      })

      Alert.alert("Perfil atualizado!")
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ops!", error.message)
      } else {
        Alert.alert("Não foi possível atualizar o perfil")
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair, irá precisar de internet para conectar-se novamente.",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Sair",
          onPress: signOut,
        },
      ]
    )
  }

  return (
    <Container
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />

          <HeaderTitle>Editar Perfil</HeaderTitle>

          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          {!!avatar && <Photo source={{ uri: avatar }} />}

          <PhotoButton onPress={handleAvatarSelect}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        <Options>
          <Option
            active={option === "dataChange"}
            onPress={() => handleOptionChange("dataChange")}
          >
            <OptionTitle active={option === "dataChange"}>Dados</OptionTitle>
          </Option>

          <Option
            active={option === "passwordChange"}
            onPress={() => handleOptionChange("passwordChange")}
          >
            <OptionTitle active={option === "passwordChange"}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>

        {option === "dataChange" ? (
          <Section>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCorrect={false}
              defaultValue={user.name}
              onChangeText={setName}
            />

            <Input iconName="mail" editable={false} defaultValue={user.email} />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              defaultValue={user.driver_license}
              onChangeText={setDriverLicense}
            />
          </Section>
        ) : (
          <Section>
            <PasswordInput iconName="lock" placeholder="Senha atual" />

            <PasswordInput iconName="lock" placeholder="Nova senha" />

            <PasswordInput iconName="lock" placeholder="Repetir senha" />
          </Section>
        )}

        <Button title="Salvar alterações" onPress={handleProfileUpdate} />
      </Content>
    </Container>
  )
}
