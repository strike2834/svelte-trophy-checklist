<script>
  export let content;
  export let index;

  import { record, selectedTab } from "./fetchData.js";
</script>

<tr class="item" class:item__checked={$record[$selectedTab][index]}>
  <td>
    <label for="{$selectedTab}-{index}" />
    <input
      type="checkbox"
      id="{$selectedTab}-{index}"
      on:change={(e) => {
        $record[$selectedTab][index] = Number(e.target.checked);
      }}
      checked={$record[$selectedTab][index]}
    />
  </td>
  {#each content as c}
    <td>{c}</td>
  {/each}
</tr>

<style>
  td {
    position: relative;
    padding-left: 0.25em;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    border-top: 1px solid #333;
    box-sizing: border-box;
    vertical-align: baseline;
  }
  td:first-child {
    width: 10%;
  }
  td:nth-child(2) {
    width: 40%;
  }
  td:nth-child(3) {
    width: 50%;
  }
  tr:nth-child(2n) {
    background-color: #efefef;
  }

  td label {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .item {
    position: relative;
  }
  .item__checked {
    text-decoration: line-through 4px solid black;
  }
  /* .item__checked::after {
    content: "";
    position: absolute;
    width: 92.5%;
    border-bottom: 1px solid black;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
  } */
</style>
