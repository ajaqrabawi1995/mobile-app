// components/CartScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, getTotalPrice } = useCart();
  const totalAmount = getTotalPrice();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <View>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>Price: ${item.totalPrice}</Text>
            </View>
          ))}
          <Text style={styles.totalText}>Total Amount: ${totalAmount}</Text>
          <Button
            title="Place Order"
            onPress={() => navigation.navigate('OrderForm', { totalAmount })}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CartScreen;
