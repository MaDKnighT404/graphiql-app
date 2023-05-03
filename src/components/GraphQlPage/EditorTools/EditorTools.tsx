import styles from './EditorTools.module.scss';
import stylesBtn from '../Panel/Panel.module.scss';

import { Button, ButtonSize, ButtonTheme } from 'components/Button/Button';
import { useState } from 'react';
import classNames from 'classnames';

export const EditorTools = () => {
  const [visible, visibleActive] = useState(false);
  const [tab, setTab] = useState('Variables');
  return (
    <>
      <div className={styles.tools}>
        <div className={styles.tabs}>
          <Button
            onClick={() => console.log('Variables')}
            size={ButtonSize.M}
            theme={ButtonTheme.OUTLINE}
            className={stylesBtn.btn}
          >
            Variables
          </Button>
          <Button
            onClick={() => console.log('Headers')}
            size={ButtonSize.M}
            theme={ButtonTheme.OUTLINE}
            className={stylesBtn.btn}
          >
            Headers
          </Button>
        </div>
        <Button
          onClick={() => visibleActive((value) => !value)}
          size={ButtonSize.M}
          theme={ButtonTheme.OUTLINE}
          className={stylesBtn.btn}
        >
          ^
        </Button>
      </div>
      <div className={classNames(styles.toolsEditor, { [styles.hideToolsEditor]: !visible })}></div>
    </>
  );
};
