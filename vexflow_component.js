import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Vex from 'vexflow'
import Svg, {G, Rect, Path} from 'react-native-svg'

VF = Vex.Flow

function loadOpentypeFont(filename) {
  return new Promise((resolve, reject) => {
    opentype.load(filename, (error, font) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(font);
    });
  });
}

async function loadFontPack() {
  return {
    NotoSans: {
      regular: await loadOpentypeFont('./fonts/NotoSans-Regular.ttf'),
      italic: await loadOpentypeFont('./fonts/NotoSans-Italic.ttf'),
      bold: await loadOpentypeFont('./fonts/NotoSans-Bold.ttf'),
      bolditalic: await loadOpentypeFont('./fonts/NotoSans-BoldItalic.ttf')
    },
    NotoSerif: {
      regular: await loadOpentypeFont('./fonts/NotoSerif-Regular.ttf'),
      italic: await loadOpentypeFont('./fonts/NotoSerif-Italic.ttf'),
      bold: await loadOpentypeFont('./fonts/NotoSerif-Bold.ttf'),
      bolditalic: await loadOpentypeFont('./fonts/NotoSerif-BoldItalic.ttf')
    },
    getFont: function(style) {
      /*
        times, Times, Times New Roman, serif, Serif => Noto Serif
        Arial, sans-serif... default => Noto Sans
      */
      var fontName = /(times|serif)+/i.test(style['font-family']) ?
        'NotoSerif' : 'NotoSans';

      var fontStyle = '';
      if (style['font-weight'] === 'bold') fontStyle = 'bold';
      if (style['font-style'] === 'italic') fontStyle += 'italic';
      if (fontStyle.length === 0) fontStyle = 'regular';

      return this[fontName][fontStyle];
    }
  };
}

var getBoundingBox = require('svg-path-bounding-box');
var opentype = require('opentype.js');
var fontPack = loadFontPack();

var options = {
  React: React,
  Components: {'g': G, 'svg': Svg, 'rect': Rect, 'path': Path, 'text': Text},
  getBoundingBox: getBoundingBox,
  fontPack: fontPack
};

export default class VexFlow extends Component {

    constructor(props) {
        super(props);

        this._renderer = null;
        this._context = null;
    }

    componentDidMount() { this.handleProps() }
    componentDidUpdate() { this.handleProps() }

    handleProps() {

      console.log("HANDLING PROPS");
      this.clear();

      const {
        width = 500,
        height = 500,
        font = [ 'Arial', 10, '' ],
        fontColor = '#eed',
        stave,
        notes,
        voice,
      } = this.props;

      this._context = VF.Renderer.getTextSVGContext(options, width, height);

      this._context
        .setFont(...font)
        .setBackgroundFillStyle(fontColor);

      stave.setContext(this._context).draw();

      var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 50);
      voice.draw(this._context, stave);
    }

    clear() {
    }

    render() {
      this.handleProps();
      console.log(this._context.toSVG());
          //{this._context.toSVG()}
      return (
        <View>
          <Text>
            The Vexflow view is supposed to be here
          </Text>
          { this._context.toSVG() }
        </View>
      );
    }
}
