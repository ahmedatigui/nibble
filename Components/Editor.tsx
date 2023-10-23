import { useState, useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
import { yaml } from "@nicktomlin/codemirror-lang-yaml-lite";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";

// Utils
import { httpRequestConfigAtom, configHeadersAtom } from "@/utils/atoms";

const jsonValue = ``;

export default function Editor({
  lang = "json",
  isReadOnly = false,
  isLight = true,
  setEditorValue,
  initValue = "// Hello, World!",
}: {
  lang: string;
  isLight: boolean;
  isReadOnly: boolean;
  setEditorValue?: Function | undefined;
  initValue?: string | null | undefined;
}) {
  const [httpRequestConfig, setHttpRequestConfig] = useAtom(
    httpRequestConfigAtom,
  );
  const [configHeaders, setConfigHeaders] = useAtom(configHeadersAtom);
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

    console.log({ configHeaders });
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

  const changeLangHeaders = (value: string) => {
    // configHeaders.forEach((item) => {
    //   if(item.key ==="Content-Type")item.value = value;
    // })
    const ele = configHeaders.filter((item, i) => item.key !== "Content-Type");
    setConfigHeaders([
      ...ele,
      {
        id: uuidV4(),
        key: "Content-Type",
        value: value,
        checked: true,
      },
    ]);
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
