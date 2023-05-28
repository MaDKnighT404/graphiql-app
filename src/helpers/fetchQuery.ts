import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { schemaFromExecutor } from '@graphql-tools/wrap';

export const fetchSchema = async (url: string) => {
  const remoteExecutor = buildHTTPExecutor({
    endpoint: url,
  });

  const postsSubschema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
  };

  return postsSubschema.schema;
};
