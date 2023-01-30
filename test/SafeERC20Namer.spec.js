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
var strings_1 = require("@ethersproject/strings");
var ethereum_waffle_1 = require("ethereum-waffle");
var SafeERC20NamerTest_json_1 = __importDefault(require("../build/SafeERC20NamerTest.json"));
var NamerTestFakeCompliantERC20_json_1 = __importDefault(require("../build/NamerTestFakeCompliantERC20.json"));
var NamerTestFakeNoncompliantERC20_json_1 = __importDefault(require("../build/NamerTestFakeNoncompliantERC20.json"));
var NamerTestFakeOptionalERC20_json_1 = __importDefault(require("../build/NamerTestFakeOptionalERC20.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999,
};
// last byte in bytes32 strings is null terminator
var fullBytes32Name = 'NAME'.repeat(8).substr(0, 31);
var fullBytes32Symbol = 'SYMB'.repeat(8).substr(0, 31);
describe('SafeERC20Namer', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999,
        },
    });
    var wallet = provider.getWallets()[0];
    var safeNamer;
    before('deploy SafeERC20NamerTest', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, SafeERC20NamerTest_json_1.default, [], overrides)];
                case 1:
                    safeNamer = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    function deployCompliant(_a) {
        var name = _a.name, symbol = _a.symbol;
        return ethereum_waffle_1.deployContract(wallet, NamerTestFakeCompliantERC20_json_1.default, [name, symbol], overrides);
    }
    function deployNoncompliant(_a) {
        var name = _a.name, symbol = _a.symbol;
        return ethereum_waffle_1.deployContract(wallet, NamerTestFakeNoncompliantERC20_json_1.default, [strings_1.formatBytes32String(name), strings_1.formatBytes32String(symbol)], overrides);
    }
    function deployOptional() {
        return ethereum_waffle_1.deployContract(wallet, NamerTestFakeOptionalERC20_json_1.default, [], overrides);
    }
    function getName(tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, safeNamer.tokenName(tokenAddress)];
            });
        });
    }
    function getSymbol(tokenAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, safeNamer.tokenSymbol(tokenAddress)];
            });
        });
    }
    describe('#tokenName', function () {
        it('works with compliant', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: 'token name', symbol: 'tn' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('token name');
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with noncompliant', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: 'token name', symbol: 'tn' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('token name');
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with empty bytes32', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: '', symbol: '' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.toUpperCase().substr(2));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with noncompliant full bytes32', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: fullBytes32Name, symbol: fullBytes32Symbol })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(fullBytes32Name);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with optional', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployOptional()];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.toUpperCase().substr(2));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with non-code address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(ethers_1.constants.AddressZero)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.constants.AddressZero.substr(2));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with really long strings', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: 'token name'.repeat(32), symbol: 'tn'.repeat(32) })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('token name'.repeat(32));
                        return [2 /*return*/];
                }
            });
        }); });
        it('falls back to address with empty strings', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: '', symbol: '' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getName(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.toUpperCase().substr(2));
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#tokenSymbol', function () {
        it('works with compliant', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: 'token name', symbol: 'tn' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('tn');
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with noncompliant', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: 'token name', symbol: 'tn' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('tn');
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with empty bytes32', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: '', symbol: '' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.substr(2, 6).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with noncompliant full bytes32', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployNoncompliant({ name: fullBytes32Name, symbol: fullBytes32Symbol })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(fullBytes32Symbol);
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with optional', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployOptional()];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.substr(2, 6).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with non-code address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(ethers_1.constants.AddressZero)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]).to.eq(ethers_1.constants.AddressZero.substr(2, 6));
                        return [2 /*return*/];
                }
            });
        }); });
        it('works with really long strings', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: 'token name'.repeat(32), symbol: 'tn'.repeat(32) })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq('tn'.repeat(32));
                        return [2 /*return*/];
                }
            });
        }); });
        it('falls back to address with empty strings', function () { return __awaiter(void 0, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, deployCompliant({ name: '', symbol: '' })];
                    case 1:
                        token = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, getSymbol(token.address)];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address.substr(2, 6).toUpperCase());
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
