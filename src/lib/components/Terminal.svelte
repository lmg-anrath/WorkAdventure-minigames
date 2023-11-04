<script lang="ts">
    import { Card, Input } from 'flowbite-svelte';
    import { returnEcho } from '$lib/scripts/echo';
	import { calculateExpression, isCalculation } from '$lib/scripts/calculator';
    import '@fortawesome/fontawesome-free/css/all.min.css'

    let textInput = "> Willkommen (gebe 'help' für Hilfe ein.)";
    let inputValue: string = "";
    let htmlContainer: any;

    function processInput() {
        if (isCalculation(inputValue)) {
            addText(calculateExpression(inputValue), true)
            return
        }

        if (inputValue.startsWith('echo')) {
            addText(returnEcho(inputValue) || 'Ein Fehler ist aufgetreten!' as string, true)
            return;
        }
        if (inputValue.match('help')) {
            addText('help -> Liste aller Befehle\nclear -> Löscht alle Nachrichten aus der Konsole\nquit -> Verlässt die Konsole', false)
            return;
        }

        switch (inputValue) {
            case 'clear':
                inputValue = "";
                htmlContainer.innerHTML = textInput = "> Willkommen (gebe 'help' für Hilfe ein.)";
                break;
            case 'quit':
                window.location.reload();
                break
            default:
                addText('Unbekannter Befehl: ' + inputValue + '\gebe \'help\' für Hilfe ein.', false)
        }
    }

    function addText(value: string, ignoreReplace: boolean) {
        if (!ignoreReplace) {
            value = value.replace(/\n/g, '<br/> > ');
        }

        let newInnerHTML = textInput += '<br/> > ' + value;
        htmlContainer.innerHTML = newInnerHTML;
        inputValue = "";
    }

    let innerWidth = 0
    let innerHeight = 0

    $: bigScreen = innerWidth >= 1280

    let showCard = false;

    function toggleCard() {
        showCard = !showCard;
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if bigScreen || showCard}
    <Card class="absolute top-0 left-0 m-5 max-w-xs" size="lg" padding="xl">
        {#if !bigScreen}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i class="absolute fa-solid fa-x mr-5 top-2 left-2 cursor-pointer" on:click={toggleCard}></i>
        {/if}
        <div class="flex items-center">
            <span>
                <i class="fa-solid fa-circle-info mr-5"></i>
            </span>
            <div class="text-xs font-bold">
                Ein Shell-Terminal ist eine textbasierte Schnittstelle zur Steuerung und Kommunikation mit einem Computer-Betriebssystem über Befehlseingaben.
            </div>
        </div>
    </Card>
{/if}

{#if !bigScreen && !showCard}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span on:click={toggleCard} class="cursor-pointer">
        <i class="absolute fa-solid fa-circle-info animate-bounce top-4 ml-4 mr-4" style="color: #ffffff"></i>
    </span>
{/if}

<Card class="bg-black border-transparent m-8" size="lg" padding="xl">
    <div class="text-area min-[800px]:w-[40rem] min-[800px]:h-[40rem]">
        <div bind:this={htmlContainer} class="console-content">
            {textInput}
        </div>
        <Input
            class="bg-transparent border-transparent active:border-transparent text-inherit"
            id="large-input"
            size="sm"
            bind:value={inputValue}
            on:keydown={(e) => {
                if (e.key === 'Enter') {
                    processInput();
                }
            }}
        />
    </div>
</Card>


<style>
    .text-area {
        font-family: monospace;
        white-space: pre-line;
    }
</style>
