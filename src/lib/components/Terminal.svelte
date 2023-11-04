<script lang="ts">
    import { Card, Input } from 'flowbite-svelte';
    import { getPrintValue } from '$lib/scripts/print';
	import { calculateExpression, isCalculation } from '$lib/scripts/calculator';

    let textInput = "> Willkommen (type help for more information)";
    let inputValue: string = "";
    let htmlContainer: any;

    function myFunction() {
        if (isCalculation(inputValue)) {
            addText(calculateExpression(inputValue), true)
            return
        }

        if (inputValue.startsWith('print')) {
            addText(getPrintValue(inputValue) || 'error', true)
            return;
        }
        if (inputValue.match('help')) {
            addText('help -> get a list of all commands\nclear -> clear the console\nquit -> return to the home page', false)
            return;
        }

        switch (inputValue) {
            case 'clear':
                inputValue = "";
                htmlContainer.innerHTML = textInput = "> Willkommen (type help for more information)";
                break;
            case 'quit':
                window.location.reload();
                break
            default:
                addText('unknown command: ' + inputValue + '\ntype \'help\' for more information!', false)
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

</script>

<Card class="bg-black border-transparent" size="lg" padding="xl">
    <div class="text-area w-[40rem] h-[40rem]">
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
                    myFunction();
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
