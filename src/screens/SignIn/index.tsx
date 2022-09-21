import { StatusBar } from "react-native"
import { useTheme } from "styled-components/native"

import { Button } from "../../components/Button"

import { Container, Header, SubTitle, Title, Footer } from "./styles"

export function SignIn() {
  const { colors } = useTheme()

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Title>Estamos{"\n"}quase lá</Title>
        <SubTitle>
          Faça seu login para começar{"\n"}
          uma experiência incrível.
        </SubTitle>
      </Header>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={true}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          light
          color={colors.background_secondary}
          enabled={true}
          loading={false}
        />
      </Footer>
    </Container>
  )
}
