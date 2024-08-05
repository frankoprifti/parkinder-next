import { startCase } from './startCase';

describe('startCase', () => {
    it('should capitalize the first letter of a string', () => {
        expect(startCase('hello')).toBe('Hello');
    });
});