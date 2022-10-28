import { ReactNode } from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "styled-components/native"

import { AppStackRoutes } from "./app.stack.routes"
import { MyCars } from "../screens/MyCars"
import { Profile } from "../screens/Profile"

import HomeSvg from "../assets/home.svg"
import CarSvg from "../assets/car.svg"
import PeopleSvg from "../assets/people.svg"

const { Navigator, Screen } = createBottomTabNavigator()

export function AppTabRoutes() {
  const theme = useTheme()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Initial"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) =>
            (<HomeSvg width={24} height={24} color={color} />) as ReactNode,
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) =>
            (<CarSvg width={24} height={24} color={color} />) as ReactNode,
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) =>
            (<PeopleSvg width={24} height={24} color={color} />) as ReactNode,
        }}
      />
    </Navigator>
  )
}
