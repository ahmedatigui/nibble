import { useState, useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { produce } from "immer";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { yaml } from "@nicktomlin/codemirror-lang-yaml-lite";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";

// Utils
import {
  httpRequestConfigAtom,
  configHeadersAtom,
  APIRequestDataMapAtom,
} from "@/utils/atoms";
import { keyValueAtomType } from "@/utils/types";

const jsonValue = ``;

export default function Editor({
  lang = "json",
  isReadOnly = false,
  isLight = true,
  setEditorValue,
  initValue = "// Hello, World!",
  tab,
}: {
  lang: string;
  isLight: boolean;
  isReadOnly: boolean;
  setEditorValue?: Function | undefined;
  initValue?: string | null | undefined;
  tab: string;
}) {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom,
  );
  const [configHeaders, setConfigHeaders] = useAtom(configHeadersAtom);
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const [value, setValue] = useState(jsonValue);

  useEffect((): void => {
    switch (lang) {
      case "json":
        changeLangHeaders("application/json");
      case "yaml":
        changeLangHeaders("application/x-yaml");
      case "html":
        changeLangHeaders("text/html");
      case "xml":
        changeLangHeaders("application/xml");
      case "text":
        changeLangHeaders("text/plain");
      default:
        changeLangHeaders("application/json");
    }

    console.log({ APIRequestDataMap });
  }, [lang]);

  const onChange = useCallback((val: string) => {
    console.log("val:", val);
    setValue(val);
    setEditorValue && setEditorValue(val);
    setHttpRequestConfig((prev) => ({ ...prev, data: val }));
  }, []);

  const getMode = (lang: string) => {
    switch (lang) {
      case "json":
        return json();
      case "yaml":
        return yaml();
      case "html":
        return html();
      case "xml":
        return xml();
      case "text":
        return [];
      default:
        return json();
    }
  };

  const changeLangHeaders = (vl: string) => {
    // configHeaders.forEach((item) => {
    //   if(item.key ==="Content-Type")item.value = value;
    // })
    // const ele = configHeaders.filter((item, i) => item.key !== "Content-Type");
    // setConfigHeaders([
    //   ...ele,
    //   {
    //     id: uuidV4(),
    //     key: "Content-Type",
    //     value: value,
    //     checked: true,
    //   },
    // ]);
    setAPIRequestDataMap(
      produce(APIRequestDataMap, (draft) => {
        // const ele = draft[tab].request.headers.filter((item: keyValueAtomType) => item.key !== "Content-Type");
        // draft[tab].request.headers = [
        //   ...ele,
        //   {
        //     id: uuidV4(),
        //     key: "Content-Type",
        //     value: value,
        //     checked: true,
        //   },
        // ];
        draft[tab].request.headers.push({
          id: uuidV4(),
          key: "Content-Type",
          value: vl,
          checked: true,
        });
      }),
    );
  };

  return (
    <div className="editorContainer">
      <CodeMirror
        value={initValue ?? value}
        readOnly={isReadOnly}
        height="75vh"
        theme={isLight ? solarizedLight : solarizedDark}
        extensions={[getMode(lang)]}
        onChange={onChange}
      />
    </div>
  );
}
