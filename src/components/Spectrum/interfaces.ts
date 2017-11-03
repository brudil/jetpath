///<reference path="../../../node_modules/@types/react/index.d.ts"/>
import { ReactElement, ReactNode, ValidationMap } from 'react';

export type SpectrumRenderElement<P = {}> = SpectrumStatelessComponent<P>;
interface SpectrumStatelessComponent<P = {}> {
  (props: P & { children?: ReactNode }, context?: any): ReactElement<
    any
  > | null;
  propTypes?: ValidationMap<P>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
  Icon?: any;
  panel?: any;
}
