// components/PackageDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import { useCart } from './CartContext';

const PackageDetailsScreen = ({ route }) => {
  const { packageItem } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(packageItem);
    alert(`${packageItem.name} added to cart!`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={require('../assets/vegeies6.jpg')} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemWeight}>Weight: {item.weight}</Text>
    </View>
  );

  // Header component to show package details at the top
  const renderHeader = () => (
    <View>
      <Text style={styles.header}>{packageItem.name}</Text>
      <Image source={require('../assets/vegeies6.jpg')} style={styles.packageImage} />
      <Text style={styles.description}>{packageItem.description}</Text>
      <Text style={styles.price}>Total Price: ${packageItem.totalPrice}</Text>
      <Text style={styles.itemsHeader}>Items in this Package:</Text>
    </View>
  );

  // Footer component to show "Add to Cart" button at the bottom
  const renderFooter = () => (
    <View style={styles.bottomContainer}>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );

  return (
    <FlatList
      data={packageItem.items} // List of items in the package
      keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={renderHeader} // Display package details at the top
      ListFooterComponent={renderFooter} // Display "Add to Cart" button at the bottom
    />
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
    textAlign: 'center',
  },
  packageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#007BFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  itemName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemWeight: {
    color: '#555',
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
});

export default PackageDetailsScreen;
