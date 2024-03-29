import styled from "styled-components/native"
import { RFValue } from "react-native-responsive-fontsize"
import { RectButton } from "react-native-gesture-handler"

interface ButtonProps {
  color?: string
}

interface ButtonTextProps {
  light: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  padding: 19px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
`

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    !light ? theme.colors.background_secondary : theme.colors.header};
  font-size: ${RFValue(15)}px;
`
