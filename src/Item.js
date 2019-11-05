import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: this.props.data.done == '1' ? style.done : style.undone,
    };

    this.marcar = this.marcar.bind(this);
  }

  marcar() {
    let state = this.state;

    let done = 'sim';

    if (state.done == style.undone) {
      state.done = style.done;
      done = 'Sim';
    } else {
      state.done = style.undone;
      done = 'Nao';
    }

    fetch(this.props.url + '/' + this.props.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: done,
      }),
    })
      .then(r => r.json())
      .then(json => {});

    this.setState(state);
  }

  render() {
    return (
      <View style={style.area}>
        <TouchableHighlight
          style={[style.marcarArea, this.state.done]}
          onPress={this.marcar}>
          <View />
        </TouchableHighlight>
        <Text>{this.props.data.item}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  area: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marcarArea: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  undone: {
    backgroundColor: '#CCCCCC',
  },
  done: {
    backgroundColor: '#00FF00',
  },
});
