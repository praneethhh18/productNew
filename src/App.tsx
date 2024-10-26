import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './screens/ProductList';
import DeliveryEstimation from './screens/DeliveryEstimation';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="ProductList" 
          component={ProductList} 
          options={{ title: 'Select Product' }}
        />
        <Stack.Screen 
          name="DeliveryEstimation" 
          component={DeliveryEstimation} 
          options={{ title: 'Delivery Estimation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;