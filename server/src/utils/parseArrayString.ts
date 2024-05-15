
type parseArrayType = (names: string | string[]) => string[];

export const parseArrayString: parseArrayType = (names) => {
    if (typeof names === 'string' && names.includes(',')) {
        return names.split(',').map(name => name.trim());
    } else if (typeof names === 'string') {
        return [names];
    } else if (Array.isArray(names)) {
        return names;
    }
    return [];
};