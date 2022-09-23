import { useState } from "react"
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import * as Yup from "yup"
import { useTheme } from "styled-components/native"

import { BackButton } from "../../../components/BackButton"
import { Bullet } from "../../../components/Bullet"
import { Button } from "../../../components/Button"
import { PasswordInput } from "../../../components/PasswordInput"

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles"

interface Params {
  user: {
    name: string
    email: string
    driverLicense
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const navigation = useNavigation()
  const route = useRoute()
  const theme = useTheme()

  const { user } = route.params as Params

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "Senhas não conferem")
          .required("Confirmação de senha obrigatória"),
        password: Yup.string().required("Senha obrigatória"),
      })

      await schema.validate({ password, passwordConfirm })

      console.log(user, password, passwordConfirm)

      navigation.navigate("Confirmation", {
        title: "Conta criada!",
        message: `Agora é só fazer login\ne aproveitar`,
        nextScreen: "SignIn",
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Ops!", error.message)
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>
            Crie sua
            {"\n"}
            conta
          </Title>

          <SubTitle>
            Faça seu cadastro de
            {"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
