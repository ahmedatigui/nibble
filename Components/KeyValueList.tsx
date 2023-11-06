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
  tab,
}: {
  atomName: string;
  order: number;
  tab: string;
}) {
  const [fresh, setFresh] = useState(true);

  // const keyValueListAtom =
  //   atomName === "params" ? configParamsAtom : configHeadersAtom;

  // const [list, setList] = useAtom(keyValueListAtom);
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );

  const updateKey = (index: number, key: string) => {
    // setList(
    //   list.map((item: keyValueAtomType, i: number) =>
    //     i === index ? { ...item, key } : item,
    //   ),
    // );
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          // draftState[tab].request.params = list.map(
          //   (item: keyValueAtomType, i: number) =>
          //     i === index ? { ...item, key } : item,
          // );
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
    // setList(
    //   list.map((item: keyValueAtomType, i: number) =>
    //     i === index ? { ...item, value } : item,
    //   ),
    // );
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

  const updateChecked = (index: number, checked: string | boolean) => {
    // setList(
    //   list.map((item: keyValueAtomType, i: number) =>
    //     i === index ? { ...item, checked } : item,
    //   ),
    // );
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
    // setList([...list, { id: uuidV4(), key: "", value: "", checked: true }]);
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
    // console.log("Will remove: ", index);
    // const ele = list.filter((_, i) => i !== index);
    // console.log("New list: ", ele);
    // setList(ele);
    if (atomName === "params") {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.params[index]) {
            draftState[tab].request.params.splice(index, 1);
          }
        }),
      );
    } else {
      setAPIRequestDataMap((prevState) =>
        produce(prevState, (draftState: Draft<APIRequestDataMapType>) => {
          if (draftState[tab].request.headers[index]) {
            draftState[tab].request.headers.splice(index, 1);
          }
        }),
      );
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
