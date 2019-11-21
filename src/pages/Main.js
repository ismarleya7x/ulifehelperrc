import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api';

import { Post, Header, Avatar, Name, Description } from './styles';

import direction from '../assets/Main/direction.png';
import lab from '../assets/Main/laboratorio.png';
import calendar from '../assets/Main/calendar.png';

const DATA = [
  {
    id: '0',
    title: 'Busque sua sala',
    image: direction
  },
  {
    id: '1',
    title: 'Procure um laboratório',
    image: lab
  },
  {
    id: '2',
    title: 'Agenda cultural Anima',
    image: calendar
  },
];

export default function Main({ navigation }) {
  const aluno = navigation.getParam('aluno');

  function handleSelect(tpPesquisa) {
    if(tpPesquisa == 0){
      navigation.navigate('BuscaSala', { aluno: aluno });   
    }else if(tpPesquisa == 1){
      navigation.navigate('BuscaLab', { aluno: aluno });
    }else{
      navigation.navigate('Eventos', { aluno: aluno });
    }
  }

  return (
    <LinearGradient
      colors={['#dbe830', '#06cef0', '#28a1fd']}
      style={styles.linearGradient}
      start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 0.8 }}
      locations={[0, 0.5, 0.6]}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Seja bem vindo, {aluno.nome}</Text>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Post
              onPress={() => handleSelect(item.id)}
            >
              <Header>
                <Avatar source={item.image} />
              </Header>
              <Description>
                <Name>{item.title}</Name>
              </Description>
            </Post>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 350
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    width: '80%'
  },
  headerText:{
    textAlign: 'center'
  }
});