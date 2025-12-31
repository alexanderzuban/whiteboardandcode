export function partition(list: any[], n: number = 1) {
    const isPositiveInteger = Number.isSafeInteger(n) && n > 0;
    if (!isPositiveInteger) {
        throw new RangeError('n must be a positive integer');
    }

    const partitions = [];

    for (let i = 0; i < list.length; i += n) {
        const partition = list.slice(i, i + n);
        partitions.push(partition);
    }

    return partitions;
}
