import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

// Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      {/* <ProductContainer /> */}
      <Main />
    </NavigationContainer>
  );
}
