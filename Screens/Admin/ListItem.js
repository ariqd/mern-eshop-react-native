import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const ListItem = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          s.container,
          {
            backgroundColor: props.index % 2 === 0 ? "white" : "gainsboro",
          },
        ]}
        // onPress
      >
        <Image
          style={s.image}
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
        />
        <Text style={s.item}>{props.brand}</Text>
        <Text style={s.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={s.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={s.item}>$ {props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
});

export default ListItem;
