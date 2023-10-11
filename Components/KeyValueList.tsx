"use client";

import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { v4 as uuidV4 } from "uuid";

// Atoms
import { configParamsAtom } from "@/utils/atoms";

// Components
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { paramsAtomType } from "@/utils/types";

function KeyValueList({ order }: { order: number }) {
  const [fresh, setFresh] = useState(true);

  const [list, setList] = useAtom(configParamsAtom);

  const updateKey = (index: number, key: string) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, key } : item
      )
    );
  };

  const updateValue = (index: number, value: string) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, value } : item
      )
    );
  };

  const updateChecked = (index: number, checked: string | boolean) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, checked } : item
      )
    );
  };

  const addItem = () => {
    setList([...list, { id: uuidV4(), key: "", value: "", checked: true }]);
  };

  const removeItem = (index: number) => {
    console.log("Will remove: ", index);
    const ele = list.filter((_, i) => i !== index);
    console.log("New list: ", ele);
    setList(ele);
  };

  return (
    <div className="keyValueListRow">
      <div className="keyValueListInput">
        <input
          className="key"
          id="key"
          placeholder="Key"
          onChange={(e) => {
            updateKey(order, e.target.value);
            if (fresh) {
              addItem();
              setFresh(false);
            }
          }}
        />
      </div>
      <div className="keyValueListInput">
        <input
          className="keyValueListInput value"
          id="value"
          placeholder="Value"
          onChange={(e) => {
            updateValue(order, e.target.value);
            if (fresh) {
              addItem();
              setFresh(false);
            }
          }}
        />
      </div>
      <div className="keyValueListCheckBox">
        <Checkbox.Root
          className="CheckboxRoot"
          defaultChecked={true}
          onCheckedChange={(state) => updateChecked(order, state)}
          id="c1"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="keyValueListButton" onClick={() => removeItem(order)}>
        <button>
          <span>
            <TrashIcon />
          </span>
        </button>
      </div>
    </div>
  );
}

/*function KeyValueList({ order }: { order: number }) {
  const [fresh, setFresh] = useState(true);
  const [ke, setKe] = useState('');
  const [val, setVal] = useAtom(valueAtom);
  const [isKeyValueAllowed, setKeyValueAllowed] = useState(true);
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(httpRequestConfigAtom);
  const [configParams, setConfigParams] = useAtom(configParamsAtom);

  useEffect(() => {
    // updateKey(order, ke);
    // updateValue(order, val);
    console.log(configParams, ke, val);
  }, [ke, val]);

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //updateKey(order, e.target.value);
            setKe(e.target.value)
          }}
        />
      </div>
      <div className="keyValueListInput">
        <input
          className="keyValueListInput value"
          id="value"
          placeholder="Value"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            // updateValue(order, e.target.value);
            setVal(e.target.value);
          }}
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
*/
export default KeyValueList;
