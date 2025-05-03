export function appendTimestamp(str) {
    return `${str}-${new Date().getTime()}`;
}