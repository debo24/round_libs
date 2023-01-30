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
var AddressStringUtilTest_json_1 = __importDefault(require("../build/AddressStringUtilTest.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999,
};
var example = '0xC257274276a4E539741Ca11b590B9447B26A8051';
describe('AddressStringUtil', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999,
        },
    });
    var wallet = provider.getWallets()[0];
    var addressStringUtil;
    before('deploy AddressStringUtilTest', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, AddressStringUtilTest_json_1.default, [], overrides)];
                case 1:
                    addressStringUtil = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('#toAsciiString', function () {
        it('zero address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(ethers_1.constants.AddressZero, 40)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.constants.AddressZero.substr(2));
                        return [2 /*return*/];
                }
            });
        }); });
        it('own address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(addressStringUtil.address, 40)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(addressStringUtil.address.substr(2).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
        it('random address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(example, 40)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(example.substr(2).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
        it('reverts if len % 2 != 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(addressStringUtil.toAsciiString(example, 39)).to.be.revertedWith('AddressStringUtil: INVALID_LEN')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('reverts if len >= 40', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(addressStringUtil.toAsciiString(example, 42)).to.be.revertedWith('AddressStringUtil: INVALID_LEN')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('reverts if len == 0', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, chai_1.expect(addressStringUtil.toAsciiString(example, 0)).to.be.revertedWith('AddressStringUtil: INVALID_LEN')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('produces len characters', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(example, 4)];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).to.eq(example.substr(2, 4).toUpperCase());
                        _b = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(example, 10)];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).to.eq(example.substr(2, 10).toUpperCase());
                        _c = chai_1.expect;
                        return [4 /*yield*/, addressStringUtil.toAsciiString(example, 16)];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).to.eq(example.substr(2, 16).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
