<script>
  import { onDestroy } from "svelte";

  import {
    rawData,
    extendData,
    selectedTab,
    record,
    isSortedByFinishedTask,
  } from "./fetchData.js";

  import TableItem from "./TableItem.svelte";

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function compareObjKeys(a, b) {
    return (
      JSON.stringify(Object.keys(a).sort()) ===
      JSON.stringify(Object.keys(b).sort())
    );
  }

  function compareObjArr(a, b) {
    if (compareObjKeys(a, b)) {
      let r = true;
      Object.keys(a).forEach((key) => {
        if (a[key].length !== b[key].length) r = false;
      });
      return r;
    }
    return false;
  }

  const unsubscribe = rawData.subscribe(() => {
    let rfu = {};
    let params = new URLSearchParams(window.location.search);
    if (params.has("q") && isJsonString(params.get("q"))) {
      rfu = JSON.parse(params.get("q"));
    }

    let r = {};
    Object.keys($rawData).map((dataKey) => {
      r[dataKey] = Array.from(
        { length: $rawData[dataKey].content.length },
        (e) => 0
      );
    });

    if (compareObjArr(rfu, r)) {
      record.set(rfu);
      window.history.pushState("", "", "/");
    } else {
      record.set(r);
    }
  });
  onDestroy(unsubscribe);
</script>

{#if $extendData.header.length !== 0 && $extendData.content.length !== 0}
  <!-- {console.log($extendData, $record, $selectedTab, JSON.stringify($record))} -->
  <table>
    <thead>
      <tr>
        <th>チェック</th>
        {#each $extendData.header as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if !$isSortedByFinishedTask}
        <!-- Don't sort tasks by finished -->
        {#each $extendData.content as content, index}
          <TableItem {content} {index} />
        {/each}
      {:else}
        <!-- Finished trophy first -->
        {#each $extendData.content as content, index}
          {#if !$record[$selectedTab][index]}
            <TableItem {content} {index} />
          {/if}
        {/each}
        {#each $extendData.content as content, index}
          {#if $record[$selectedTab][index]}
            <TableItem {content} {index} />
          {/if}
        {/each}
      {/if}
    </tbody>
  </table>
{/if}

<style>
  table {
    width: 100%;
    padding: 0.25em;
    border-collapse: separate;
  }
  th:first-child {
    width: 10%;
  }
  th:nth-child(2) {
    width: 40%;
  }

  th:nth-child(3) {
    width: 50%;
  }

  th {
    padding-left: 0.25em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    text-align: left;
    font-weight: 600;
  }
</style>
