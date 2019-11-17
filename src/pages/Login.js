import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity, Alert, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api';

import logoUna from '../assets/logoUlife.png';
import bgCircle from '../assets/bgCircle.png';

export default function Login({ navigation }) {
  const [ra, setRa] = useState('');

  function handleSubmit() {
    console.log(ra);
    api.post('http://127.0.0.1:5000/login', { ra: ra })
      .then(function (response) {
        
        navigation.navigate('Main', { aluno: response.data });        
      })
      .catch(function (error) {
        console.log(error.response);
        if(error.response.status == 404){
          Alert.alert("RA não encontrado")
        }
      });
  }

  return (
    <LinearGradient
      colors={['#dbe830', '#06cef0', '#28a1fd']}
      style={styles.linearGradient}
      start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 0.8 }}
      locations={[0, 0.5, 0.6]}
    >
      <View style={styles.container}>
        <Image source={logoUna} style={styles.logoUna} />
        <ImageBackground source={bgCircle} style={styles.imgBG}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Encontre salas, livros e laboratórios com facilidade</Text>

            <TextInput
              style={styles.input}
              placeholder="Informe seu RA"
              onChangeText={setRa}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btnSubmit}
            >
              <Text style={styles.btnLabel}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingTop: 100
  },
  imgBG: {
    width: '100%',
    height: '125%',
    marginTop: 75
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loginContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#808080',
    padding: 10
  },
  openModalBtn: {
    width: 225,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DCDCDc',
    marginBottom: 5
  },
  txtLink: {
    color: '#0000ff',
    textAlign: 'center'
  },
  txtLinkClose: {
    color: 'red',
    textAlign: 'center'
  },
  vwModal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '62.5%',
    left: '17%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 5,
    padding: 10
  },
  input: {
    width: 225,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DCDCDc',
    padding: 6,
    marginBottom: 5,
    textAlign: 'center'
  },
  btnSubmit: {
    width: 225,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: '#0000ff',
    padding: 10,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#fff',
  }
});