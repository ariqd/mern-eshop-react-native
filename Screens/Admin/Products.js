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
import ListItem from "./ListItem";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

const { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={s.listHeader}>
      <View style={s.headerItem}></View>
      <View style={s.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Brand</Text>
      </View>
      <View style={s.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
      </View>
      <View style={s.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Category</Text>
      </View>
      <View style={s.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseUrl}/products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text === "") {
      setProductFilter(productList);
    } else {
      setProductFilter(
        productList.filter((i) =>
          i.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <View>
      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 10 }}>
            <Icon name="search" />
            <Input
              placeholder="Search by Name"
              onChangeText={(text) => searchProduct(text)}
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={s.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={ListHeader}
          data={productFilter}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ListItem {...item} navigation={props.navigation} index={index} />
          )}
        />
      )}
    </View>
  );
};

const s = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Products;
