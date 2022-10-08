import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack"

import { Splash } from "../screens/Splash"
import { SignIn } from "../screens/SignIn"
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep"
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep"
import { Confirmation } from "../screens/Confirmation"

const { Navigator, Screen } = createStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Splash" component={Splash} />

      <Screen name="SignIn" component={SignIn} />

      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />

      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}
