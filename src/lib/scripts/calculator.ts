export function isCalculation(input: string) {
    const regex = /(\d+(\.\d+)?)\s*([\+\-\*\/])?/g;
    const matches = [...input.matchAll(regex)];

    return matches.length > 0;
}


export function calculateExpression(input: string) {
    try {
       return eval(input);
    } catch(err: any) {
        return err.message;
    }
}






