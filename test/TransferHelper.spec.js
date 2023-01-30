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
var TransferHelperTest_json_1 = __importDefault(require("../build/TransferHelperTest.json"));
var TransferHelperTestFakeFallback_json_1 = __importDefault(require("../build/TransferHelperTestFakeFallback.json"));
var TransferHelperTestFakeERC20Noncompliant_json_1 = __importDefault(require("../build/TransferHelperTestFakeERC20Noncompliant.json"));
var TransferHelperTestFakeERC20Compliant_json_1 = __importDefault(require("../build/TransferHelperTestFakeERC20Compliant.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999,
};
describe('TransferHelper', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999,
        },
    });
    var wallet = provider.getWallets()[0];
    var transferHelper;
    var fakeFallback;
    var fakeCompliant;
    var fakeNoncompliant;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, TransferHelperTest_json_1.default, [], overrides)];
                case 1:
                    transferHelper = _a.sent();
                    return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, TransferHelperTestFakeFallback_json_1.default, [], overrides)];
                case 2:
                    fakeFallback = _a.sent();
                    return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, TransferHelperTestFakeERC20Noncompliant_json_1.default, [], overrides)];
                case 3:
                    fakeNoncompliant = _a.sent();
                    return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, TransferHelperTestFakeERC20Compliant_json_1.default, [], overrides)];
                case 4:
                    fakeCompliant = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // sets up the fixtures for each token situation that should be tested
    function harness(_a) {
        var _this = this;
        var sendTx = _a.sendTx, expectedError = _a.expectedError;
        it('succeeds with compliant with no revert and true return', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeCompliant.setup(true, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sendTx(fakeCompliant.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails with compliant with no revert and false return', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeCompliant.setup(false, false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(sendTx(fakeCompliant.address)).to.be.revertedWith(expectedError)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails with compliant with revert', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeCompliant.setup(false, true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(sendTx(fakeCompliant.address)).to.be.revertedWith(expectedError)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('succeeds with noncompliant (no return) with no revert', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeNoncompliant.setup(false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, sendTx(fakeNoncompliant.address)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails with noncompliant (no return) with revert', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeNoncompliant.setup(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(sendTx(fakeNoncompliant.address)).to.be.revertedWith(expectedError)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    describe('#safeApprove', function () {
        harness({
            sendTx: function (tokenAddress) { return transferHelper.safeApprove(tokenAddress, ethers_1.constants.AddressZero, ethers_1.constants.MaxUint256); },
            expectedError: 'TransferHelper::safeApprove: approve failed',
        });
    });
    describe('#safeTransfer', function () {
        harness({
            sendTx: function (tokenAddress) { return transferHelper.safeTransfer(tokenAddress, ethers_1.constants.AddressZero, ethers_1.constants.MaxUint256); },
            expectedError: 'TransferHelper::safeTransfer: transfer failed',
        });
    });
    describe('#safeTransferFrom', function () {
        harness({
            sendTx: function (tokenAddress) {
                return transferHelper.safeTransferFrom(tokenAddress, ethers_1.constants.AddressZero, ethers_1.constants.AddressZero, ethers_1.constants.MaxUint256);
            },
            expectedError: 'TransferHelper::transferFrom: transferFrom failed',
        });
    });
    describe('#safeTransferETH', function () {
        it('succeeds call not reverted', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeFallback.setup(false)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, transferHelper.safeTransferETH(fakeFallback.address, 0)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails if call reverts', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fakeFallback.setup(true)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(transferHelper.safeTransferETH(fakeFallback.address, 0)).to.be.revertedWith('TransferHelper::safeTransferETH: ETH transfer failed')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
