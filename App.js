// @refresh reset
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCJhqE3Dg5RegbP4OhKOzl5vSqVFkDNKdA",
  authDomain: "chat-now-6d4ae.firebaseapp.com",
  databaseURL: "https://chat-now-6d4ae.firebaseio.com",
  projectId: "chat-now-6d4ae",
  storageBucket: "chat-now-6d4ae.appspot.com",
  messagingSenderId: "627102683376",
  appId: "1:627102683376:web:54c678720a1c8b16b83235"
}

if (firebase.apps.length === 0) {
  // Initialize app only in the first time
  firebase.initializeApp(firebaseConfig)
}

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
