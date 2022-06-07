<script>
  import { json_url_id, record, isSortedByFinishedTask } from "./fetchData.js";

  let localJsonUrlId = $json_url_id;
  let importTriggered = false;
  const handleImport = () => {
    if (!importTriggered) {
      json_url_id.set(localJsonUrlId);
    }
  };

  let textarea;
  let copyTriggered = false;
  const handleCopy = () => {
    textarea.select();
    document.execCommand("copy");
    document.getElementById("copy-clipboard-status").style = "display: inline";
    if (!copyTriggered) {
      copyTriggered = true;
      setTimeout(() => {
        document.getElementById("copy-clipboard-status").style =
          "display: none";
        copyTriggered = false;
      }, 2000);
    }
  };
</script>

<div>
  <span class="label">Load trophy data from pastebin id</span>
  <input type="text" bind:value={localJsonUrlId} />
  <button on:click={handleImport}>Load</button>
  <span id="import-from-url-status" style="display: none;">Status text</span>
</div>
<div>
  <span class="label">Share by URL</span>
  <input
    type="text"
    id="copy-clipboard"
    value={window.location.host +
      "/?q=" +
      encodeURIComponent(JSON.stringify($record))}
    bind:this={textarea}
    on:click={handleCopy}
    readonly
  />
  <span id="copy-clipboard-status" style="display: none;">copied!</span>
</div>
<div>
  <span class="label">Move finished task to bottom</span>
  <input type="checkbox" bind:checked={$isSortedByFinishedTask} />
</div>

<style>
  .label {
    border-radius: 0.25em;
    border: solid black 1px;
    padding: 0.125em 0.5em;
    font-weight: 600;
  }
  .label + * {
    margin-left: 0.5em;
  }
  div {
    padding-bottom: 1em;
  }

  input:read-only {
    background-color: #f0f0f0;
  }
</style>
