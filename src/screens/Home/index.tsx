import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ],
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />

          {
            !isLoading && (
              <TotalCars>
                Total de {cars.length} carros
              </TotalCars>
            )
          }
        </HeaderContent>
      </Header>

      {isLoading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
      <Animated.View
        style={[myCarsButtonStyle, {
          position: 'absolute',
          bottom: 13,
          right: 22
        }]}
      >
        <MyCarsButton
          onPress={handleOpenMyCars}
        >
          <Ionicons
            name='ios-car-sport'
            size={32}
            color={theme.colors.background_secondary}
          />
        </MyCarsButton>
      </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}