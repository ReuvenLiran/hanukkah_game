const synth = require('synth-js');
const fs = require('fs');

let midiBuffer = fs.readFileSync('song.mid');
// convert midi buffer to wav buffer
let wavBuffer = synth.midiToWav(midiBuffer).toBuffer();

fs.writeFileSync('song.wav', wavBuffer, {encoding: 'binary'});