import { StringUtil } from "../string-util";

describe('server/src/utils/__tests__/string-util.spec.ts', () => {
    describe('StringUtil', () => {
        let target = new StringUtil();

        describe('#truncateString', () => {
            it('should not truncate string when maxLength exceeds string length', () => {
                // Arrange

                // Act
                const actual = target.truncateString("a value", 3);

                // Assert
                expect(actual).toEqual('a v...')
            });

            it('should truncate string and add ellipses, when maxLength is smaller than string length', () => {
                // Arrange
                const aValue = "a value";

                // Act
                const actual = target.truncateString(aValue, 10);

                // Assert
                expect(actual).toEqual(aValue)
            });
        });

        describe('parseArrayString', () => {
            it('should return trimmed string in an array, when passed an a string that is an array', () => {
                // Arrange
                const names = 'name1, name2 ';
                const expected = ['name1', 'name2'];

                // Act
                const actual = target.parseArrayString(names);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return string in an array, when passed string', () => {
                // Arrange
                const names = 'name1';
                const expected = ['name1'];

                // Act
                const actual = target.parseArrayString(names);

                // Assert
                expect(actual).toEqual(expected);
            });

            it('should return array, when passed an array', () => {
                // Arrange
                const expected = ['name1', 'name2'];

                // Act
                const actual = target.parseArrayString(expected);

                // Assert
                expect(actual).toEqual(expected);
            });
        });
    });
});