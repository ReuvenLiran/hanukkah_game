export function getImgUrl (name) {
    return `${process.env.PUBLIC_URL}/images/${name}`;
}

export function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, arguments), wait);
    };
  }