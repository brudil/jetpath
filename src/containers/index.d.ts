declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const value: DocumentNode;
  export = value;
}

declare module '*.svg' {
  const value: any;
  export = value;
}
