import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInSeconds } from 'date-fns';

interface DeliveryTimerProps {
  provider: string;
}

const DeliveryTimer: React.FC<DeliveryTimerProps> = ({ provider }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoffTime = new Date();
      
      if (provider === 'A') {
        cutoffTime.setHours(17, 0, 0); // 5 PM
      } else if (provider === 'B') {
        cutoffTime.setHours(9, 0, 0); // 9 AM
      }

      if (now > cutoffTime) {
        cutoffTime.setDate(cutoffTime.getDate() + 1);
      }

      return Math.max(0, differenceInSeconds(cutoffTime, now));
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [provider]);

  if (timeLeft === 0) {
    return null;
  }

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Order within to get same-day delivery:
      </Text>
      <Text style={styles.timer}>
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    color: '#0369a1',
    marginBottom: 4,
  },
  timer: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0284c7',
    textAlign: 'center',
  },
});

export default DeliveryTimer;