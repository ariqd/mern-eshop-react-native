import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials!");
    } else {
      console.log(["success", email, password]);
    }
  };

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
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={() => handleSubmit()} />
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
