import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const NestedFlatList: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Generate 50 items for the vertical list
  const verticalData = Array.from({ length: 50 }, (_, i) => ({
    id: `v${i}`,
    title: `Vertical Item ${i + 1}`,
  }));

  // Generate 40 items for each horizontal list
  const generateHorizontalData = () =>
    Array.from({ length: 40 }, (_, i) => ({
      id: `h${i}`,
      title: `Horizontal Item ${i + 1}`,
    }));

  const renderHorizontalItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.horizontalItem}>
      <Text style={styles.horizontalItemText}>{item.title}</Text>
    </View>
  );

  const renderVerticalItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.verticalItem}>
      <Text style={styles.verticalItemTitle}>{item.title}</Text>
      <FlatList
        data={generateHorizontalData()}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Timer: {formatTime(time)}</Text>
      </View>
      <FlatList
        data={verticalData}
        renderItem={renderVerticalItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  verticalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  verticalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalItem: {
    width: width * 0.3,
    height: 100,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  horizontalItemText: {
    textAlign: 'center',
  },
});
