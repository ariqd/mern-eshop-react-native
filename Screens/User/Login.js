import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormContainer title="Login">
      <Input
        placeholder="Enter email"
        name="email"
        id="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Enter password"
        name="password"
        id="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <View style={styles.buttonGroup}>
        <Button title="Login" />
      </View>

      <View style={styles.buttonGroup}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 8,
    alignSelf: "center",
  },
});

export default Login;
