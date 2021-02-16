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
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const ListItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={s.centeredView}>
          <View style={s.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => setShowModal(false)}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Button
              title="Edit"
              onPress={() => [
                props.navigation.navigate("ProductForm"),
                setShowModal(false),
              ]}
            />
            <Button
              title="Delete"
              // Delete
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[
          s.container,
          {
            backgroundColor: props.index % 2 === 0 ? "white" : "gainsboro",
          },
        ]}
        onLongPress={() => setShowModal(true)}
        onPress={() =>
          props.navigation.navigate("Product Detail", { item: props })
        }
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ListItem;
