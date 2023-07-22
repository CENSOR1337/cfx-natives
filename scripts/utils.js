export function splitHash(hash) {
    const bigHash = BigInt(hash);
    const hashOne = (bigHash >> BigInt(32)) & BigInt(0xffffffff);
    const hashTwo = bigHash & BigInt(0xffffffff);
    return {
        one: `0x${hashOne.toString(16).padStart(8, "0")}`,
        two: `0x${hashTwo.toString(16).padStart(8, "0")}`,
    };
}

export function trimAndNormalize(str) {
    return str.trim().replace(/\/\*/g, " -- [[").replace(/\*\//g, "]] ");
}