export function returnEcho(input: string) {
    // Überprüfe, ob 'echo ' am Anfang der Zeichenfolge vorhanden ist
    if (/^echo\s+/.test(input)) {
        // Verwende replace, um 'echo ' zu entfernen
        const result = input.replace(/^echo\s+/, '');
        return '"' + result + '"';
    } else {
        return 'Fehler: Kein "echo" gefunden.';
    }
}
