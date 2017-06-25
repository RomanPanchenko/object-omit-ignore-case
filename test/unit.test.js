'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var objectOmitIgnoreCase = require('./../index');
var sourceObject;

describe('Object omit', function () {
    beforeEach(function () {
        sourceObject = {
            MyProp1: 'MyProp1 text',
            MyProp2: {
                MyProp2_Sub1: 'MyProp2_Sub1 text'
            },
            MyProp3: undefined,
            MyProp4: null,
            MyProp5: {
                MyProp5_Sub1: {
                    MyProp5_Sub1_Sub1: {
                        MyProp5_Sub1_Sub1_Sub1: 'MyProp5_Sub1_Sub1_Sub1 text',
                        MyProp5_Sub1_Sub1_Sub2: new String('MyProp5_Sub1_Sub1_Sub2 text'),
                        MyProp5_Sub1_Sub1_Sub3: undefined
                    }
                },
                MyProp5_Sub2: {},
                MyProp5_Sub3: null,
                MyProp5_Sub4: Number(5),
                MyProp5_Sub5: 6
            }
        }
    });

    it('should return same object for non-existent property', function () {
        var dst = objectOmitIgnoreCase(sourceObject, "NonExtistentProperty");
        expect(sourceObject).to.be.deep.equal(dst);
    });

    it('should return same object for empty properties array', function () {
        var dst = objectOmitIgnoreCase(sourceObject, []);
        expect(sourceObject).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in string', function () {
        var src = _.omit(sourceObject, 'MyProp5');
        var dst = objectOmitIgnoreCase(sourceObject, 'MyProp5');
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in array', function () {
        var src = _.omit(sourceObject, ['MyProp5']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in array', function () {
        var src = _.omit(sourceObject, ['MyProp5']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5.MyProp5_Sub1 property', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5.MyProp5_Sub1'.toUpperCase()]);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1 & MyProp5_Sub1_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5.MyProp5_Sub1'.toUpperCase(), 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1'.toUpperCase()]);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1 & MyProp5_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1'.toUpperCase(), 'MyProp5.MyProp5_Sub1'.toUpperCase()]);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1 & MyProp5_Sub1 properties /case sensitive', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1', 'MyProp5.MyProp5_Sub1'], false);
        expect(src).to.be.deep.equal(dst);
    });


    it('should return object without MyProp5_Sub1_Sub1_Sub3 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_Sub3']);
        var dst = objectOmitIgnoreCase(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_Sub3'.toUpperCase()]);
        expect(src).to.be.deep.equal(dst);
    });
});