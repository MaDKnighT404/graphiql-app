import { Input } from 'components/Input/Input';
import styles from './GraphQlPage.module.scss';

export const GraphQlPage = () => {
  return (
    <section className={styles.graphql}>
      <Input autofocus label="Hi" id="hi" />
    </section>
  );
};
