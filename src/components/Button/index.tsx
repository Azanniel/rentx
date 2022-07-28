import { PropsWithChildren } from 'react';
import { useTheme } from 'styled-components/native';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title
} from './styles';

interface Props extends PropsWithChildren<RectButtonProps> {
  title: string;
  color?: string;
}

export function Button({title, color, ...rest}: Props) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main}
    >
      <Title>{title}</Title>
    </Container>
  );
}