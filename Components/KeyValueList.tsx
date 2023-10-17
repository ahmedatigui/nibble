"use client";

import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { v4 as uuidV4 } from "uuid";

// Atoms
import { configParamsAtom } from "@/utils/atoms";

// Components
// import * as Checkbox from "@radix-ui/react-checkbox";
import { TextField, Button, Grid, Box, Checkbox } from "@radix-ui/themes";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import { paramsAtomType } from "@/utils/types";

function KeyValueList({ order }: { order: number }) {
  const [fresh, setFresh] = useState(true);

  const [list, setList] = useAtom(configParamsAtom);

  const updateKey = (index: number, key: string) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, key } : item,
      ),
    );
  };

  const updateValue = (index: number, value: string) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, value } : item,
      ),
    );
  };

  const updateChecked = (index: number, checked: string | boolean) => {
    setList(
      list.map((item: paramsAtomType, i: number) =>
        i === index ? { ...item, checked } : item,
      ),
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
    <Grid
      columns="1fr 1fr auto auto"
      align="center"
      gap="2"
      p="4"
      className="keyValueListRow"
    >
      <Box>
        {/* <input
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
        /> */}
        <TextField.Input
          width="100%"
          size="3"
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
      </Box>
      <Box>
        {/* <input
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
        /> */}
        <TextField.Input
          width="100%"
          size="3"
          id="value"
          className="keyValueListInput value"
          placeholder="Value"
          onChange={(e) => {
            updateValue(order, e.target.value);
            if (fresh) {
              addItem();
              setFresh(false);
            }
          }}
        />
      </Box>
      <Box>
        <Checkbox
          size="3"
          disabled={fresh}
          defaultChecked={!!fresh}
          onCheckedChange={(state) => updateChecked(order, state)}
        />
        {/* <Checkbox.Root
          className="CheckboxRoot"
          defaultChecked={true}
          onCheckedChange={(state) => updateChecked(order, state)}
          id="c1"
        >
          <Checkbox.Indicator className="CheckboxIndicator">
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root> */}
      </Box>
      <Box>
        {/* <button>
          <span>
            <TrashIcon />
          </span>
        </button> */}
        <Button size="2" onClick={() => removeItem(order)}>
          <TrashIcon />
        </Button>
      </Box>
    </Grid>
  );
}

export default KeyValueList;
