"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";

// Atoms
import { configHeadersAtom, configParamsAtom } from "@/utils/atoms";

// Components
import { TextField, Button, Grid, Box, Checkbox } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { keyValueAtomType } from "@/utils/types";

type SetListType = (newList: keyValueAtomType[]) => void;

function KeyValueList({
  atomName,
  order,
}: {
  atomName: string;
  order: number;
}) {
  const [fresh, setFresh] = useState(true);

  const keyValueListAtom =
    atomName === "params" ? configParamsAtom : configHeadersAtom;
  const [list, setList] = useAtom(keyValueListAtom);

  const updateKey = (index: number, key: string) => {
    setList(
      list.map((item: keyValueAtomType, i: number) =>
        i === index ? { ...item, key } : item,
      ),
    );
  };

  const updateValue = (index: number, value: string) => {
    setList(
      list.map((item: keyValueAtomType, i: number) =>
        i === index ? { ...item, value } : item,
      ),
    );
  };

  const updateChecked = (index: number, checked: string | boolean) => {
    setList(
      list.map((item: keyValueAtomType, i: number) =>
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
      </Box>
      <Box>
        <Button size="2" onClick={() => removeItem(order)}>
          <TrashIcon />
        </Button>
      </Box>
    </Grid>
  );
}

export default KeyValueList;
