import { get, writable, derived } from "svelte/store";

const json_url_prefix =
  "https://cors-anywhere-srmlyuexjbosgg0x.herokuapp.com/pastebin.com/raw/";
export const json_url_id = writable("e4FsW4Fc");
export const local_storage_key = writable("darkSoulsTrophyChecklist");
// export const json_url_id = writable("E0b1aSWy");
// export const local_storage_key = writable("deathStrandingTrophyChecklist");

// How do I test for an empty JavaScript object? - Stack Overflow
// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
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
// Hello world • REPL • Svelte
// https://svelte.dev/repl/a8d0c3c32afc4dc8b839ac85957da709?version=3.3.0
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
      // Override the `set` function to eliminate race conditions
      // This does *not* abort running fetch() requests, it only prevents
      // them from overriding the store.
      set = () => {};
    };
  },
  {} // <- default value before first API call
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
      trophyTotal:
        $selectedTab === undefined ? "" : $record[$selectedTab].length,
      trophyFinished:
        $selectedTab === undefined
          ? ""
          : $record[$selectedTab].filter((recordData) => recordData === true)
              .length,
    });

    return () => {
      set = () => {};
    };
  }
);
