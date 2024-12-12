import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ScreenersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Screeners</Text>
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Strategy</Text>
        <Text style={styles.tab}>Scanners</Text>
        <Text style={styles.tab}>My Screens</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.activeButton]}>
          <Text style={styles.buttonText}>Bullish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bearish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.strategyContainer}>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>Price + Volume Up</Text>
        </View>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>Price + OI Up (For Stocks & Index)</Text>
        </View>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>Price Above MA</Text>
        </View>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>MA Crossover (Golden Crossover)</Text>
        </View>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>Long Build Up (For Stocks & Index)</Text>
        </View>
        <View style={styles.strategyItem}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
          <Text style={styles.strategyText}>Short Covering (For Stocks & Index)</Text>
        </View>
      </View>
      <Text style={styles.viewAll}>View All Strategy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    marginRight: 20,
    color: '#aaa',
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  buttonText: {
    color: '#fff',
  },
  strategyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  strategyItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  strategyText: {
    fontSize: 14,
  },
  viewAll: {
    fontSize: 16,
    color: '#0000ff',
    textAlign: 'center',
    marginTop: 20,
  },
});
