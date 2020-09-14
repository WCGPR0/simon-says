import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, TextInput, Keyboard } from 'react-native';

export default function App() {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(Dimensions.get('window').height);
  const [width, setWidth] = useState<number>(Dimensions.get('window').width);
  const [seq, setSeq] = useState<number[]>([]);
  const [seqIt, setSeqIt] = useState<number>(0);
  const [css, setCss] = useState<any[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [score, setScore] = useState<number>(1);
  const [scores, setScores] = useState<number[]>([]);

  const blink = (newSeq: number) => {
    let css_ = new Array(4);
    css_[newSeq-1] = { borderColor: 'black', borderWidth: 20 };
    setCss(css_);
    setTimeout(() => {setCss([])}, 500);
  }
  
  const playSeq = () => {
    setIsActive(false);
    setSeqIt(0);
    let i = 0;
    let newSeq = Math.floor(Math.random() * 4 + 1);
    const seqCurrent = [...seq, newSeq];
    setSeq(seqCurrent);
    const id = setInterval(() => {
      blink(seqCurrent[i++]);
      if (i === seqCurrent.length) {
        clearInterval(id);
        setIsActive(true);
      }
    }, 1000);
  }

  const reset = () => {
    setScores(scores_ => [...scores_, score]);
    setIsActive(false);
    setModalVisible(true);
    setScore(1);
    setSeq([]);
    setSeqIt(0);
  }

  const guess = (seqVal: number) => {
    if (!isActive) return;
    if (seq[seqIt] === seqVal) {
      setScore(score*2);
      setSeqIt(seqIt+1);
      if (seqIt >= seq.length - 1) {
        playSeq();
      }
    }
    else  {
      reset();
    }
  };

  return (
    <View style={styles.container} pointerEvents={isActive ? 'box-none' : 'none'} onLayout={(event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setWidth(width);
      setHeight(height);
    }}>
      <StatusBar style="auto" />
      <Text style={{ position: 'absolute', top: '10%', left: '10%', fontSize: 40, color: '#000' }}>
        Level: {seq.length} <br />
        Score: {score}
      </Text>
      <TouchableOpacity
        onPress={() => guess(1)}
        style={[styles.button, {
          top: (height / 2) - 200,
          left: (width / 2) - 200,
          backgroundColor: 'red',
          borderTopLeftRadius: 200 / 4
        }, css[0]]}>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => guess(2)}
        style={[styles.button, {
          top: (height / 2) - 200,
          left: (width / 2),
          backgroundColor: 'green',
          borderTopRightRadius: 200 / 4
        }, css[1]]}>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => guess(3)}
        style={[styles.button, {
          top: (height / 2),
          left: (width / 2) - 200,
          backgroundColor: 'yellow',
          borderBottomLeftRadius: 200 / 4
        }, css[2]]}>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => guess(4)}
        style={[styles.button, {
          top: (height / 2),
          left: (width / 2),
          backgroundColor: 'blue',
          borderBottomRightRadius: 200 / 4
        }, css[3]]}>
      </TouchableOpacity> 
      {
      modalVisible &&
      <TouchableOpacity onPress={() => { setModalVisible(false); playSeq(); }} style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: "rgba(0,0,0,0.5)", alignItems: 'center', justifyContent: 'center' }}>
      <View style={{width:'50%', height:'50%', backgroundColor: "rgba(255,255,255,0.8)", alignItems: 'center', justifyContent: 'center' }} pointerEvents="auto">
      {!scores.length ? null : <View style={{position: 'absolute', top: 20, left: 50}}>
        <Text style={{fontSize: 16, color: 'red'}}>High Score:</Text>
      <FlatList data={scores.sort((a,b) => a-b).reverse().slice(0,3)} keyExtractor = {item => item.toString()} renderItem = {({item}) => (
        <View style={ {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16
        }}>
          <Text>{item}</Text>
        </View>
      )} />
      </View> 
      }
      <Text>
        Welcome to Simon Says!
      </Text>
      <TextInput
        autoFocus
        onFocus={() => Keyboard.dismiss()}
        onKeyPress={ (e) => { if (e.nativeEvent.key === ' ') { setModalVisible(false); playSeq();} } } 
        placeholder="Click, tap, or press space to continue..."
        editable = {false}
        style= {{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
        />
      </View>
      </TouchableOpacity>
      }
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
    width: 200,
    height: 200,
    position: 'absolute'
  }
});
