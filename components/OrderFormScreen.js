import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useCart } from './CartContext';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

const OrderFormScreen = ({ route, navigation }) => {
  const { totalAmount } = route.params;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [city, setCity] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [location, setLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const { clearCart } = useCart();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need to access your location to place your order.',
            buttonPositive: 'OK',
          }
        );
        setPermissionGranted(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setPermissionGranted(true);
      }
    };

    const getCurrentLocation = () => {
      if (permissionGranted) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          error => {
            Alert.alert('Error', 'Unable to retrieve your location. Please try again.');
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
    };

    requestLocationPermission().then(getCurrentLocation);
  }, [permissionGranted]);

  const handleOrderSubmit = async () => {
    if (!name || !phoneNumber || !street || !buildingNumber || !city || !deliveryTime) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const orderData = {
      name,
      phoneNumber,
      street,
      buildingNumber,
      city,
      deliveryTime,
      totalAmount,
      paymentMethod,
      location: location ? {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      } : null,
    };

    try {
      const response = await axios.post('http://10.0.2.2:3001/api/orders', orderData);

      if (response.status === 201) {
        clearCart();
        Alert.alert('Success', 'Order placed successfully!');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error placing your order. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text style={styles.totalText}>Total Amount: ${totalAmount}</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="Building Number"
        value={buildingNumber}
        onChangeText={setBuildingNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Delivery Time"
        value={deliveryTime}
        onChangeText={setDeliveryTime}
      />

      <Text style={styles.paymentHeader}>Payment Method</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            paymentMethod === 'Cash' && styles.selectedRadioButton,
          ]}
          onPress={() => setPaymentMethod('Cash')}
        >
          <Text style={styles.radioLabel}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            paymentMethod === 'Card' && styles.selectedRadioButton,
          ]}
          onPress={() => setPaymentMethod('Card')}
        >
          <Text style={styles.radioLabel}>Card</Text>
        </TouchableOpacity>
      </View>

      <Button title="Place Order" onPress={handleOrderSubmit} />

      {!permissionGranted && (
        <Text style={styles.permissionText}>Location permission is required to place the order.</Text>
      )}
      {permissionGranted && location && (
        <Text style={styles.locationText}>Your location has been shared for delivery.</Text>
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
  totalText: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  paymentHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  selectedRadioButton: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  radioLabel: {
    fontSize: 16,
  },
  permissionText: {
    color: 'red',
    marginTop: 10,
  },
  locationText: {
    color: 'green',
    marginTop: 10,
  },
});

export default OrderFormScreen;
