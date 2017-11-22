declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.svgc' {
  const value: Any;
  export = value;
}
