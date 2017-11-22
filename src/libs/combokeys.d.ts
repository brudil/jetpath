declare module 'combokeys' {
  class Combokeys {
    constructor(root: any);
  }
  export = Combokeys;
}

declare module 'combokeys/plugins/global-bind' {
  function plugin(combokeys: any) {
  }
  export = plugin;
}
