import styles from './Tools.module.scss';
import stylesBtn from '../Panel/Panel.module.scss';
import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import classNames from 'classnames';
import { ToolsEditor } from './ToolsEditor/ToolsEditor';

enum Active {
  Headers = 'Headers',
  Variables = 'Variables',
  None = '',
}

type Props = {
  variables: string;
  setVariables: Dispatch<SetStateAction<string>>;
  headers: string;
  setHeaders: Dispatch<SetStateAction<string>>;
};

export const Tools = memo(function Tools(props: Props) {
  console.log('Tools rendered');
  const [visible, visibleActive] = useState(false);
  const [activeTab, setActiveTab] = useState<Active>(Active.Variables);
  const openClose = () => {
    const currentState = visible;
    visibleActive((value) => !value);
  };

  return (
    <>
      <div className={styles.toolsHeader}>
        <div className={styles.tabs}>
          <Button
            onClick={() => setActiveTab(Active.Variables)}
            theme={ButtonTheme.OUTLINE}
            className={classNames(stylesBtn.btn, {
              [styles.activeTab]: visible && activeTab === Active.Variables,
            })}
          >
            Variables
          </Button>
          <Button
            onClick={() => setActiveTab(Active.Headers)}
            theme={ButtonTheme.OUTLINE}
            className={classNames(stylesBtn.btn, {
              [styles.activeTab]: visible && activeTab === Active.Headers,
            })}
          >
            Headers
          </Button>
        </div>
        <Button
          onClick={openClose}
          size={ButtonSize.M}
          theme={ButtonTheme.OUTLINE}
          className={stylesBtn.btn}
        >
          ^
        </Button>
      </div>
      <div className={classNames(styles.toolsEditor, { [styles.hideToolsEditor]: !visible })}>
        {activeTab === Active.Headers ? (
          <ToolsEditor state={props.headers} setState={props.setHeaders} />
        ) : (
          <ToolsEditor state={props.variables} setState={props.setVariables} />
        )}
      </div>
    </>
  );
});
