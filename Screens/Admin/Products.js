import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from '@react-native-community/async-storage';

const Products = (props) => {
  return (
    <View>
      <Text>Products Screen</Text>
    </View>
  );
};

export default Products;
