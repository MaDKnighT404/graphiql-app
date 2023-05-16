import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';
import { AsyncExecutor } from '@graphql-tools/utils';

export async function fetcher(query: string) {
  const url = 'https://rickandmortyapi.com/graphql';
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  return await r.json();
}

const url = 'https://rickandmortyapi.com/graphql';
export const fetchSchema = async () => {
  const remoteExecutor = buildHTTPExecutor({
    endpoint: url,
  });

  const postsSubschema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  const fields = postsSubschema.schema.getQueryType()?.getFields();
  const result = JSON.parse(JSON.stringify(fields));
  // console.log('result', result);
  return postsSubschema.schema;
};
