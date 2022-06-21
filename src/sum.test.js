import { sum, multiple} from "./sum";

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3);
});

test('multiple 3 x 2 to equal 6', () => {
  // expect(multiple(3,2)).toBe(6);

    const value = multiple(3,2);
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(7);
    expect(value).toBeLessThanOrEqual(7.5);
  
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(6);
    expect(value).toEqual(6);
});