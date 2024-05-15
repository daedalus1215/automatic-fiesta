
export const truncateString = (str: string, maxLength: number): string => {
    if (str?.length > maxLength) {

        return (str.substr(0, maxLength)).trim() + "...";
    }
    return str;
}