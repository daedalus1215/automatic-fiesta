
export const minutesToMilliseconds = (mins: string): number => {
    const [minutes, seconds] = mins.split(":");

    const minutesToMilliseconds = parseInt(minutes) * 1000 * 60;
    const secondsToMilliseconds = seconds ? (parseInt(seconds) * 1000) : 0;

    return minutesToMilliseconds + secondsToMilliseconds;
};
