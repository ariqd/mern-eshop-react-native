import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Keyboard } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill the form correctly");
    }

    let user = {
      name,
      email,
      password,
      phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}/users/register`, user)
      .then((res) => {
        if (res.status === 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Success",
            text2: "Please login into your account",
          });

          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar
      extraHeight={200}
      enableOnAndroid
    >
      <FormContainer title="Register">
        <Input
          placeholder="Email"
          name="email"
          id="email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder="Name"
          name="name"
          id="name"
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Phone"
          name="phone"
          id="phone"
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder="Password"
          name="password"
          id="password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.middleText}>
          {error ? <Error message={error} /> : null}
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Register" onPress={() => register()} />
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Back to Login" />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
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

export default Register;
