import { RectButtonProps } from 'react-native-gesture-handler';
import {
  Container,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
}

export function Button({title, color, ...rest}: Props) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}