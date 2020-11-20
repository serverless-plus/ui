import React, { forwardRef } from 'react';
import { UnControlled } from 'react-codemirror2';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

import styles from './index.less';

type Props = {
  code: string | undefined;
  onChange?: (v: any) => void;
  [prodName: string]: any;
};

const CodeMirror = forwardRef(({ code, onChange, className }: Props, ref: any) => {
  return (
    <UnControlled
      className={className ? `${styles.codeMirror} ${className}` : styles.codeMirror}
      ref={ref}
      value={code}
      onBlur={onChange}
      options={{
        theme: 'monokai',
        keyMap: 'sublime',
        mode: 'yaml',
      }}
    />
  );
});

export default CodeMirror;
