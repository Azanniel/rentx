import { StatusBar, useWindowDimensions } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

import { ConfirmButton } from "../../components/ConfirmButton"

import LogoSvg from "../../assets/logo_background_gray.svg"
import DoneSvg from "../../assets/done.svg"

import {
  Container,
  LogoWrapper,
  Content,
  Title,
  Message,
  Footer,
} from "./styles"

interface Params {
  title: string
  message: string
  nextScreen: string
}

interface Navigation {
  navigate: (value: string) => void
}

export function Confirmation() {
  const { width } = useWindowDimensions()
  const navigation = useNavigation<Navigation>()
  const route = useRoute()

  const { title, message, nextScreen } = route.params as Params

  function handleConfirm() {
    navigation.navigate(nextScreen)
  }

  return (
    <Container>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <LogoWrapper>
        <LogoSvg width={width} />
      </LogoWrapper>

      <Content>
        <DoneSvg width={80} height={80} />

        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Footer>
    </Container>
  )
}
