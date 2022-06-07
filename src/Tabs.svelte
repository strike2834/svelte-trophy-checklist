<script>
  import { onDestroy } from "svelte";

  import { rawData, extendData, selectedTab } from "./fetchData.js";

  const unsubscribe = rawData.subscribe(() => {
    selectedTab.set(Object.keys($rawData)[0]);
  });
  onDestroy(unsubscribe);
</script>

{#if Object.keys($rawData).length !== 0}
  <div class="tabs">
    {#each $extendData.tabTitles as label, index}
      <input
        type="radio"
        name="tabs"
        class="tab-radio"
        id="tab{index}"
        value={$extendData.tabKey[index]}
        bind:group={$selectedTab}
      />
      <label
        for="tab{index}"
        class="tab-label"
        class:tab-label__checked={$selectedTab === $extendData.tabKey[index]}
      >
        {label}
      </label>
    {/each}
  </div>
{/if}

<style>
  .tabs {
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid black;
  }
  .tab-radio {
    display: none;
  }
  .tab-label {
    display: block;
    padding: 0.25em 0.375em;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;
    border: 1px solid black;
    border-bottom: none;

    position: relative;
  }
  .tab-label.tab-label__checked::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1px;
    border-bottom: 1px solid white;
  }
  .tab-label ~ .tab-label {
    margin-left: 0.25em;
  }
</style>
