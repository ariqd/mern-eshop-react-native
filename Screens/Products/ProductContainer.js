import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import ProductList from "./ProductList";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import { Keyboard } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios.get(`${baseURL}/products`).then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setProductsCtg(res.data);
        setInitialState(res.data);
        setIsLoading(false);
      });

      // Categories
      axios
        .get(`${baseURL}/categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log("API call error on /categories", err);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus(false);
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
    Keyboard.dismiss();
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return !isLoading ? (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus ? (
        <SearchedProducts
          productsFiltered={productsFiltered}
          navigation={props.navigation}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return (
                    <ProductList
                      key={item._id}
                      item={item}
                      navigation={props.navigation}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No product found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
  ) : (
    <Container
      style={[
        styles.ceonter,
        { backgroundColor: "#f2f2f2", height: height, padding: 8 },
      ]}
    >
      <ActivityIndicator size="large" color="red" />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    paddingBottom: 16,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
