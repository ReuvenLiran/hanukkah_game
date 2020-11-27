const scribble = require('scribbletune');
//   const clips = ['1032', '2032', '4021', '3052'].map(order =>
const clips = ['3052'].map(order =>

scribble.clip({
    pattern: '[x-RR]'.repeat(8), // R will play notes from our progression
    //   pattern: '[xx][xR]'.repeat(4),
      notes: scribble.arp({
        chords: 'C',

        // chords: 'Dm BbM Am FM BbM FM CM Gm',
        count: 4,
        order: '1032'
      }),
      accent: 'x-xx--xx',
    })
  );
  scribble.midi([].concat(...clips), 'song.mid');