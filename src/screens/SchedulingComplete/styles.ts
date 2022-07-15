import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const LogoWrapper = styled.View`
  position: absolute;
  top: 5%;
`;

export const Content = styled.View`
  width: 100%;
  position: absolute;
  top: 40%;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  margin-top: 30px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  line-height: ${RFValue(25)}px;

  text-align: center;

  margin-top: 15px;
`;

export const Footer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 5%;

  align-items: center;
  justify-content: center;
`;