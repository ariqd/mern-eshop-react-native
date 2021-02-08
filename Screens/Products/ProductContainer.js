import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import ProductList from "./ProductList";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import { Keyboard } from "react-native";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

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

  return (
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
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <Banner />
            <View style={styles.listContainer}>
              <FlatList
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                  <ProductList key={item.id} item={item} />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
});

export default ProductContainer;
