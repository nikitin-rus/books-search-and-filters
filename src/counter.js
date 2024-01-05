export class Counter {
    /** @param {string[]} values */
    static create(values) {
        const counter = {};
        values.forEach(value => {
            if (!counter[value]) counter[value] = 0;
            counter[value] += 1;
        });
        return counter;
    }
}