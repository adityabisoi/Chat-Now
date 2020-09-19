// @refresh reset
import { StatusBar } from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View,TextInput, YellowBox, Button } from 'react-native'
import * as firebase from 'firebase'
import {GiftedChat} from 'react-native-gifted-chat'
import 'firebase/firestore'
import AsyncStorage from '@react-native-community/async-storage'

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

const db = firebase.firestore()
const chatsRef = db.collection('chats')

export default function App() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState([])

  useEffect(()=> {
    readUser()
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot.docChanges()
      .filter(({type})=>type==='added')
      .map(({doc})=>{
        const message = doc.data()
        return {...message, createdAt: message.createdAt.toDate()}
      })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        setMessage(messagesFirestore)
    })
  },[])

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }

  async function handlePress() {
   const _id = Math.random().toString(36).substring(7)
   const user = {_id,name}
   await AsyncStorage.setItem('user', JSON.stringify(user))
   setUser(user)
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Enter your name' value={name} onChangeText={setName}/>
        <Button title='Enter the chat' onPress={handlePress}/>
      </View>
    )
  }

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
    padding: 30
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',
    marginBottom: 20
  }
});
