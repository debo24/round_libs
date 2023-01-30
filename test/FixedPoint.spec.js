"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var ethers_1 = require("ethers");
var ethereum_waffle_1 = require("ethereum-waffle");
var FixedPointTest_json_1 = __importDefault(require("../build/FixedPointTest.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999,
};
var Q112 = ethers_1.BigNumber.from(2).pow(112);
describe('FixedPoint', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999,
        },
    });
    var wallet = provider.getWallets()[0];
    var fixedPoint;
    before('deploy FixedPointTest', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, FixedPointTest_json_1.default, [], overrides)];
                case 1:
                    fixedPoint = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('#encode', function () {
        it('shifts left by 112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.encode('0x01')];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112.toHexString());
                        return [2 /*return*/];
                }
            });
        }); });
        it('will not take >uint112(-1)', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                chai_1.expect(function () { return fixedPoint.encode(ethers_1.BigNumber.from(2).pow(113).sub(1)); }).to.throw;
                return [2 /*return*/];
            });
        }); });
    });
    describe('#encode144', function () {
        it('shifts left by 112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.encode144('0x01')];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112.toHexString());
                        return [2 /*return*/];
                }
            });
        }); });
        it('will not take >uint144(-1)', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                chai_1.expect(function () { return fixedPoint.encode144(ethers_1.BigNumber.from(2).pow(145).sub(1)); }).to.throw;
                return [2 /*return*/];
            });
        }); });
    });
    describe('#decode', function () {
        it('shifts right by 112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.decode([ethers_1.BigNumber.from(3).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.BigNumber.from(3));
                        return [2 /*return*/];
                }
            });
        }); });
        it('will not take >uint224(-1)', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                chai_1.expect(function () { return fixedPoint.decode([ethers_1.BigNumber.from(2).pow(225).sub(1)]); }).to.throw;
                return [2 /*return*/];
            });
        }); });
    });
    describe('#decode144', function () {
        it('shifts right by 112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.decode([ethers_1.BigNumber.from(3).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.BigNumber.from(3));
                        return [2 /*return*/];
                }
            });
        }); });
        it('will not take >uint256(-1)', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                chai_1.expect(function () { return fixedPoint.decode([ethers_1.BigNumber.from(2).pow(257).sub(1)]); }).to.throw;
                return [2 /*return*/];
            });
        }); });
    });
    describe('#mul', function () {
        it('works for 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([0], 1)];
                    case 1:
                        _a.apply(void 0, [(_c.sent())[0]]).to.eq(0);
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([1], 0)];
                    case 2:
                        _b.apply(void 0, [(_c.sent())[0]]).to.eq(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('correct multiplication', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([ethers_1.BigNumber.from(3).mul(Q112)], ethers_1.BigNumber.from(2))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(3).mul(2).mul(Q112));
                        return [2 /*return*/];
                }
            });
        }); });
        it('overflow', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.mul([ethers_1.BigNumber.from(1).mul(Q112)], ethers_1.BigNumber.from(2).pow(144))).to.be.revertedWith('FixedPoint::mul: overflow')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('max of q112x112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([ethers_1.BigNumber.from(2).pow(112)], ethers_1.BigNumber.from(2).pow(112))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(2).pow(224));
                        return [2 /*return*/];
                }
            });
        }); });
        it('max without overflow, largest fixed point', function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxMultiplier, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        maxMultiplier = ethers_1.BigNumber.from(2).pow(32);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier)];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from('115792089237316195423570985008687907853269984665640564039457584007908834672640'));
                        return [4 /*yield*/, chai_1.expect(fixedPoint.mul([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier.add(1))).to.be.revertedWith('FixedPoint::mul: overflow')];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('max without overflow, smallest fixed point', function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxUint, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        maxUint = ethers_1.BigNumber.from(2).pow(256).sub(1);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.mul([ethers_1.BigNumber.from(1)], maxUint)];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(maxUint);
                        return [4 /*yield*/, chai_1.expect(fixedPoint.mul([ethers_1.BigNumber.from(2)], maxUint)).to.be.revertedWith('FixedPoint::mul: overflow')];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#muli', function () {
        it('works for 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(0).mul(Q112)], ethers_1.BigNumber.from(1))];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.eq(ethers_1.BigNumber.from(0));
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(1).mul(Q112)], ethers_1.BigNumber.from(0))];
                    case 2:
                        _b.apply(void 0, [_c.sent()]).to.eq(ethers_1.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 3*2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(3).mul(Q112)], ethers_1.BigNumber.from(2))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.BigNumber.from(6));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 3*-2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(3).mul(Q112)], ethers_1.BigNumber.from(-2))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.BigNumber.from(-6));
                        return [2 /*return*/];
                }
            });
        }); });
        it('max without overflow, largest int', function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxInt, _a, minInt, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        maxInt = ethers_1.BigNumber.from(2).pow(255).sub(1);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(1).mul(Q112)], maxInt)];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).to.be.eq(maxInt);
                        minInt = ethers_1.BigNumber.from(2).pow(255).mul(-1);
                        return [4 /*yield*/, chai_1.expect(fixedPoint.muli([ethers_1.BigNumber.from(1).mul(Q112)], minInt)).to.be.revertedWith('FixedPoint::muli: overflow')];
                    case 2:
                        _d.sent();
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(1).mul(Q112).sub(1)], minInt)];
                    case 3:
                        _b.apply(void 0, [_d.sent()]).to.be.eq('-57896044618658097711785492504343942776262393067508711251869655679775811829760');
                        _c = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(1).mul(Q112)], minInt.add(1))];
                    case 4:
                        _c.apply(void 0, [_d.sent()]).to.be.eq(minInt.add(1));
                        return [2 /*return*/];
                }
            });
        }); });
        it('max without overflow, largest fixed point', function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxMultiplier, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        maxMultiplier = ethers_1.BigNumber.from(2)
                            .pow(255 + 112)
                            .div(ethers_1.BigNumber.from(2).pow(224).sub(1));
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier)];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.eq(ethers_1.BigNumber.from('57896044618658097711785492504343953926634992332820282019728792003954417336320'));
                        return [4 /*yield*/, chai_1.expect(fixedPoint.muli([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier.add(1))).to.be.revertedWith('FixedPoint::muli: overflow')
                            // negative versions
                        ];
                    case 2:
                        _c.sent();
                        // negative versions
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muli([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier.mul(-1))];
                    case 3:
                        // negative versions
                        _b.apply(void 0, [_c.sent()]).to.eq(ethers_1.BigNumber.from('57896044618658097711785492504343953926634992332820282019728792003954417336320').mul(-1));
                        return [4 /*yield*/, chai_1.expect(fixedPoint.muli([ethers_1.BigNumber.from(2).pow(224).sub(1)], maxMultiplier.add(1).mul(-1))).to.be.revertedWith('FixedPoint::muli: overflow')];
                    case 4:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#muluq', function () {
        it('works for 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([ethers_1.BigNumber.from(0)], [Q112])];
                    case 1:
                        _a.apply(void 0, [(_c.sent())[0]]).to.eq(ethers_1.BigNumber.from(0));
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([Q112], [ethers_1.BigNumber.from(0)])];
                    case 2:
                        _b.apply(void 0, [(_c.sent())[0]]).to.eq(ethers_1.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        }); });
        it('multiplies 3*2', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([ethers_1.BigNumber.from(3).mul(Q112)], [ethers_1.BigNumber.from(2).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(3).mul(2).mul(Q112));
                        return [2 /*return*/];
                }
            });
        }); });
        function multiplyExpanded(self, other) {
            var upper = self.shr(112).mul(other.shr(112));
            var lower = self.mask(112).mul(other.mask(112));
            var uppersLowero = self.shr(112).mul(other.mask(112));
            var upperoLowers = self.mask(112).mul(other.shr(112));
            return upper.mul(Q112).add(uppersLowero).add(upperoLowers).add(lower.div(Q112));
        }
        it('multiplies 4/3*4/3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var multiplier, expectedResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        multiplier = ethers_1.BigNumber.from(4).mul(Q112).div(3);
                        expectedResult = multiplyExpanded(multiplier, multiplier);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([multiplier], [multiplier])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(expectedResult);
                        chai_1.expect(expectedResult.add(1)).to.eq(ethers_1.BigNumber.from(16).mul(Q112).div(9)); // close to 16/9
                        return [2 /*return*/];
                }
            });
        }); });
        it('overflow upper', function () { return __awaiter(void 0, void 0, void 0, function () {
            var multiplier1, multiplier2, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        multiplier1 = Q112.mul(2);
                        multiplier2 = Q112.mul(Q112).div(2);
                        return [4 /*yield*/, chai_1.expect(fixedPoint.muluq([multiplier1], [multiplier2])).to.be.revertedWith('FixedPoint::muluq: upper overflow')];
                    case 1:
                        _c.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([multiplier1.sub(1)], [multiplier2])];
                    case 2:
                        _a.apply(void 0, [(_c.sent())[0]]).to.eq(multiplyExpanded(multiplier1.sub(1), multiplier2));
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.muluq([multiplier1], [multiplier2.sub(1)])];
                    case 3:
                        _b.apply(void 0, [(_c.sent())[0]]).to.eq(multiplyExpanded(multiplier1, multiplier2.sub(1)));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas for short circuit where one multiplicand is 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfMuluq([ethers_1.BigNumber.from(0)], [ethers_1.BigNumber.from(30).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_c.sent()]).to.eq(671);
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfMuluq([ethers_1.BigNumber.from(50).mul(Q112)], [ethers_1.BigNumber.from(0)])];
                    case 2:
                        _b.apply(void 0, [_c.sent()]).to.eq(688);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfMuluq([ethers_1.BigNumber.from(30).mul(Q112)], [ethers_1.BigNumber.from(30).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(992);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#divuq', function () {
        it('works for 0 numerator', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(0)], [Q112])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws for 0 denominator', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.divuq([Q112], [ethers_1.BigNumber.from(0)])).to.be.revertedWith('FixedPoint::divuq: division by zero')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('equality 30/30', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(30).mul(Q112)], [ethers_1.BigNumber.from(30).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112);
                        return [2 /*return*/];
                }
            });
        }); });
        it('divides 30/10', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(30).mul(Q112)], [ethers_1.BigNumber.from(10).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(3).mul(Q112));
                        return [2 /*return*/];
                }
            });
        }); });
        it('divides 35/8', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(35).mul(Q112)], [ethers_1.BigNumber.from(8).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(4375).mul(Q112).div(1000));
                        return [2 /*return*/];
                }
            });
        }); });
        it('divides 1/3', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(1).mul(Q112)], [ethers_1.BigNumber.from(3).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(
                        // this is max precision 0.3333 repeating
                        '1730765619511609209510165443073365');
                        return [2 /*return*/];
                }
            });
        }); });
        it('divides 1e15/3e15 (long division, repeating)', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([ethers_1.BigNumber.from(10).pow(15).mul(Q112)], [ethers_1.BigNumber.from(3).mul(ethers_1.BigNumber.from(10).pow(15)).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq('1730765619511609209510165443073365');
                        return [2 /*return*/];
                }
            });
        }); });
        it('boundary of full precision', function () { return __awaiter(void 0, void 0, void 0, function () {
            var maxNumeratorFullPrecision, minDenominatorFullPrecision, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        maxNumeratorFullPrecision = ethers_1.BigNumber.from(2).pow(144).sub(1);
                        minDenominatorFullPrecision = ethers_1.BigNumber.from('4294967296') // ceiling(uint144(-1) * Q112 / uint224(-1))
                        ;
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([maxNumeratorFullPrecision], [minDenominatorFullPrecision])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from('26959946667150639794667015087019630673637143213614752866474435543040'));
                        return [4 /*yield*/, chai_1.expect(fixedPoint.divuq([maxNumeratorFullPrecision.add(1)], [minDenominatorFullPrecision])).to.be.revertedWith('FixedPoint::divuq: overflow')];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, chai_1.expect(fixedPoint.divuq([maxNumeratorFullPrecision], [minDenominatorFullPrecision.sub(1)])).to.be.revertedWith('FixedPoint::divuq: overflow')];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('precision', function () { return __awaiter(void 0, void 0, void 0, function () {
            var numerator, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        numerator = ethers_1.BigNumber.from(2).pow(144);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([numerator], [numerator.sub(1)])];
                    case 1:
                        _a.apply(void 0, [(_c.sent())[0]]).to.eq(ethers_1.BigNumber.from('5192296858534827628530496329220096'));
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.divuq([numerator], [numerator.add(1)])];
                    case 2:
                        _b.apply(void 0, [(_c.sent())[0]]).to.eq(ethers_1.BigNumber.from('5192296858534827628530496329220095'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of dividend = divisor short circuit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(30).mul(Q112)], [ethers_1.BigNumber.from(30).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(698);
                        return [2 /*return*/];
                }
            });
        }); });
        it('divuq overflow with smaller numbers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var numerator, denominator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numerator = ethers_1.BigNumber.from(2).pow(143);
                        denominator = ethers_1.BigNumber.from(2).pow(29);
                        return [4 /*yield*/, chai_1.expect(fixedPoint.divuq([numerator], [denominator])).to.be.revertedWith('FixedPoint::divuq: overflow')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('divuq overflow with large numbers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var numerator, denominator;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        numerator = ethers_1.BigNumber.from(2).pow(145);
                        denominator = ethers_1.BigNumber.from(2).pow(32);
                        return [4 /*yield*/, chai_1.expect(fixedPoint.divuq([numerator], [denominator])).to.be.revertedWith('FixedPoint::divuq: overflow')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of full precision small dividend short circuit', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(125).mul(Q112)], [ethers_1.BigNumber.from(30).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).to.eq(838);
                        _b = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(28).mul(Q112)], [ethers_1.BigNumber.from(280).mul(Q112)])];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).to.eq(838);
                        _c = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(1).mul(Q112)], [ethers_1.BigNumber.from(3).mul(Q112)])];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).to.eq(838);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of long division with less than 112 iterations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // long division but makes fewer iterations
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(10).pow(10).mul(Q112)], [ethers_1.BigNumber.from(25).mul(Q112)])];
                    case 1:
                        // long division but makes fewer iterations
                        _a.apply(void 0, [_b.sent()]).to.eq(1502);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of long division with all iterations', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 1/3rd, should make all iterations
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfDivuq([ethers_1.BigNumber.from(10).pow(10).mul(Q112)], [ethers_1.BigNumber.from(3).mul(ethers_1.BigNumber.from(10).pow(10)).mul(Q112)])];
                    case 1:
                        // 1/3rd, should make all iterations
                        _a.apply(void 0, [_b.sent()]).to.eq(1502);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#fraction', function () {
        it('correct computation less than 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(4, 100)];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(4).mul(Q112).div(100));
                        return [2 /*return*/];
                }
            });
        }); });
        it('correct computation greater than 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(100, 4)];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(100).mul(Q112).div(4));
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails with 0 denominator', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.fraction(ethers_1.BigNumber.from(1), ethers_1.BigNumber.from(0))).to.be.revertedWith('FixedPoint::fraction: division by zero')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be called with numerator exceeding uint112 max', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(Q112.mul(2359), 6950)];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112.mul(Q112).mul(2359).div(6950));
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be called with denominator exceeding uint112 max', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(2359, Q112.mul(2359))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be called with numerator exceeding uint144 max', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(Q112.mul(2359).mul(ethers_1.BigNumber.from(2).pow(32)), Q112.mul(50))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(2359).mul(Q112).mul(ethers_1.BigNumber.from(2).pow(32)).div(50));
                        return [2 /*return*/];
                }
            });
        }); });
        it('can be called with numerator and denominator exceeding uint112 max', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(Q112.mul(2359), Q112.mul(50))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(2359).mul(Q112).div(50));
                        return [2 /*return*/];
                }
            });
        }); });
        it('short circuits for 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.fraction(0, Q112.mul(Q112).mul(2360))];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('can overflow if result of division does not fit', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.fraction(Q112.mul(2359), 50)).to.be.revertedWith('FixedPoint::fraction: overflow')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfFraction(ethers_1.BigNumber.from(0), ethers_1.BigNumber.from(569))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(210);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of smaller numbers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfFraction(ethers_1.BigNumber.from(239), ethers_1.BigNumber.from(569))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(314);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of number greater than Q112 numbers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfFraction(Q112.mul(2359), Q112.mul(2360))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(314);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of number greater than Q112 numbers', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfFraction(Q112.mul(ethers_1.BigNumber.from(2).pow(32).mul(2359)), Q112.mul(2360))];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(996);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#reciprocal', function () {
        it('fails for 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.reciprocal([ethers_1.BigNumber.from(0)])).to.be.revertedWith('FixedPoint::reciprocal: reciprocal of zero')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails for 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(fixedPoint.reciprocal([ethers_1.BigNumber.from(1)])).to.be.revertedWith('FixedPoint::reciprocal: overflow')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 0.25', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.reciprocal([Q112.mul(ethers_1.BigNumber.from(25)).div(100)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112.mul(4));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 5', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.reciprocal([Q112.mul(ethers_1.BigNumber.from(5))])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(Q112.mul(ethers_1.BigNumber.from(1)).div(5));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#sqrt', function () {
        it('works with 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.sqrt([ethers_1.BigNumber.from(0)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(0));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with numbers less than 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.sqrt([ethers_1.BigNumber.from(1225).mul(Q112).div(100)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(35).mul(Q112).div(10));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of less than 1', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(1225).mul(Q112).div(100);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1173);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 25', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.sqrt([ethers_1.BigNumber.from(25).mul(Q112)])];
                    case 1:
                        _a.apply(void 0, [(_b.sent())[0]]).to.eq(ethers_1.BigNumber.from(5).mul(Q112));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of 25', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(25).mul(Q112);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1191);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for max uint144', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(144).sub(1);
                        return [4 /*yield*/, fixedPoint.sqrt([input])];
                    case 1:
                        result = (_a.sent())[0];
                        expected = ethers_1.BigNumber.from('340282366920938463463374607431768211455');
                        chai_1.expect(result).to.eq(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of max uint144', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(144).sub(1);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1235);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for 2**144', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(144);
                        return [4 /*yield*/, fixedPoint.sqrt([input])];
                    case 1:
                        result = (_a.sent())[0];
                        expected = ethers_1.BigNumber.from('340282366920938463463374607431768211456');
                        chai_1.expect(result).to.eq(expected.shr(2).shl(2));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of 2**144', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(144);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1640);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for encoded max uint112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(112).sub(1).mul(Q112);
                        return [4 /*yield*/, fixedPoint.sqrt([input])];
                    case 1:
                        result = (_a.sent())[0];
                        expected = ethers_1.BigNumber.from('374144419156711147060143317175368417003121712037887');
                        chai_1.expect(result).to.eq(expected.shr(40).shl(40));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of encoded max uint112', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(112).sub(1).mul(Q112);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1723);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works for max uint224', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(224).sub(1);
                        return [4 /*yield*/, fixedPoint.sqrt([input])];
                    case 1:
                        result = (_a.sent())[0];
                        expected = ethers_1.BigNumber.from('374144419156711147060143317175368453031918731001855');
                        chai_1.expect(result).to.eq(expected.shr(40).shl(40));
                        return [2 /*return*/];
                }
            });
        }); });
        it('gas cost of max uint224', function () { return __awaiter(void 0, void 0, void 0, function () {
            var input, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = ethers_1.BigNumber.from(2).pow(224).sub(1);
                        _a = chai_1.expect;
                        return [4 /*yield*/, fixedPoint.getGasCostOfSqrt([input])];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(1723);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
