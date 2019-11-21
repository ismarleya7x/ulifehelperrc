import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, Modal, TouchableHighlight, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from '../services/api';

import { Post, Header, Avatar, Name, Description } from './styles';

// import { Container } from './styles';

export default function BuscaSala({ navigation }) {
  const aluno = navigation.getParam('aluno');
  const [showModal, setShowModal] = useState(false);
  const [aulas, setAulas] = useState(null);
  const [dados, setDados] = useState([]);
  const [sala, setSala] = useState("");
  const [local, setLocal] = useState("");

  useEffect(() => {
    async function loadMaterias() {
      api.get('http://127.0.0.1:5000/aluno/materias', { 'headers': { 'token': aluno.token } })
        .then(function (response) {
          setAulas(response.data)
          console.log(aulas)
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.status == 404) {
            Alert.alert("Nenhuma materia encontrada")
          }
        });
    }
    loadMaterias()
  }, []);

  function apresentaModal(id) {

    if (showModal == false) {
      carregaLocalizacao(id)
    } else {
      setShowModal(false)
    }

  }

  async function carregaLocalizacao(id) {
    const response = await api.get('http://127.0.0.1:5000/aluno/materias/localizacao',
      { 'headers': { 'token': aluno.token, 'id_disciplina': id } }
    )
    
    setShowModal(true)
    setDados(response.data[0])
  }
  
  useEffect(() => {
    async function reloadModal() {
      setSala(dados.nome);
      setLocal(dados.localizacao)
    }
    reloadModal()
  }, [dados]);

  return (
    <LinearGradient
      colors={['#dbe830', '#06cef0', '#28a1fd']}
      style={styles.linearGradient}
      start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 0.8 }}
      locations={[0, 0.5, 0.6]}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Aulas de hoje</Text>
        </View>
        <FlatList
          data={aulas}
          keyExtractor={item => String(item.id_disciplina)}
          renderItem={({ item }) => (
            <Post
              onPress={() => apresentaModal(item.id_disciplina)}
            >
              <Header>
                <Avatar />
              </Header>
              <Description>
                <Name>{item.nome} - </Name>
                <Name>{item.id_disciplina}</Name>
              </Description>
            </Post>
          )}
        />
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}>
        <View style={styles.containerModal}>
          <View style={styles.modalView}>
            <Text
              style={styles.modalTitulo}
            >{sala}</Text>
            <Text
              style={styles.modalLocalizacao}
            >{local}</Text>
            <TouchableHighlight
              style={styles.btnClose}
              onPress={() => apresentaModal(0)}
            >
              <Text
                style={styles.btnLabel}
              >Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </LinearGradient >
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
  header: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    width: '80%'
  },
  headerText: {
    textAlign: 'center'
  },
  containerModal: {
    flex: 1,
    marginTop: '35%',
    alignItems: 'center',
  },
  modalView: {
    width: 325,
    height: 300,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 10
  },
  modalTitulo: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  modalLocalizacao: {
    textAlign: 'justify',
    paddingBottom: 10
  },
  btnClose: {
    width: 225,
    borderRadius: 10,
    top: "50%",
    left: "12%",
    backgroundColor: '#0000ff',
    padding: 10,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#fff',
  }
});
