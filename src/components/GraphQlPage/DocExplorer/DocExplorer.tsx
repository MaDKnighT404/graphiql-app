import classnames from 'classnames';
import styles from './DocExplorer.module.scss';
import { useContext } from 'react';
import { GraphQLSchema } from 'graphql';
import { Type } from './Type/Type';
import { Schema } from './Schema/Schema';
import { DocHeader } from './DocHeader/DocHeader';
import { NavContext } from './NavContext';

type Props = {
  docsOpen: boolean;
  schema?: GraphQLSchema;
};

export const DocExplorer = ({ docsOpen, schema }: Props) => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('There is no navigation');
  }
  const { lastGraph } = context;
  return (
    <NavContext.Provider value={context}>
      <div
        className={classnames(
          styles.docs,
          { [styles.docsVisible]: docsOpen },
          { [styles.docsInvisible]: !docsOpen }
        )}
      >
        {schema ? (
          <div className={styles.graphQlExplorer}>
            <DocHeader />
            {lastGraph ? <Type graph={lastGraph} /> : <Schema schema={schema} />}
          </div>
        ) : (
          <div>No schema</div>
        )}
      </div>
    </NavContext.Provider>
  );
};
