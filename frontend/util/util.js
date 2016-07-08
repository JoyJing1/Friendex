"use strict";

const Util = {
  resizeImg(img, width, height) {
    const parser = document.createElement('a');
    parser.href = img;

    const i = parser.pathname.indexOf("upload/");

    const left = parser.pathname.slice(0, i+"upload/".length);
    const right = parser.pathname.slice(i+"upload/".length);
    let middle = `c_scale,w_${width}`;

    if (height) {
      middle = middle + `,h_${height}/`;
    } else {
      middle = middle + "/";
    }

    const fullPathname = left + middle + right;
    const fullUrl = `${parser.protocol}/${parser.host}${fullPathname}`;

    return fullUrl;
  }
};

module.exports = Util;
