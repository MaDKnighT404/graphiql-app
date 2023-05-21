import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
// import { AsyncExecutor } from '@graphql-tools/utils';

// const url = 'https://rickandmortyapi.com/graphql';
export const fetchSchema = async (url: string) => {
  const remoteExecutor = buildHTTPExecutor({
    endpoint: url,
  });

  const postsSubschema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  // const fields = postsSubschema.schema.getQueryType()?.getFields();
  // const result = JSON.parse(JSON.stringify(fields));
  // console.log('result', result);
  return postsSubschema.schema;
};
