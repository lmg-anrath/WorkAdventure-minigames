// Das ist nur ein billiger Abklatsch von nano, sprich kein bearbeiten oder sonstiges
// aber so kann man den Leuten klar machen, dass man mit nano Dateien lesen kann...
export function nano(fileContent: string) {
    return "GNU nano 4.3              file              .txt\n\n\n" + fileContent
}