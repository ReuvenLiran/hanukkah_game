export const WALKING_FRAMES = [
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

export const SPEAKING_FRAMES = [19, 20, 21, 22, 23];
export const SPEAKING_WITH_CANDLE_FRAMES = [34, 35, 36, 37, 38];

export const USE_CANDLE_FREAMES = [
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
];

export const THROW_CANDLE_FREAMES = [
  33,
  32,
  31,
  30,
  29,
  28,
  27,
  26,
  25,
  24,
]

export const TYPES = {
  WALKING: 'WALKING',
  SPEAKING: 'SPEAKING',
  USE_CANDLE: 'USE_CANDLE',
  THROW_CANDLE: 'THROW_CANDLE',
  SPEAKING_WITH_CANDLE: "SPEAKING_WITH_CANDLE"
}

export const FRAMES_BY_TYPE = {
  [TYPES.WALKING]: WALKING_FRAMES,
  [TYPES.SPEAKING]: SPEAKING_FRAMES,
  [TYPES.SPEAKING_WITH_CANDLE]: SPEAKING_WITH_CANDLE_FRAMES,
  [TYPES.USE_CANDLE]: USE_CANDLE_FREAMES,
  [TYPES.THROW_CANDLE]: THROW_CANDLE_FREAMES,
}