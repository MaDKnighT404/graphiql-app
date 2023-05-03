import styles from './Panel.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { Editor } from 'components/GraphQlPage/Editor/Editor';
import { ReactComponent as Play } from '@/shared/assets/icons/play.svg';
import classNames from 'classnames';
import { EditorTools } from '../EditorTools/EditorTools';
import { graphql } from 'gql';
import { useQuery, gql } from '@apollo/client';

export const Panel = () => {
  const query = graphql(`
    query AllCharacters {
      characters {
        results {
          id
          name
        }
      }
    }
  `);
  const { data } = useQuery(query);
  console.log(data);

  function handleOnClick() {
    console.log('get mirrow text');
  }
  return (
    <div className={styles.panel}>
      <div className={styles.session}>
        <div className={styles.queryEditor}>
          <Editor />
          <Button
            onClick={handleOnClick}
            size={ButtonSize.M}
            theme={ButtonTheme.OUTLINE}
            className={styles.btn}
          >
            <Play className={styles.playBtn} />
          </Button>
        </div>
        {/* <div className={styles.tools}>
          <div className={styles.tabs}>
            <Button
              onClick={handleOnClick}
              size={ButtonSize.M}
              theme={ButtonTheme.OUTLINE}
              className={styles.btn}
            >
              Variables
            </Button>
            <Button
              onClick={handleOnClick}
              size={ButtonSize.M}
              theme={ButtonTheme.OUTLINE}
              className={styles.btn}
            >
              Headers
            </Button>
          </div>
          <Button
            onClick={handleOnClick}
            size={ButtonSize.M}
            theme={ButtonTheme.OUTLINE}
            className={styles.btn}
          >
            ^
          </Button>
        </div> */}
        <EditorTools />
        <div className={classNames(styles.toolsEditor, { [styles.hideToolsEditor]: true })}></div>
      </div>
      <div className={styles.result}>{JSON.stringify(data)}</div>
    </div>
  );
};
