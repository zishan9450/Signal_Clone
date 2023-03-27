import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItems from '../components/CustomListItems'
import { Avatar } from 'react-native-elements';
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({navigation}) => {

  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe =db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    )
  );
    return unsubscribe
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Signal",
        headerStyle: {backgroundColor: "#fff"},
        headerTitleStyle: {color: "black"},
        headerTintColor: "black",
        headerLeft: () => (
          <View style={{ marginLeft: 0 }}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View 
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 80,
              marginRight: 20,
            }}
          >
            <TouchableOpacity>
              <AntDesign name='camerao' size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity />
            <TouchableOpacity  
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}>
              <SimpleLineIcons name='pencil' size={24} color="black"/>
            </TouchableOpacity>
          </View>
        ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) =>{
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar style='dark'/>
      <ScrollView style={styles.container}>
          {chats.map(({id, data: {chatName}}) => (
            <CustomListItems 
            key={id} 
            id={id} 
            chatName={chatName}
            enterChat={enterChat}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }
})