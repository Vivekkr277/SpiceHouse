import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeHeadNav from "../components/HomeHeadNav";
import BottomNav from "../components/BottomNav";
import { btn1, btn2, btn3, colors, hr100} from "../globals/style";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebase } from "../../Firebase/firebaseConfig";

export default function TrackOrder({ navigation }) {
  const [orders, setOrders] = useState([]);

  const getorders = async () => {
    const ordersRef = firebase
      .firestore()
      .collection("UserOrders")
      .where("orderuseruid", "==", firebase.auth().currentUser.uid);

    ordersRef.onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc.data()));
    });
  };

  useEffect(() => {
    getorders();
  }, []);

   const convertDate = (date) => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = (orderitem) => {
    const ordersRef = firebase
      .firestore()
      .collection("UserOrders")
      .doc(orderitem.orderid);
    ordersRef.update({
      orderstatus: "cancelled",
    });
    getorders();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>

      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>Track Orders</Text>

        <View style={styles.btn1}>
          <TouchableOpacity onPress={() => navigation.navigate("maptrack")}>
            <Text style={styles.ordertxt2}>Track on Map</Text>
          </TouchableOpacity>
        </View>
        {orders
          .sort((a, b) => b.orderdate.seconds - a.orderdate.seconds)
          .map((order, index) => {
            return (
              <View style={styles.oredercard} key={index}>
                <Text style={styles.orderindex}>{index + 1}</Text>
                <Text style={styles.ordertxt2}>Order id : {order.orderid}</Text>
                <Text style={styles.ordertxt2}>
                  order date : {convertDate(order.orderdate)}
                </Text>
                {order.orderstatus == "ontheway" && (
                  <Text style={styles.orderotw}>Your order is on the way</Text>
                )}
                {order.orderstatus == "delivered" && (
                  <Text style={styles.orderdelivered}>
                    Your order is delivered
                  </Text>
                )}
                {order.orderstatus == "canceled" && (
                  <Text style={styles.ordercancelled}>
                    Your order is canceled
                  </Text>
                )}
                {order.orderstatus == "pending" && (
                  <Text style={styles.orderpending}>Your order is pending</Text>
                )}

                <View style={styles.row1}>
                  <Text style={styles.ordertxt1}>
                    Delivery Agent Name & Contact
                  </Text>
                  {order.deliveryboy_name ? (
                    <Text style={styles.ordertxt2}>
                      {order.deliveryboy_name}
                    </Text>
                  ) : (
                    <Text style={styles.ordertxt2}>Not Assigned</Text>
                  )}
                  {order.deliveryboy_phone ? (
                    <Text style={styles.ordertxt2}>
                      {order.deliveryboy_phone}
                    </Text>
                  ) : null}
                </View>
                <FlatList
                  style={styles.c1}
                  data={order.orderdata}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.rowout}>
                        <View style={styles.row}>
                          <View style={styles.left}>
                            <Text style={styles.qty}>{item.Foodquantity}</Text>
                            <Text style={styles.title}>
                              {item.data.foodName}
                            </Text>
                            <Text style={styles.price1}>
                              ₹{item.data.foodPrice}
                            </Text>
                          </View>
                          <View style={styles.right}>
                            <Text style={styles.totalprice}>
                              ₹
                              {parseInt(item.Foodquantity) *
                                parseInt(item.data.foodPrice)}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.row}>
                          <View style={styles.left}>
                            <Text style={styles.qty}>{item.Addonquantity}</Text>
                            <Text style={styles.title}>
                              {item.data.foodAddon}
                            </Text>
                            <Text style={styles.price1}>
                              ₹{item.data.foodAddonPrice}
                            </Text>
                          </View>
                          <View style={styles.right}>
                            <Text style={styles.totalprice}>
                              ₹
                              {parseInt(item.Addonquantity) *
                                parseInt(item.data.foodAddonPrice)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />

                <Text style={styles.total}>Total : {order.ordercost}</Text>
                {order.orderstatus == "delivered" ? (
                  <Text style={styles.ordertxt3}>
                    Thank you for ordering with us
                  </Text>
                ) : null}
                {order.orderstatus == "cancelled" ? (
                  <Text style={styles.ordertxt3}>
                   Order is cancelled by the customer
                  </Text>
                ) : null}
                {order.orderstatus != "cancelled" &&
                order.orderstatus != "delivered" ? (
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => cancelOrder(order)}
                  >
                    <Text style={styles.cancelbtnin}>Cancel Order</Text>
                  </TouchableOpacity>
                ) : null}
                <View style={hr100}></View>
 
               </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  containerin: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
    height: "100%",
    marginBottom: 100,
  },
  head1: {
    fontSize: 30,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  rowout: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
  },
  row1: {
    flexDirection: "column",
    margin: 10,
    elevation: 10,
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    fontSize: 20,
    color: colors.col1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  price1: {
    fontSize: 17,
    color: colors.text1,
    marginRight: 10,
  },
  totalprice: {
    fontSize: 20,
    marginRight: 10,
  },
  total: {
    fontSize: 20,
    color: colors.text3,
    textAlign: "right",
    marginVertical: 10,
    marginRight: 20,
  },
  oredercard: {},

  ordertxt1: {
    fontSize: 20,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  ordertxt2: {
    fontSize: 17,
    color: colors.text3,
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
  orderindex: {
    fontSize: 18,
    color: colors.col1,
    backgroundColor: colors.text1,
    textAlign: "center",
    borderRadius: 30,
    padding: 5,
    width: 30,
    position: "absolute",
    top: 10,
    left: 10,
  },
  ordertxt3: {
    fontSize: 17,
    color: colors.text3,
    textAlign: "center",
    marginVertical: 5,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  cancelbtn: {
    // backgroundColor: colors.text1,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  cancelbtnin: {
    fontSize: 20,
    color: colors.col1,
    textAlign: "center",
    fontWeight: "bold",
  },
  orderstatus: {
    // fontSize: 20,
  },
  orderstatusin: {},
  orderotw: {
    fontSize: 20,
    backgroundColor: "orange",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  orderdelivered: {
    fontSize: 20,
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  ordercancelled: {
    fontSize: 20,
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  orderpending: {
    fontSize: 20,
    backgroundColor: "yellow",
    color: "grey",
    textAlign: "center",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  btn1: {
    width: "80%",
    height: 50,
    // backgroundColor : 'red',
    // backgroundColor : 'green',
    backgroundColor: "#67e8f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    color: "white",
    marginBottom: 10,
    marginLeft: 30,
  },
});
