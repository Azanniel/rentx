import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack"

import { Home } from "../screens/Home"
import { CarDetails } from "../screens/CarDetails"
import { Scheduling } from "../screens/Scheduling"
import { SchedulingDetails } from "../screens/SchedulingDetails"
import { Confirmation } from "../screens/Confirmation"

const { Navigator, Screen } = createStackNavigator()

export function AppStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  )
}
