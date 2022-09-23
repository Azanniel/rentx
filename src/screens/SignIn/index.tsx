import { useState } from "react"
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native"
import * as Yup from "yup"
import { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { PasswordInput } from "../../components/PasswordInput"

import { Container, Header, SubTitle, Title, Form, Footer } from "./styles"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { colors } = useTheme()
  const navigation = useNavigation()

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      })

      await schema.validate({ email, password })

      Alert.alert("Tudo certo")
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Ops!", error.message)
      } else {
        Alert.alert(
          "Algo deu errado!",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        )
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep")
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              light
              color={colors.background_secondary}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
