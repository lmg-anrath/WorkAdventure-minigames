<script lang="ts">
  import { AppShell, Button, Center } from '@svelteuidev/core';
  import Terminal from './lib/components/Terminal.svelte';

  export let isHome: boolean = true;
  export let terminalActive: boolean = false;

  function startTerminal() {
      isHome = false;
      terminalActive = true
  }
</script>

<div class="flex h-screen">
  <div class="m-auto">
    {#if isHome}
    <div class="align-middle">
      <Center>
              <Button on:click={startTerminal} color="violet" radius="lg" size="lg">
                  Terminal Starten
              </Button>
          </Center>
      </div>
    {/if}
      
    {#if terminalActive}
      <Terminal />
    {/if}
  </div>
</div>