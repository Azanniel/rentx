import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack"

import { Splash } from "../screens/Splash"
import { SignIn } from "../screens/SignIn"
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep"
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep"
import { Home } from "../screens/Home"
import { MyCars } from "../screens/MyCars"
import { CarDetails } from "../screens/CarDetails"
import { Scheduling } from "../screens/Scheduling"
import { SchedulingDetails } from "../screens/SchedulingDetails"
import { Confirmation } from "../screens/Confirmation"

const { Navigator, Screen } = createStackNavigator()

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Splash" component={Splash} />

      <Screen name="SignIn" component={SignIn} />

      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />

      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

      <Screen name="Home" component={Home} />

      <Screen name="MyCars" component={MyCars} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}
