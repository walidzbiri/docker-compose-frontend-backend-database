/* eslint-disable no-plusplus */
const stickers = require('../stickers');

let count = 1;
module.exports = stickers.map((sticker) => ({ id: count++, ...sticker }));
