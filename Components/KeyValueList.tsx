"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { produce, Draft } from "immer";

// Utils
import {
  configHeadersAtom,
  configParamsAtom,
  APIRequestDataMapAtom,
} from "@/utils/atoms";
import { keyValueAtomType, APIRequestDataMapType } from "@/utils/types";

// Components
import { TextField, Button, Grid, Box, Checkbox } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";

type SetListType = (newList: keyValueAtomType[]) => void;

function KeyValueList({
  atomName,
  order,
  tab = "tab-simple-tree-id-initial",
  keyValue,
}: {
  atomName: string;
  order: number;
  tab?: string;
  keyValue: keyValueAtomType;
}) {
  const [fresh, setFresh] = useState(
    keyValue.key || keyValue.value ? false : true,
  );

  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );

  const defaultKey = keyValue.key;
  const defaultValue = keyValue.value;
  const defaultChecked =
    keyValue.key || keyValue.value ? keyValue.checked : !!fresh;

  const updateKey = (index: number, key: string) => {
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          draftState[tab].request.params[index].key = key;
        }),
      );
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.headers[index]) {
            draftState[tab].request.headers[index].key = key;
          }
        }),
      );
    }
  };

  const updateValue = (index: number, value: string) => {
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.params[index]) {
            draftState[tab].request.params[index].value = value;
          }
        }),
      );
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.headers[index]) {
            draftState[tab].request.headers[index].value = value;
          }
        }),
      );
    }
  };

  const updateChecked = (
    index: number,
    checked: keyValueAtomType["checked"],
  ) => {
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.params[index]) {
            draftState[tab].request.params[index].checked = checked;
          }
        }),
      );
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.headers[index]) {
            draftState[tab].request.headers[index].checked = checked;
          }
        }),
      );
    }
  };

  const addItem = () => {
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          draftState[tab].request.params.push({
            id: uuidV4(),
            key: "",
            value: "",
            checked: false,
          });
        }),
      );
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          draftState[tab].request.headers.push({
            id: uuidV4(),
            key: "",
            value: "",
            checked: false,
          });
        }),
      );
    }
  };

  const removeItem = (index: number) => {
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.params[index]) {
            draftState[tab].request.params.splice(index, 1);
          }
        }),
      );
      console.log("PARAMS: ", APIRequestDataMap[tab].request.params.length);
      if (APIRequestDataMap[tab].request.params.length === 1) addItem();
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.headers[index]) {
            draftState[tab].request.headers.splice(index, 1);
          }
        }),
      );
      console.log("HEADERS: ", APIRequestDataMap[tab].request.headers.length);
      if (APIRequestDataMap[tab].request.headers.length === 1) addItem();
    }
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
          defaultValue={defaultKey || undefined}
          placeholder={defaultKey ? "" : "Key"}
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
          defaultValue={defaultValue || undefined}
          placeholder={defaultValue ? "" : "Value"}
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
          defaultChecked={defaultChecked}
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
