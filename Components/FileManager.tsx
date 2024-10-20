/*import React, { useState, useEffect, useRef } from "react";
import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { useAtom } from "jotai";
import { v4 as uuidV4 } from "uuid";
import { produce } from "immer";

// Components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  TriangleRightIcon,
  TriangleDownIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";
import { Button, TextFieldInput, Tooltip } from "@radix-ui/themes";

// Utils
import { data } from "../utils/data";
import { FileManagerDataType } from "../utils/types";
import {
  APIRequestDataMapAtom,
  currentActiveLeafAtom,
  currentLeafsAtom,
  FileManagerDataAtom,
} from "../utils/atoms";

export default function FileManager() {
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );
  const [currentLeafs, setCurrentLeafs] = useAtom(currentLeafsAtom);
  const [FileManagerData, setFileManagerData] = useAtom(FileManagerDataAtom);
  const [term, setTerm] = useState<string | undefined>();
  const treeRef = useRef<TreeApi<FileManagerDataType> | null>();

  useEffect(
    () => console.log("USEFFECT: ", currentActiveLeaf),
    [currentActiveLeaf],
  );

  useEffect(
    () => console.log("HH: ", data),
    [FileManagerData, currentLeafs, data],
  );

  const handleActivate = (node: NodeApi<FileManagerDataType>) => {
    console.log("onActivate: ", node.data.name);
    // const doesNameExist = data.some((item) => item.name === node.data.name);

    // if (!doesNameExist) {
    //   setCurrentActiveLeaf(`tab-${node.data.id}`);
    //   console.log("ACTIVE: ", currentActiveLeaf);
    // }
  };

  const handleFocus = (node: NodeApi<FileManagerDataType>) => {
    const isNameValueEmpty = Boolean(node.data.name.length === 0);
    const doesNameExist = data.some((item) => item.name === node.data.name);

    console.log("isNameValueEmpty: ", !isNameValueEmpty);
    console.log("doesNameExist: ", !doesNameExist);

    console.log("ONFOCUSED: ", node.data.name);
    if (
      !node.isInternal &&
      isNameValueEmpty === false &&
      doesNameExist === true
    ) {
      setCurrentLeafs((current) => [
        ...current,
        { id: node.data.id, name: `${node.data.name}-copy-${node.data.id}` },
      ]);
    } else if (!node.isInternal && isNameValueEmpty === false) {
      setCurrentLeafs((current) => [
        ...current,
        { id: node.data.id, name: node.data.name },
      ]);
    }
    console.log("FOCUSED: ", currentLeafs);
  };

  return (
    <div className="App">
      <Nav tree={treeRef.current} term={term} setTerm={setTerm} />
      <Tree
        ref={treeRef}
        initialData={data}
        width={260}
        height={200}
        indent={24}
        rowHeight={32}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
        onActivate={handleActivate}
      >
        {Node}
      </Tree>
    </div>
  );
}

function Node({
  node,
  tree,
  style,
  dragHandle,
}: NodeRendererProps<FileManagerDataType>) {
  // This node instance can do many things. See the API reference.
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );
  const [currentLeafs, setCurrentLeafs] = useAtom(currentLeafsAtom);
  // const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(APIRequestDataMapAtom);

  useEffect(() => console.log("HH: ", tree, node));

  // useEffect(() => {
  //   for(let key in APIRequestDataMap){
  //     // console.info(key, APIRequestDataMap[key]);
  //     data.push({id: APIRequestDataMap[key].tab.id, name: APIRequestDataMap[key].tab.name})
  //     node.submit(APIRequestDataMap[key].tab.name);
  //   }
  // }, [])

  const handleClicked = () => {
    if (node.isInternal) node.toggle();
    else if (node.isSelected && node.isLeaf) {
      setCurrentActiveLeaf(`${node.data.id}`);
      // node.activate();
      console.info("NODE ID: ", node.data.id);
    }
  };

  return (
    <>
      <div onClick={handleClicked} ref={dragHandle}>
        {node.isLeaf ? (
          <span className="node-text">
            <PrefixIcon node={node} />
            {node.isEditing ? (
              <Input node={node} tree={tree} />
            ) : (
              <>
                <span>{node.data.name}</span>
                <DropdownMenuFile node={node} tree={tree} />
              </>
            )}
          </span>
        ) : (
          <span className="node-text">
            <PrefixIcon node={node} />
            {node.isEditing ? (
              <Input node={node} tree={tree} />
            ) : (
              <>
                <span>{node.data.name}</span>
                <DropdownMenuFolder node={node} tree={tree} />
              </>
            )}
          </span>
        )}
      </div>
    </>
  );
}*/
/*
function Input({
  node,
  tree,
}: {
  node: NodeApi<FileManagerDataType>;
  tree: TreeApi<FileManagerDataType> | null | undefined;
}) {
  const [currentLeafs, setCurrentLeafs] = useAtom(currentLeafsAtom);
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const [currentActiveLeaf, setCurrentActiveLeaf] = useAtom(
    currentActiveLeafAtom,
  );
  const [FileManagerData, setFileManagerData] = useAtom(FileManagerDataAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNameValueEmpty = Boolean(e.currentTarget.value.length === 0);
    const doesNameExist = data.some(
      (item) => item.name === e.currentTarget.value,
    );
    console.log("isNameValueEmpty: ", isNameValueEmpty);
    console.log("doesNameExist: ", doesNameExist);
    if (e.key === "Escape") node.reset();
    if (e.key === "Enter") {
      const existingLeafIndex = currentLeafs.findIndex(
        (leaf) => leaf.id === node.data.id,
      );
      if (!node.isInternal && isNameValueEmpty === false) {
        if (existingLeafIndex !== -1) {
          setCurrentLeafs((current) => [
            ...current.slice(0, existingLeafIndex),
            { id: node.data.id, name: e.currentTarget.value },
            ...current.slice(existingLeafIndex + 1),
          ]);
          setAPIRequestDataMap((currentAPIRequestDataMap) =>
            produce(currentAPIRequestDataMap, (draftAPIRequestDataMap) => {
              draftAPIRequestDataMap[node.data.id].tab.name = e.currentTarget.value;
            }),
          );
        } else {
          setCurrentLeafs((current) => [
            ...current,
            { id: node.data.id, name: e.currentTarget.value },
          ]);
          setAPIRequestDataMap((prevState) => ({
            ...prevState,
            [`${node.data.id}`]: {
              method: "GET",
              url: `https://jsonplaceholder.typicode.com/users/${Math.ceil(
                Math.random() * 10,
              )}`,
              request: {
                params: [{ id: uuidV4(), key: "", value: "", checked: true }],
                headers: [{ id: uuidV4(), key: "", value: "", checked: true }],
                auth: null,
                body: null,
              },
              response: {
                httpResponse: { status: "idle", data: null, error: null },
                typed: null,
                raw: null,
                headers: null,
                stats: null,
              },
              tab: {
                name: `${e.currentTarget.value}`,
                id: `${node.data.id}`,
              },
            },
          }));
        }
        node.submit(e.currentTarget.value);
        setCurrentActiveLeaf(`${node.data.id}`);
      } else if (node.isInternal && isNameValueEmpty === false) {
        node.submit(e.currentTarget.value);
      } else tree?.delete(node.id);
      console.info(node.data.id, node.data.name, node.isInternal);
    }
  };

  return (
    <input
      autoFocus
      type="text"
      defaultValue={node.data.name}
      onFocus={(e) => e.currentTarget.select()}
      onBlur={() => node.reset()}
      onKeyDown={handleKeyDown}
    />
  );
}*/
/*
function PrefixIcon({ node }: { node: NodeApi<FileManagerDataType> }) {
  if (node.isLeaf) return "📄 ";
  return (
    <>
      {node.isOpen ? <TriangleDownIcon /> : <TriangleRightIcon />}
      {" 📁 "}
    </>
  );
}

const Nav = ({
  tree,
  term,
  setTerm,
}: {
  tree: TreeApi<FileManagerDataType> | null | undefined;
  term: string | undefined;
  setTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <>
      <Tooltip content="Add New Request">
        <Button className="button" onClick={() => tree?.createLeaf()}>
          New Request
        </Button>
      </Tooltip>
      <Tooltip content="Add New Folder">
        <Button className="button" onClick={() => tree?.createInternal()}>
          New Folder
        </Button>
      </Tooltip>
      <Tooltip content="Search for...">
        <TextFieldInput
          type="search"
          className="input"
          placeholder="search for node"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </Tooltip>
    </>
  );
};

const DropdownMenuFile = ({
  node,
  tree,
}: {
  node: NodeApi<FileManagerDataType>;
  tree: TreeApi<FileManagerDataType>;
}) => {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  function handleDeleteRequest(id: string) {
    setAPIRequestDataMap(
      produce((draft) => {
        delete draft[id];
      }),
    );
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => node.edit()}
          >
            Rename
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => {
              tree.delete(node.id);
              handleDeleteRequest(node.id);
            }}
          >
            Delete Request
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const DropdownMenuFolder = ({
  node,
  tree,
}: {
  node: NodeApi<FileManagerDataType>;
  tree: TreeApi<FileManagerDataType>;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <DotsVerticalIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => tree.createLeaf()}
          >
            New File
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => tree.delete(node.id)}
          >
            Delete Folder
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => node.edit()}
          >
            Rename
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};*/
