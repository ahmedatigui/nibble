'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';

// Atoms
import { configParamsAtom, httpRequestConfigAtom } from '@/utils/atoms';

// Components
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons';

function KeyValueList({ order }: { order: number }) {
  const [fresh, setFresh] = useState(true);
  const [isKeyValueAllowed, setKeyValueAllowed] = useState(true);
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(httpRequestConfigAtom);
  const [configParams, setConfigParams] = useAtom(configParamsAtom);

  useEffect(() => console.log(isKeyValueAllowed), [isKeyValueAllowed]);

  const updateKey = (index: number, newKey: string) => {
    setConfigParams(prevState => ({
      ...prevState,
      lists: prevState.lists.map((item, i) => i === index ? { ...item, key: newKey } : item)
    }));
    console.log(configParams.lists[order].key);
  }

  const updateValue = (index: number, newValue: string) => {
    setConfigParams(prevState => ({
      ...prevState,
      lists: prevState.lists.map((item, i) => i === index ? { ...item, value: newValue } : item)
    }));
    console.log(configParams.lists[order].value);
  }

  return (
    <div className="keyValueListRow">
      <div className="keyValueListInput">
        <input className="key" id="key" placeholder="Key" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateKey(order, e.target.value)} 
        />
      </div>
      <div className="keyValueListInput">
        <input
          className="keyValueListInput value"
          id="value"
          placeholder="Value"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateValue(order, e.target.value)}
        />
      </div>
      <div className="keyValueListCheckBox">
        <Checkbox.Root
          className="CheckboxRoot"
          checked={isKeyValueAllowed}
          onCheckedChange={() => setKeyValueAllowed(!isKeyValueAllowed)}
          id="c1"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="keyValueListButton">
        <button>
          <span>
            <TrashIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

export default KeyValueList;
