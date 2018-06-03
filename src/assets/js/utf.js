export function toUtf8(str) {
    console.log(str, "-----str----");
    if (/[\u0080-\uFFFF]/.test(str)) {
      str = unescape(encodeURIComponent(str));
    }

    return str;
  }
