import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { validatePincode } from '../utils/validation';
import { calculateDeliveryDate } from '../utils/delivery';
import DeliveryTimer from '../components/DeliveryTimer';

type DeliveryEstimationRouteProp = RouteProp<RootStackParamList, 'DeliveryEstimation'>;

const DeliveryEstimation = () => {
  const route = useRoute<DeliveryEstimationRouteProp>();
  const { product } = route.params;
  
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    date: Date;
    provider: string;
    isSameDay: boolean;
  } | null>(null);

  const handleCheck = async () => {
    setError(null);
    setLoading(true);

    try {
      const pincodeInfo = await validatePincode(pincode);
      if (!pincodeInfo) {
        setError('Invalid pincode');
        return;
      }

      const delivery = calculateDeliveryDate(pincodeInfo, product.inStock);
      setDeliveryInfo(delivery);
    } catch (err) {
      setError('Failed to calculate delivery date');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>₹{product.price.toLocaleString()}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleCheck}
          disabled={loading || pincode.length !== 6}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Check</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {deliveryInfo && (
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryTitle}>Estimated Delivery:</Text>
          <Text style={styles.deliveryDate}>
            {deliveryInfo.date.toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          
          {deliveryInfo.isSameDay && (
            <DeliveryTimer provider={deliveryInfo.provider} />
          )}
          
          <Text style={styles.providerInfo}>
            Delivery by: Provider {deliveryInfo.provider}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  productInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#4b5563',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  error: {
    color: '#ef4444',
    marginBottom: 16,
  },
  deliveryInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  deliveryDate: {
    fontSize: 18,
    color: '#2563eb',
    marginBottom: 8,
  },
  providerInfo: {
    color: '#4b5563',
    marginTop: 8,
  },
});

export default DeliveryEstimation;