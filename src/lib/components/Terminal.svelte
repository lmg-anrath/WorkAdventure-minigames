<script lang="ts">
    import { Card, Input } from 'flowbite-svelte';
    import { returnEcho } from '$lib/scripts/echo';
	import { calculateExpression, isCalculation } from '$lib/scripts/calculator';
    import { gameMessage, getCurrentLevel, isGameStarted, levelUp, quitGame, startGame } from '$lib/scripts/game';
    import { FileSystem, extractPathFromCd } from '$lib/scripts/directory';
    import { nano } from '$lib/scripts/nano';
    import '@fortawesome/fontawesome-free/css/all.min.css'

    let fileSystem = new FileSystem();
    let textInput = fileSystem.getCurrentPath() + "@user:~# Willkommen (gebe 'help' für Hilfe ein.)";
    let inputValue: string = "";
    let htmlContainer: any;

    function processInput() {
        inputValue = inputValue.toLocaleLowerCase();

        if (inputValue.startsWith('echo ')) {
            addText(returnEcho(inputValue) || 'Ein Fehler ist aufgetreten!' as string, true)

            // Falls das Spiel gestartet ist, und der Spieler bei Level 0 ist, wird die Fortsetzung ausgeführt.
            if (isGameStarted() && getCurrentLevel() == 0) {
                levelUp()
                addText(gameMessage(), false)
            }

            return;
        }

        if (inputValue.startsWith('nano ')) {
            addText(nano(fileSystem.getFileData(inputValue.split(" ")[1])), false)
            return
        }

        if (inputValue.startsWith('cd ')) {
            addText(fileSystem.navigateToPath(extractPathFromCd(inputValue)), false)
            inputValue = ""
            return
        }

        if (inputValue.match('help ')) {
            addText('\nHELP INFO:\n\nhelp -> Liste aller Befehle\nclear -> Löscht alle Nachrichten aus der Konsole\nquit -> Verlässt die Konsole', false)
            return;
        }

        if (isCalculation(inputValue)) {
            addText(calculateExpression(inputValue), true)
            return
        }

        switch (inputValue) {
            case 'clear':
                inputValue = "";
                htmlContainer.innerHTML = textInput = fileSystem.getCurrentPath() + "@user:~# Willkommen (gebe 'help' für Hilfe ein.)";

                // Wenn der Spieler Level 1 geschafft hat, muss dieser den Command clear finden und eingeben.
                if (isGameStarted() && getCurrentLevel() == 1) {
                    levelUp()
                    addText(gameMessage(), false)
                }

                break;

            case 'ls':
                addText(fileSystem.listPathContent(), false)
                break;

            case 'quit':
                window.location.reload();
                if (isGameStarted()) {
                    quitGame()
                }
                break;

            case 'start':
                if (isGameStarted()) {
                    addText("Du bist bereits dabei zu spielen!", false)
                    return
                }
                startGame();
                addText(gameMessage(), false);
                break;

            case 'exit':
                if (isGameStarted()) {
                    quitGame()
                    addText('Schade, dass du jetzt schon gehst... Bis zum nächsten Mal!', false)
                    return
                }

            default:
                addText('Unbekannter Befehl: \'' + inputValue + '\' gebe \'help\' für Hilfe ein.', false)
        }
    }

    function addText(value: string, ignoreReplace: boolean) {
        if (!ignoreReplace) {
            value = value.replace(/\n/g, '<br/> > ');
        }

        let newInnerHTML = textInput += '<br/> ' + fileSystem.getCurrentPath() + '@user:~# ' + value;
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
    <div class="text-area min-[800px]:w-[39rem] min-[800px]:h-[40rem]">
        <div bind:this={htmlContainer} class="console-content">
            {textInput}
        </div>
        <Input
            class="bg-transparent border-slate-600 active:border-transparent text-inherit mt-2"
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
