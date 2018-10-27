export const memoizeOneNumericArg = ( fn, cache = Object.create( null ) ) => arg => cache[ arg ] || ( cache[ arg ] = fn( arg ) );

export const clamp = ( num, min, max ) => num > max ? max : num < min ? min : num;