const data = [
  {
    id: "1",
    name: "Unread",
    children: [
      { id: "a1", name: "General" },
      { id: "a2", name: "Random" },
      { id: "a3", name: "Open Source Projects" },
    ],
  },
  {
    id: "2",
    name: "Threads",
    children: [
      { id: "b1", name: "General" },
      { id: "b2", name: "Random" },
      { id: "b3", name: "Open Source Projects" },
      { id: "b4", name: "Random" },
      { id: "b5", name: "Random" },
    ],
  },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

function readData(params: any) {
  for (let i = 0; i < params.length; ++i) {
    console.info(params[i].id, params[i].name);
    if (params[i].children) {
      readData(params[i].children);
    }
    if (i + 1 === params.length) return;
  }
}

//readData(data);

export const getContentType = (lang: string) => {
  switch (lang) {
    case "json":
      return "application/json";
    case "yaml":
      return "application/x-yaml";
    case "html":
      return "text/html";
    case "xml":
      return "application/xml";
    case "text":
      return "text/plain";
    default:
      return "application/json";
  }
};

export const getLanguageFromMimeType = (mimeType: string) => {
  switch (mimeType) {
    case "application/json":
      return "json";
    case "application/x-yaml":
      return "yaml";
    case "text/html":
      return "html";
    case "application/xml":
      return "xml";
    case "text/plain":
      return "text";
    default:
      return "json";
  }
};
