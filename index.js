'use strict';

/**
 *
 * @param props
 * @param ignoreCase
 * @return {Object}
 */
function createPropertiesMap(props, ignoreCase) {
    var result = {};
    if (!props) {
        props = [];
    }

    if (typeof props === 'string') {
        props = [1].map(function () {return props});
    }

    if (!Array.isArray(props)) {
        return result;
    }

    for (var i = 0; i < props.length; i++) {
        if (typeof props[i] !== 'string') continue;
        var seq = props[i].split('.');
        var root = result;
        var prop;
        for (var j = 0; j < seq.length; j++) {
            prop = ignoreCase ? seq[j].toLowerCase() : seq[j];

            if (j >= seq.length - 1) {
                root[prop] = undefined;
                break;
            }

            if ((prop in root) && (typeof root[prop] === 'undefined')) {
                break;
            }

            root[prop] = root[prop] || {};
            root = root[prop];
        }
    }

    return result;
}

/**
 *
 * @param src
 * @param dst
 * @param propMap
 * @param ignoreCase
 */
function copyProperties(src, dst, propMap, ignoreCase) {
    var newDst = Object.assign(dst, src);
    var props = Object.getOwnPropertyNames(newDst);
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        var propInPropMap = ignoreCase ? prop.toLowerCase() : prop;
        if ((propInPropMap in propMap) && propMap[propInPropMap] === undefined) {
            delete newDst[prop];
        } else if (typeof propMap[propInPropMap] === 'object' && typeof newDst[prop] === 'object') {
            newDst[prop] = copyProperties(src[prop], newDst[prop], propMap[propInPropMap], ignoreCase);
        }
    }

    return newDst;
}

/**
 *
 * @param src
 * @param props
 * @param ignoreCase
 */
function omit(src, props, ignoreCase) {
    if (ignoreCase === undefined) {
        ignoreCase = true;
    }

    var propMap = createPropertiesMap(props, ignoreCase);
    var dst = copyProperties(src, {}, propMap, ignoreCase);
    return dst;
}


module.exports = omit;