import { makeExecutableSchema } from 'graphql-tools';

const resolvers = {
  Query: {
    characters: async (_, args, { dataSources }) => {
      const { page, filter } = args;
      const { results } = await dataSources.rickAndMortyAPI.getCharacters({
        page,
        filter,
      });
      return {
        results,
      };
    },
  },
  Query: {
    character: async (_, { id }, { dataSources }) => {
      const character = await dataSources.rickAndMortyAPI.getCharacterById(id);
      return character;
    },
  },
};

const typeDefs = `
  type Query {
    character(id: ID!): Character
    characters: Characters
    charactersByIds(ids: [ID!]!): [Character]
    episode(id: ID!): Episode
    episodes: Episodes
    episodesByIds(ids: [ID!]!): [Episode]
    location(id: ID!): Location
    locations: Locations
    locationsByIds(ids: [ID!]!): [Location]
  }

  type Characters {
    info: Info
    results: [Character]
  }

  type Character {
    created: String
    episode: [Episode]
    gender: String
    id: ID
    image: String
    location: Location
    name: String
    origin: Location
    species: String
    status: String
    type: String
  }

  type Episodes {
    info: Info
    results: [Episode]
  }

  type Episode {
    air_date: String
    characters: [Character]
    created: String
    episode: String
    id: ID
    name: String
  }

  type Locations {
    info: Info
    results: [Location]
  }

  type Location {
    created: String
    dimension: String
    id: ID
    name: String
    residents: [Character]
    type: String
  }

  type Info {
    count: Int
    next: Int
    pages: Int
    prev: Int
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
