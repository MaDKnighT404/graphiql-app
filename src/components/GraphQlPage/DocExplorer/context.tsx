import { GraphQLField, GraphQLInputField, GraphQLArgument, GraphQLNamedType } from 'graphql';
import { useCallback, useState } from 'react';

export type ExplorerField =
  | GraphQLField<unknown, unknown, unknown>
  | GraphQLInputField
  | GraphQLArgument
  | GraphQLNamedType;

export type NavigationItem = {
  name: string;
  object?: ExplorerField;
};

export type ExplorerNavStack = [...NavigationItem[]];

const initial: NavigationItem = { name: 'Docs' };
const useNavigation = () => {
  const [navStack, setNavStack] = useState<ExplorerNavStack>([initial]);

  // const pop = useCallback(() => {
  //   setNavStack
  // })
};
