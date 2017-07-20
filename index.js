'use strict';

function cloneDeep(from, to) {
    if (from === null || typeof from !== 'object') return from;

    if (from.constructor !== Object && from.constructor !== Array) return from;

    if (from.constructor === Date || from.constructor === RegExp || from.constructor === Function ||
        from.constructor === String || from.constructor === Number || from.constructor === Boolean ||
        from.constructor === Promise) {

        return new from.constructor(from);
    }

    to = to || new from.constructor();

    Object.getOwnPropertyNames(from).forEach(function (name) {
        to[name] = typeof to[name] === 'undefined' ? cloneDeep(from[name], null) : to[name];
    });

    return to;
}

/**
 *
 * @param props
 * @return {Object}
 */
function createPropertiesMap(props) {
    var result = {};
    props = props ? props : [];
    props = typeof props === 'string' ? [props] : props;

    if (!Array.isArray(props)) {
        return result;
    }

    for (var i = 0; i < props.length; i++) {
        if (typeof props[i] !== 'string') continue;
        var seq = props[i].split('.');
        var root = result;
        var prop, propLowerCase;
        for (var j = 0; j < seq.length; j++) {
            prop = seq[j];

            if (prop.slice(-2) === '/i') {
                prop = prop.toLowerCase();
                propLowerCase = prop.slice(-1) + '/';
                if (propLowerCase in root) {
                    var sameNameProps = root[propLowerCase];
                    for (var k = 0; k < sameNameProps.length; k++) {
                        delete root[sameNameProps[k]];
                    }

                    delete root[propLowerCase];
                }
            } else {
                propLowerCase = prop.toLowerCase();
                var propSameNameRoot = propLowerCase + '//';
                if (!root[propSameNameRoot]) {
                    root[propSameNameRoot] = [];
                }

                root[propSameNameRoot].push(prop);
            }

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
 */
function copyProperties(src, dst, propMap) {
    var newDst = Object.assign(dst, src);
    var props = Object.getOwnPropertyNames(newDst);
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        var prop_i = prop.toLowerCase() + '/i';

        if ((prop_i in propMap) && !propMap[prop_i]) {
            delete newDst[prop];
        } else if ((propMap[prop_i] || propMap[prop]) && typeof newDst[prop] === 'object') {
            newDst[prop] = copyProperties(src[prop], newDst[prop], propMap[prop_i] || propMap[prop]);
        }
    }

    return newDst;
}

/**
 *
 * @param src
 * @param props
 */
function omit(src, props) {
    if (!src || typeof src !== 'object') return null;
    return copyProperties(cloneDeep(src), {}, createPropertiesMap(props));
}


module.exports = omit;