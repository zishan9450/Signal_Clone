import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Image, Input } from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() =>{
      const unsubscribe = auth.onAuthStateChanged((authUser) =>{
        console.log(authUser);
        if (authUser) {
          navigation.replace("Home");
        }
      });

      return unsubscribe;
    }, []);

    const signIn = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image
        source={{
            uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
        }}
        style={{width: 120, height: 120}}
      />
      <View style={styles.inputContainer}>
        <Input 
        placeholder='Email' 
        autoFocus 
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <Input 
        placeholder='Password' 
        secureTextEntry 
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={signIn}
        />
        <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
        <Button onPress={()=> navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register"/>
        <View style={{height:100}}/>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 300,
        marginTop: 10,
    },
});