import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { useState } from 'react';
import { useEffect } from 'react';
import { auth, db } from '../firebase';

const CustomListItems = ({ id, chatName, enterChat}) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

      return unsubscribe;
  });
  return (
    <ListItem 
      key = {id}
      onPress={() => enterChat(id, chatName)} 
      bottomDivider>
      <Avatar
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL || 
            "https://stmatthewspampa.org/images/staff/m_fld15_defaultstaff.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight: "800"}}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItems

const styles = StyleSheet.create({})