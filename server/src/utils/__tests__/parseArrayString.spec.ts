import { minutesToMilliseconds } from "../minutesToMilliseconds";
import { parseArrayString } from "../parseArrayString";

describe('server/src/utils/__tests__/parseArrayString.spec.ts', () => {
    describe('parseArrayString', () => {
        it('should return trimmed string in an array, when passed an a string that is an array', () => {
            // Arrange
            const names = 'name1, name2 ';
            const expected = ['name1', 'name2'];

            // Act
            const actual = parseArrayString(names);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return string in an array, when passed string', () => {
            // Arrange
            const names = 'name1';
            const expected = ['name1'];

            // Act
            const actual = parseArrayString(names);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return array, when passed an array', () => {
            // Arrange
            const expected = ['name1', 'name2'];

            // Act
            const actual = parseArrayString(expected);

            // Assert
            expect(actual).toEqual(expected);
        });
    });
});