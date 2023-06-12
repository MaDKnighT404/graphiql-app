import styles from './Tools.module.scss';
import stylesBtn from '../Panel/Panel.module.scss';
import { Button } from 'components/Button/Button';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import classNames from 'classnames';
import { ToolsEditor } from './ToolsEditor/ToolsEditor';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [visible, visibleActive] = useState(false);
  const [activeTab, setActiveTab] = useState<Active>(Active.Variables);
  const openClose = () => {
    visibleActive((value) => !value);
  };

  return (
    <>
      <div className={styles.toolsHeader}>
        <div className={styles.tabs}>
          <Button
            onClick={() => {
              !visible ? openClose() : null;
              setActiveTab(Active.Variables);
            }}
            className={classNames(stylesBtn.btn, {
              [styles.activeTab]: visible && activeTab === Active.Variables,
            })}
          >
            {t('Variables')}
          </Button>
          <Button
            onClick={() => {
              !visible ? openClose() : null;
              setActiveTab(Active.Headers);
            }}
            className={classNames(stylesBtn.btn, {
              [styles.activeTab]: visible && activeTab === Active.Headers,
            })}
          >
            {t('Headers')}
          </Button>
        </div>
        <Button onClick={openClose} className={stylesBtn.btn}>
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
