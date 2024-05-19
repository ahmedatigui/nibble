import { useState, useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { produce } from "immer";

import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { html } from "@codemirror/lang-html";
// import { yaml } from "@nicktomlin/codemirror-lang-yaml-lite";
import { solarizedLight, solarizedDark } from "@uiw/codemirror-theme-solarized";

// Utils
import {
  httpRequestConfigAtom,
  configHeadersAtom,
  APIRequestDataMapAtom,
} from "@/utils/atoms";
import { keyValueAtomType } from "@/utils/types";
import { getLanguageFromMimeType } from "@/utils/helpers";

export function Editor({ tab }: { tab: string }) {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const [value, setValue] = useState(
    JSON.stringify(
      APIRequestDataMap[tab].response.httpResponse.data,
      null,
      "\n",
    ),
  );
  const [lang, setLang] = useState<string>(
    getLanguageFromMimeType(APIRequestDataMap[tab].request.headers[0].value) ??
      "json",
  );

  const isLight = APIRequestDataMap[tab].style.theme === "light";

  useEffect((): void => {
    const h = APIRequestDataMap[tab].response?.headers;
    const contentType =
      h && APIRequestDataMap[tab].response?.headers["Content-Type"];
    const l = contentType ?? "json";
    setLang(getLanguageFromMimeType(l));
  }, [APIRequestDataMap[tab].response.headers]);

  useEffect((): void => {
    const data = APIRequestDataMap[tab].response.httpResponse.data ?? APIRequestDataMap[tab].response.statusText;
    setValue(JSON.stringify(data, null, '\n'));
  }, [APIRequestDataMap[tab].response.httpResponse.data]);

  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const getMode = (lang: string) => {
    switch (lang) {
      case "json":
        return json();
      case "yaml":
        return [];
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

  return (
    <>
      
        <div className="playground-panel">
          <CodeMirror
            className="cm-outer-container"
            value={value ?? "Nothing yet."}
            readOnly={true}
            //height="100%"
            theme={isLight ? solarizedLight : solarizedDark}
            extensions={[getMode(lang)]}
            onChange={onChange}
          />
        </div>
      
       
       
      }
    </>
  );
}
