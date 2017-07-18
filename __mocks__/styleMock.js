module.exports = new Proxy(
  {},
  {
    get(target, name) {
      return `Style__${name}`;
    },
  }
);
