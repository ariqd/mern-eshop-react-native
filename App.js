import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";

// Screens
// import ProductContainer from "./Screens/Products/ProductContainer";
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
