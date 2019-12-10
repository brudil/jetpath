interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: React.ReactNode | undefined) => any;
}

export const ConditionalWrap: React.FC<ConditionalWrapProps> = ({ condition, wrap, children }) =>
  condition ? wrap(children) : children;
