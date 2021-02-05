import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ProductContainer />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
