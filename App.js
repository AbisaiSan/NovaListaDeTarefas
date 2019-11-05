/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from 'react-native';
import Item from './src/Item';

export default class TodoOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      input: '',
    };
    this.url = 'https://b7web.com.br/todo/24249';

    this.loadLista = this.loadLista.bind(this);
    this.addButton = this.addButton.bind(this);

    this.loadLista();
  }
  loadLista() {
    fetch(this.url)
      .then(r => r.json())
      .then(json => {
        let state = this.state;
        state.lista = json.todo;
        this.setState(state);
      });
  }

  addButton() {
    let texto = this.state.input;

    let state = this.state;
    state.input = '';
    this.setState(state);
    alert('Adicionado com sucesso');
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.addArea}>
          <Text style={style.addTxt}>Anotações</Text>
          <TextInput
            style={style.input}
            onChangeText={text => {
              let state = this.state;
              state.input = text;
              this.setState(state);
            }}
            value={this.state.input}
          />
          <Button title="Adicionar" onPress={this.addButton} />
        </View>
        <FlatList
          data={this.state.lista}
          renderItem={({item}) => <Item data={item} url={this.url} />}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  addArea: {
    marginBottom: 20,
    backgroundColor: '#DDDDDD',
  },
  input: {
    height: 40,
    backgroundColor: '#CCCCCC',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addTxt: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});
