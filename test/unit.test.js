'use strict';

var _ = require('lodash');
var expect = require('chai').expect;
var aoo = require('./../index');
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
                MyProp5_Sub5: 6,
                MyProp5_Sub6: {
                    MyProp5_Sub6_Sub1: new Promise(function (resolve, reject) {}),
                    MyProp5_Sub6_Sub2: Symbol(),
                    MyProp5_Sub6_Sub3: function () {console.log('MyProp5_Sub6_Sub3 function')},
                    MyProp5_Sub6_Sub4: new Date(),
                    MyProp5_Sub6_Sub5: new RegExp()
                }
            }
        }
    });

    it('should return same object for non-existent property', function () {
        var dst = aoo(sourceObject, "NonExtistentProperty");
        expect(sourceObject).to.be.deep.equal(dst);
    });

    it('should return same object for empty properties array', function () {
        var dst = aoo(sourceObject, []);
        expect(sourceObject).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in string', function () {
        var src = _.omit(sourceObject, 'MyProp5');
        var dst = aoo(sourceObject, 'MyProp5');
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in array', function () {
        var src = _.omit(sourceObject, ['MyProp5']);
        var dst = aoo(sourceObject, ['MyProp5']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5 property in array', function () {
        var src = _.omit(sourceObject, ['MyProp5']);
        var dst = aoo(sourceObject, ['MyProp5']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5.MyProp5_Sub1 property', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1']);
        var dst = aoo(sourceObject, ['MYPROP5/i.MyProp5_SUB1/i']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1 & MyProp5_Sub1_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = aoo(sourceObject, ['MyProP5/i.MyProp5_SuB1/i', 'MYPROP5/i.MyProp5_SUB1/i.MyProp5_Sub1_SUB1/i']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1 & MyProp5_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = aoo(sourceObject, ['MyProp5.MyProp5_SUB1/i.MyProp5_Sub1_Sub1', 'MYPROP5/i.MyProp5_Sub1']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1 & MyProp5_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = aoo(sourceObject, ['MyProp5.MyProp5_SUB1/i.MyProp5_Sub1_Sub1']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1 & MyProp5_Sub1 properties', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        var dst = aoo(sourceObject, ['MyProp5.MyProp5_Sub1', 'MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_Sub3 property', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_Sub3']);
        var dst = aoo(sourceObject, ['MyProp5.MyProp5_SUB1/i.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_SUB3/i']);
        expect(src).to.be.deep.equal(dst);
    });

    it('should return object without MyProp5_Sub1_Sub1_Sub3 property', function () {
        var src = _.omit(sourceObject, ['MyProp5.MyProp5_Sub1.MyProp5_Sub1_Sub1.MyProp5_Sub1_Sub1_Sub3']);
        var dst = aoo(sourceObject, ['MyProp5./MyProp5_(Sub1|sUb2)/i']);
        expect(src).to.be.deep.equal(dst);
    });

});