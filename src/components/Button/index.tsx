import { PropsWithChildren } from "react"
import { ActivityIndicator } from "react-native"
import { useTheme } from "styled-components/native"
import { RectButtonProps } from "react-native-gesture-handler"

import { Container, Title } from "./styles"

interface Props extends PropsWithChildren<RectButtonProps> {
  title: string
  color?: string
  loading?: boolean
  light?: boolean
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme()

  return (
    <Container
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  )
}
