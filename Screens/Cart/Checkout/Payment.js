import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
} from "native-base";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "Mastercard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState(false);
  const [card, setCard] = useState(0);

  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item) => {
          return (
            <ListItem onPress={() => setSelected(item.value)} key={item.value}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected === item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected === 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonText={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, i) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title="Confirm"
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;
