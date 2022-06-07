<script>
  import { rawData } from "./fetchData.js";
  import Menu from "./Menu.svelte";
  import Tabs from "./Tabs.svelte";
  import Table from "./Table.svelte";

  // *TODO:
  // - [done.] sort by checked task
  // - [done.] display (done/total)
  // - save as a item (by game name load url and record data)
  // - click whole item also trigger check
  // - GUI editor (if possible?)
  // - check if record is existed from url
</script>

<main>
  <!-- タイトル -->
  <div>
    <h1 class="pb-1">ダークソウルトロコンチェックリスト</h1>

    <p>
      <a
        href="https://docs.google.com/spreadsheets/d/1pFnZ6mqe9HCMj7UNIKCPHKN1OyFWTkKBXxjuzeqc1To/edit#gid=1719875799"
        target="_blank"
      >
        ダークソウルトロコンリスト
      </a>
      を元に作成した Web 版のダクソトロコンチェックリストです。<br />
      アイコンは
      <a
        href="https://www.favicon.cc/?action=icon&file_id=877622"
        target="_blank"
      >
        Dark SOuls Favicon
      </a>
      のものを使わせていただきました。<br />
      各アイテムの詳しい入手方法などは
      <a href="https://seesaawiki.jp/project_dark/" target="_blank">
        DARK SOULS ダークソウル攻略Wiki
      </a>
      や
      <a href="https://darksouls.eksd.jp/chart.html" target="_blank">
        ダークソウル マップ付き攻略
      </a>
      の方をご覧になっていただければ幸いです。

      <!-- [デス・ストランディング：トロフィー概要。注意すべきトロフィーとプラチナ取得ガイド: こつこつトロフィーコンプ](http://kotsukotsutrophycomp.blog.jp/archives/2019-11-24-1076279619.html) -->
      <!-- [Death Stranding Interactive Map | Map Genie](https://mapgenie.io/death-stranding/maps/world) -->
    </p>
  </div>

  <!-- メニュー -->
  <div>
    <h2>メニュー</h2>
    <p>
      ダークソウル用のチェックリストとなっていますが、<br />
      <a href="https://pastebin.com/" rel="noreferrer noopener" target="_blank">
        pastebin
      </a>
      に
      <a
        href="https://pastebin.com/raw/e4FsW4Fc"
        rel="noreferrer noopener"
        target="_blank"
      >
        本ページの例と同じ構造の JSON データ
      </a>
      を記入しセーブして、<br />
      url の最後の 7 文字を下のロード用に入力すれば自分用のチェックリストにもなれます。
    </p>
    <p>
      別の例として、E0b1aSWy
      をロードしたら、デスストランディングのトロフィーリストになります。<br />
      チェックリストをカスタムしたいや進捗を記録したい方にどうぞ。
    </p>
    <Menu />
  </div>

  <!-- 内容 -->
  <div>
    <h2>内容</h2>

    {#if $rawData.length === 0}
      <p>読み込み中…</p>
    {:else}
      <Tabs />
      <Table />
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    padding: 2em 8em;
  }
  @media screen and (max-width: 1200px) {
    main {
      padding: 2em;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 1.6em;
  }
  h2 {
    padding: 2px 5px 2px 8px;
    margin: 10px 5px 10px 3px;
    border-left: 10px solid rgb(0, 100, 200);
    border-bottom: 2px solid rgb(0, 100, 200);

    font-weight: 600;
    font-size: 1.4em;
  }
  p {
    line-height: 1.5;
    margin-bottom: 1em;
  }

  // .inline-block {
  //   display: inline-block;
  // }
  // .flex {
  //   display: flex;
  // }
  // .aic {
  //   align-items: center;
  // }
  .pb-1 {
    padding-bottom: 1rem;
  }
</style>
