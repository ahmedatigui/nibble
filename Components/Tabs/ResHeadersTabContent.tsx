// Components
import { Box, Table } from "@radix-ui/themes";

// Utils
import { keyValueAtomType, APIRequestDataMapType } from "@/utils/types";
import { flattenObject } from "@/utils/helpers";

export default function ResHeadersTabContent({
  renderKeyValueLists,
  APIRequestDataMap,
  tab,
}: {
  renderKeyValueLists: Function;
  APIRequestDataMap: APIRequestDataMapType;
  tab: string;
}) {
  const response = APIRequestDataMap[`${tab}`].response;
  const headerKeys = response.headers && Object.keys(response.headers);

  return (
    <Box className="keyValueListContainer">
      {response.headers ? (
        <Table.Root>
          <Table.Body>
            {headerKeys.map((key: string, ind: number) => (
              <Table.Row key={ind}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{response.headers[key]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        "No response yet!"
      )}
    </Box>
  );
}
