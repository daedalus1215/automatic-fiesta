import { Injectable } from "@nestjs/common";
type parseArrayType = (names: string | string[]) => string[];

@Injectable()
export class StringUtil {
    constructor() { }

    truncateString(str: string, maxLength: number): string {
        if (str?.length > maxLength) {

            return (str.substr(0, maxLength)).trim() + "...";
        }
        return str;
    }

    parseArrayString: parseArrayType = (names) => {
        if (typeof names === 'string' && names.includes(',')) {
            return names.split(',').map(name => name.trim());
        } else if (typeof names === 'string') {
            return [names];
        } else if (Array.isArray(names)) {
            return names;
        }
        return [];
    }
}