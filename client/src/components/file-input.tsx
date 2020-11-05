import React, { ChangeEvent, useRef, useState } from 'react';
import { useMount } from 'react-use';
import { Input } from 'antd';

const FileInput = () => {
  const [srcPath] = useState('');
  const inputRef = useRef(null);
  useMount(() => {
    // @ts-ignore
    inputRef.current.webkitdirectory = 'webkitdirectory';
  });

  const pathChange = (e: ChangeEvent) => {
    // @ts-ignore
    console.log(e.target.value);
  };
  return (
    <Input.Group>
      <Input value={srcPath} defaultValue={''}></Input>
      <input type="file" ref={inputRef} onChange={pathChange} />
    </Input.Group>
  );
};

export default FileInput;
