import { get, writable, derived } from "svelte/store";

const json_url_prefix =
  "https://cors-anywhere-srmlyuexjbosgg0x.herokuapp.com/pastebin.com/raw/";
export const json_url_id = writable("e4FsW4Fc");
export const local_storage_key = writable("darkSoulsTrophyChecklist");
// export const json_url_id = writable("E0b1aSWy");
// export const local_storage_key = writable("deathStrandingTrophyChecklist");

function isEmpty(obj) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

export const isSortedByFinishedTask = writable(true);
export const selectedTab = writable(undefined);
export const record = writable({});

// Fetch data from the server
export const rawData = derived(
  json_url_id,
  ($json_url_id, set) => {
    const headers = new Headers();
    headers.append("Cache-Control", "no-cache");
    headers.append("X-Requested-With", "XMLHttpRequest");

    fetch(json_url_prefix + $json_url_id, headers)
      .then((response) => response.json())
      .then((data) => set(data || {}));

    return () => {
      set = () => {};
    };
  },
  {}
);

export const extendData = derived(
  [rawData, selectedTab, record],
  ([$rawData, $selectedTab, $record], set) => {
    if (isEmpty(rawData)) {
      set({
        tabTitles: [""],
        tabKey: [""],
        header: [],
        content: [],
        trophyTotal: "",
        trophyFinished: "",
      });
    }

    set({
      tabTitles: Object.keys($rawData).map((dataKey) => $rawData[dataKey].name),
      tabKey: Object.keys($rawData),
      header: $selectedTab === undefined ? [] : $rawData[$selectedTab].header,
      content: $selectedTab === undefined ? [] : $rawData[$selectedTab].content,
    });

    return () => {
      set = () => {};
    };
  }
);
