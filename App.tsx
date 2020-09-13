import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const tick = () => {
  const [isActive] = useState(true);
  if (!isActive) return;

  
}

export default function App() {
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  return (
    <View style={styles.container} onLayout={(event) => {
      const {x, y, width, height} = event.nativeEvent.layout;
      setWidth(width);
      setHeight(height);
    }}>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        key={1}
        style={[styles.button, { 
          top: (height / 2) - 100,
          left: (width / 2) - 100,
          backgroundColor: 'red',
          borderTopLeftRadius: 100/4
          }]}>
        <Text style={{ fontSize: 20, color: '#fff' }}></Text>
      </TouchableOpacity>      
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        key={2}
        style={[styles.button, { 
          top: (height / 2) - 100,
          left: (width / 2),
          backgroundColor: 'green',
          borderTopRightRadius: 100/4
          }]}>
        <Text style={{ fontSize: 20, color: '#fff' }}></Text>
      </TouchableOpacity>      
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        key={3}
        style={[styles.button, { 
          top: (height / 2),
          left: (width / 2) - 100,
          backgroundColor: 'yellow',
          borderBottomLeftRadius: 100/4
          }]}>
        <Text style={{ fontSize: 20, color: '#fff' }}></Text>
      </TouchableOpacity>      
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        key={4}
        style={[styles.button, { 
          top: (height / 2),
          left: (width / 2),
          backgroundColor: 'blue',
          borderBottomRightRadius: 100/4
          }]}>
        <Text style={{ fontSize: 20, color: '#fff' }}></Text>
      </TouchableOpacity>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    width: 100,
    height: 100,
    position: 'absolute'
  }
});
