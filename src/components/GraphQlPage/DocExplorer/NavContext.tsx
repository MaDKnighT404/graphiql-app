import { GraphQLField, GraphQLNamedType } from 'graphql';
import { createContext, useCallback, useState } from 'react';

export type ExplorerField = GraphQLField<unknown, unknown, unknown> | GraphQLNamedType;

export type NavigationItem = {
  name: string;
  graph?: ExplorerField;
};

export type NavContextType = {
  navStack: NavigationItem[];
  pushItem: (item: NavigationItem) => void;
  popItem: () => void;
  lastGraph: ExplorerField | undefined;
};

const initial: NavigationItem = { name: 'Docs' };

type Props = {
  children: React.ReactNode;
};

export const NavContext = createContext<NavContextType | null>(null);

export const NavigationProvider = ({ children }: Props) => {
  const [navStack, setNavStack] = useState<NavigationItem[]>([initial]);

  const pushItem = useCallback(
    (item: NavigationItem) => {
      setNavStack((prev) => {
        const lastItem = prev.at(-1)!;
        return lastItem.graph === item.graph ? prev : [...prev, item];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navStack]
  );

  const popItem = useCallback(() => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);
  const lastGraph = navStack.at(-1) && navStack.at(-1)?.graph ? navStack.at(-1)?.graph : undefined;
  const context = { navStack, pushItem, popItem, lastGraph };

  return <NavContext.Provider value={context}>{children}</NavContext.Provider>;
};
