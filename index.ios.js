/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import './shim'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Vex from 'vexflow'

import VexFlow from './vexflow_component'

VF = Vex.Flow

export default class AwesomeProject extends Component {
  render() {
    var notes = [
      // A quarter-note C.
      new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),

      // A quarter-note D.
      new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),

      // A C-Major chord.
      new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
    ];
    var voice = new VF.Voice({num_beats: 4, beat_value: 4});
    voice.addTickables(notes);
    var stave = new VF.Stave(0, 0, 200);
    stave.addClef("treble").addTimeSignature("4/4");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <View>
          <VexFlow
            height={200}
            width={200}
            font={[ 'Arial', 10, '' ]}
            stave={stave}
            voice={voice}
            />
        </View>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
