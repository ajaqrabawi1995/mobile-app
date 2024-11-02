// components/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useCart } from './CartContext'; // Import useCart to access cart context

const HomeScreen = ({ navigation }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // Destructure addToCart from cart context

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3001/api/packages'); // Adjust to your API URL
        setPackages(response.data);
      } catch (err) {
        setError('Error fetching packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handlePackagePress = (packageItem) => {
    navigation.navigate('PackageDetails', { packageItem }); // Navigate to PackageDetailsScreen
  };

  const handleAddToCart = (packageItem) => {
    addToCart(packageItem); // Add the package to cart when called
    Alert.alert('Success', `${packageItem.name} added to cart!`);
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn'); // Navigate to SignInScreen
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to SignUpScreen
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading packages...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Available Packages</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleSignIn}>
            <Image source={require('../assets/sigin.png')} style={styles.icon} /> {/* Adjust image path */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Image source={require('../assets/sigup.png')} style={styles.icon} /> {/* Adjust image path */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/cart.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={packages}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.packageItem}
            onPress={() => handlePackagePress(item)}
          >
            <Image
              source={require('../assets/vegeies6.jpg')}
              style={styles.cardImage}
              onError={() => console.error('Failed to load image')}
            />
            <Text style={styles.packageName}>{item.name}</Text>
            <Text style={styles.packagePrice}>Total Price: ${item.totalPrice}</Text>
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Text style={styles.addToCartButton}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30, // Adjust width as necessary
    height: 30, // Adjust height as necessary
    marginRight: 10, // Space between icons
  },
  cartIcon: {
    width: 30, // Adjust width as necessary
    height: 30, // Adjust height as necessary
  },
  packageItem: {
    flex: 1,
    padding: 16,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  packageName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  packagePrice: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  addToCartButton: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default HomeScreen;
