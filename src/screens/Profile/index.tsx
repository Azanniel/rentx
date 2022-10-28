import { useNavigation } from "@react-navigation/native"
import { useTheme } from "styled-components/native"
import { Feather } from "@expo/vector-icons"

import { BackButton } from "../../components/BackButton"

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
} from "./styles"

export function Profile() {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  function handleSignOut() {}

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />

          <HeaderTitle>Editar Perfil</HeaderTitle>

          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: "https://github.com/azanniel.png" }} />

          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  )
}
