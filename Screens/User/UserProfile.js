import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState([]);

  useEffect(() => {
    if (
      !context.stateUser.isAuthenticated ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }

    console.log(context.stateUser.user);    
    
    AsyncStorage.getItem("jwt")
    .then((res) => {
        console.log(res);    
        axios
          .get(`${baseUrl}/users/profile/${context.stateUser.user.userId}`, {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));

    return () => {
      setUserProfile([]);
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <Container>
      <ScrollView>
        <Text style={{ fontSize: 20 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title="Logout"
            onPress={() => {
              AsyncStorage.removeItem("jwt");
              logoutUser(context.dispatch);
            }}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default UserProfile;
