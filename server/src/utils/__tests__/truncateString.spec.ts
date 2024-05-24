import { truncateString as target } from "../truncateString";

describe('server/src/utils/__tests__/truncateString.spec.ts', () => {
    describe('truncateString', () => {
        it('should not truncate string when maxLength exceeds string length', () => {
            // Arrange
            // Act
            const actual = target("a value", 3);

            // Assert
            expect(actual).toEqual('a v...')
        });

        it('should truncate string and add ellipses, when maxLength is smaller than string length', () => {
            // Arrange
            const aValue = "a value";

            // Act
            const actual = target(aValue, 10);

            // Assert
            expect(actual).toEqual(aValue)
        });
    });
});