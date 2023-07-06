export function afterOneHour(codeToExecute) {
    return setTimeout(codeToExecute, 3600000); // 1 hour in milliseconds
}
