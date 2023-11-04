export function getPrintValue(input: string){
    const matches = input.match(/print\("([^"]+)"\)/g);

    // Extrahiere den Inhalt aus den gefundenen Übereinstimmungen
    if (matches) {
        const extractedContents = matches.map(match => {
            const contentMatch = /print\("([^"]+)"\)/.exec(match);
            return contentMatch ? contentMatch[1] : null;
        });

        return extractedContents as unknown as string;
    }

    return undefined;
}
