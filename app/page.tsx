"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { produce } from "immer";

// Components
import { Flex, Grid, Button } from "@radix-ui/themes";
import { Theme } from "@radix-ui/themes";
import { Half2Icon } from "@radix-ui/react-icons";
import FileTabs from "@/Components/FileTabs";

// Utils
import { APIRequestDataMapAtom } from "../utils/atoms";

const tab = "tab-simple-tree-id-initial";

export default function Home() {
  const [APIRequestDataMap, setAPIRequestDataMap] = useAtom(
    APIRequestDataMapAtom,
  );
  const theme = APIRequestDataMap[tab].style.theme;

  const handleThemeChange = () => {
    setAPIRequestDataMap(
      produce((draft) => {
        draft[`${tab}`].style.theme = theme === "light" ? "dark" : "light";
      }),
    );
  };
  return (
    <Theme appearance={theme ?? "light"}>
      <Grid rows="10vh 87vh" gap="4" className="main-container">
        <Flex p="4" justify="between">
          <Link href="/" title="Nibble logo">
            Nibble
          </Link>
          <Button
            size="1"
            onClick={handleThemeChange}
            className="pointer"
            title="theme"
          >
            <Half2Icon /> {theme}
          </Button>
        </Flex>
        <Grid columns="1fr" gap="4">
          {/* <Box>
              <FileManager />
              </Box> */}
          <Grid
            p="4"
            rows="auto 1fr"
            gap="4"
            className="config-panels-container"
          >
            <FileTabs />
          </Grid>
        </Grid>
      </Grid>
    </Theme>
  );
}
