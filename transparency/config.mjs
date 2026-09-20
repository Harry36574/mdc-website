// Generated from the canonical registry and locked artifacts. Run generate-config.mjs to reproduce.
const data = {
  "provenance": {
    "registryPath": "contracts/treasury-vesting/spec/PRODUCTION-REGISTRY.md",
    "registrySha256": "8b4b5fb033a285b01f440961e22866eec98c86e29d15f986e5632b97cdd91c6c",
    "artifactSha256": {
      "contracts/treasury-vesting/out/MDCFixedPeriodVault.sol/MDCFixedPeriodVault.json": "80d484f347de6343a4dd8208da4b229e91977b70df073176084a42ca174fb17d",
      "contracts/treasury-vesting/out/MDCPermanentLock.sol/MDCPermanentLock.json": "4336b77073e08b8be419dc56db6af659f52a31db0425671c8341f105ba4be475",
      "contracts/treasury-vesting/out/MDCLiquidityReserveVault.sol/MDCLiquidityReserveVault.json": "cc884c8d754126bf3170a805e3791eb81a1e5f4619584ac053677a305b0f1c99",
      "contracts/treasury-vesting/out/MDCEcosystemPartIVault.sol/MDCEcosystemPartIVault.json": "cc9e85195cb0a88d8260940cb977343c49f2d9fb5ae5ebff16cc9e2c6ba203be",
      "contracts/treasury-vesting/out/MDCEcosystemPartIIVault.sol/MDCEcosystemPartIIVault.json": "8eef17187ad998bf9ed007b390ddfe7cba84cb21fe66b17effa225b52c789934",
      "contracts/abi/MDC.json": "bcd76a92e7c0591239d27be201a7e421e235929e337cdddb6a239bf8af4b8648"
    },
    "sourceLabels": "User-approved Phase 2A labels; independent of runtime conformity and not a live explorer status query."
  },
  "chainId": "1",
  "decimals": "18",
  "totalSupply": "54000000000000000000000000",
  "formalAllocation": "49000000000000000000000000",
  "token": {
    "address": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
    "abi": [
      {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
          {
            "name": "account",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "name": "decimals",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint8",
            "internalType": "uint8"
          }
        ],
        "stateMutability": "view"
      },
      {
        "name": "totalSupply",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      }
    ],
    "getters": {
      "balanceOf": {
        "selector": "0x70a08231",
        "output": "uint256"
      },
      "decimals": {
        "selector": "0x313ce567",
        "output": "uint8"
      },
      "totalSupply": {
        "selector": "0x18160ddd",
        "output": "uint256"
      }
    }
  },
  "types": {
    "MDCFixedPeriodVault": {
      "abi": [
        {
          "type": "function",
          "name": "allocation",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "amountPerInterval",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "availableToReleaseNow",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "cumulativeEligible",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "interval",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "releasable",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "startTime",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "token",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalReleased",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "treasury",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "vaultBalance",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        }
      ],
      "getters": {
        "allocation": {
          "selector": "0x88a17bde",
          "output": "uint256"
        },
        "amountPerInterval": {
          "selector": "0xe04ff152",
          "output": "uint256"
        },
        "availableToReleaseNow": {
          "selector": "0xdfc494dd",
          "output": "uint256"
        },
        "cumulativeEligible": {
          "selector": "0x9b2a31e7",
          "output": "uint256"
        },
        "interval": {
          "selector": "0x947a36fb",
          "output": "uint256"
        },
        "releasable": {
          "selector": "0xfbccedae",
          "output": "uint256"
        },
        "startTime": {
          "selector": "0x78e97925",
          "output": "uint256"
        },
        "token": {
          "selector": "0xfc0c546a",
          "output": "address"
        },
        "totalReleased": {
          "selector": "0xe33b7de3",
          "output": "uint256"
        },
        "treasury": {
          "selector": "0x61d027b3",
          "output": "address"
        },
        "vaultBalance": {
          "selector": "0x0bf6cc08",
          "output": "uint256"
        }
      }
    },
    "MDCPermanentLock": {
      "abi": [
        {
          "type": "function",
          "name": "expectedLockedAmount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "lockedBalance",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "token",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
            }
          ],
          "stateMutability": "view"
        }
      ],
      "getters": {
        "expectedLockedAmount": {
          "selector": "0x84e7137b",
          "output": "uint256"
        },
        "lockedBalance": {
          "selector": "0x7b80889b",
          "output": "uint256"
        },
        "token": {
          "selector": "0xfc0c546a",
          "output": "address"
        }
      }
    },
    "MDCLiquidityReserveVault": {
      "abi": [
        {
          "type": "function",
          "name": "allocation",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "availableToReleaseNow",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "batch2Amount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "batch2Time",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "batch3Amount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "batch3Time",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "cumulativeEligible",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "releasable",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "token",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalReleased",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "treasury",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "vaultBalance",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        }
      ],
      "getters": {
        "allocation": {
          "selector": "0x88a17bde",
          "output": "uint256"
        },
        "availableToReleaseNow": {
          "selector": "0xdfc494dd",
          "output": "uint256"
        },
        "batch2Amount": {
          "selector": "0x0f40abe9",
          "output": "uint256"
        },
        "batch2Time": {
          "selector": "0x06f0dd6e",
          "output": "uint256"
        },
        "batch3Amount": {
          "selector": "0xf7032f1a",
          "output": "uint256"
        },
        "batch3Time": {
          "selector": "0x34c6afe2",
          "output": "uint256"
        },
        "cumulativeEligible": {
          "selector": "0x9b2a31e7",
          "output": "uint256"
        },
        "releasable": {
          "selector": "0xfbccedae",
          "output": "uint256"
        },
        "token": {
          "selector": "0xfc0c546a",
          "output": "address"
        },
        "totalReleased": {
          "selector": "0xe33b7de3",
          "output": "uint256"
        },
        "treasury": {
          "selector": "0x61d027b3",
          "output": "address"
        },
        "vaultBalance": {
          "selector": "0x0bf6cc08",
          "output": "uint256"
        }
      }
    },
    "MDCEcosystemPartIVault": {
      "abi": [
        {
          "type": "function",
          "name": "allocation",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "availableToReleaseNow",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "cumulativeEligible",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "initialAmount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "interval",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "periodCount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "releasable",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "startTime",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "stepAmount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "token",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalReleased",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "treasury",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "vaultBalance",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        }
      ],
      "getters": {
        "allocation": {
          "selector": "0x88a17bde",
          "output": "uint256"
        },
        "availableToReleaseNow": {
          "selector": "0xdfc494dd",
          "output": "uint256"
        },
        "cumulativeEligible": {
          "selector": "0x9b2a31e7",
          "output": "uint256"
        },
        "initialAmount": {
          "selector": "0xfc1ed437",
          "output": "uint256"
        },
        "interval": {
          "selector": "0x947a36fb",
          "output": "uint256"
        },
        "periodCount": {
          "selector": "0x7f197519",
          "output": "uint256"
        },
        "releasable": {
          "selector": "0xfbccedae",
          "output": "uint256"
        },
        "startTime": {
          "selector": "0x78e97925",
          "output": "uint256"
        },
        "stepAmount": {
          "selector": "0x1989488b",
          "output": "uint256"
        },
        "token": {
          "selector": "0xfc0c546a",
          "output": "address"
        },
        "totalReleased": {
          "selector": "0xe33b7de3",
          "output": "uint256"
        },
        "treasury": {
          "selector": "0x61d027b3",
          "output": "address"
        },
        "vaultBalance": {
          "selector": "0x0bf6cc08",
          "output": "uint256"
        }
      }
    },
    "MDCEcosystemPartIIVault": {
      "abi": [
        {
          "type": "function",
          "name": "allocation",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "availableToReleaseNow",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "cumulativeEligible",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "initialAmount",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "interval",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "releasable",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "startTime",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "token",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "totalReleased",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "treasury",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "vaultBalance",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        }
      ],
      "getters": {
        "allocation": {
          "selector": "0x88a17bde",
          "output": "uint256"
        },
        "availableToReleaseNow": {
          "selector": "0xdfc494dd",
          "output": "uint256"
        },
        "cumulativeEligible": {
          "selector": "0x9b2a31e7",
          "output": "uint256"
        },
        "initialAmount": {
          "selector": "0xfc1ed437",
          "output": "uint256"
        },
        "interval": {
          "selector": "0x947a36fb",
          "output": "uint256"
        },
        "releasable": {
          "selector": "0xfbccedae",
          "output": "uint256"
        },
        "startTime": {
          "selector": "0x78e97925",
          "output": "uint256"
        },
        "token": {
          "selector": "0xfc0c546a",
          "output": "address"
        },
        "totalReleased": {
          "selector": "0xe33b7de3",
          "output": "uint256"
        },
        "treasury": {
          "selector": "0x61d027b3",
          "output": "address"
        },
        "vaultBalance": {
          "selector": "0x0bf6cc08",
          "output": "uint256"
        }
      }
    }
  },
  "instances": [
    {
      "id": "H1",
      "name": "Founder Releasable Vault",
      "type": "MDCFixedPeriodVault",
      "address": "0xcA206cB2810528ddb3032547B54F419190F5492e",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x2F668bC15C710251e8A15C65A73eF87F01A50962",
        "allocation": "4000000000000000000000000",
        "startTime": "1850928515",
        "interval": "2592000",
        "amountPerInterval": "50000000000000000000000"
      },
      "runtimeHash": "0x27bad1078023dacaedbb9200815953e58f0e8f22be0804e24b3defaa8531cd9c",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e04ff152146101a4578063e33b7de3146101c2578063fbccedae146101e0578063fc0c546a146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb919061089b565b60405180910390f35b6100ee60048036038101906100e991906108e2565b6102ba565b005b6100f8610475565b604051610105919061094c565b60405180910390f35b610116610499565b604051610123919061089b565b60405180910390f35b6101346104bd565b604051610141919061089b565b60405180910390f35b6101526104e1565b60405161015f919061089b565b60405180910390f35b610170610505565b60405161017d919061089b565b60405180910390f35b61018e610566565b60405161019b919061089b565b60405180910390f35b6101ac610593565b6040516101b9919061089b565b60405180910390f35b6101ca6105b7565b6040516101d7919061089b565b60405180910390f35b6101e86105bc565b6040516101f5919061089b565b60405180910390f35b6102066105eb565b60405161021391906109c0565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610276919061094c565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109ed565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc6105bc565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d9190610a45565b925050819055506103ff7f0000000000000000000000002f668bc15c710251e8a15c65a73ef87f01a50962847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f0000000000000000000000002f668bc15c710251e8a15c65a73ef87f01a5096273ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a78565b60405180910390a2505050565b7f0000000000000000000000002f668bc15c710251e8a15c65a73ef87f01a5096281565b7f000000000000000000000000000000000000000000000000000000006e52ed8381565b7f000000000000000000000000000000000000000000034f086f3b33b68400000081565b7f0000000000000000000000000000000000000000000000000000000000278d0081565b5f5f61050f610662565b90507f000000000000000000000000000000000000000000034f086f3b33b684000000811061055e577f000000000000000000000000000000000000000000034f086f3b33b684000000610560565b805b91505090565b5f5f6105706105bc565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b7f000000000000000000000000000000000000000000000a968163f0a57b40000081565b5f5481565b5f5f6105c6610505565b9050805f5410156105e3575f54816105de9190610a9f565b6105e5565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b61061c8383836001610821565b61065d57826040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610654919061094c565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006e52ed83421015610693575f905061081e565b5f60017f0000000000000000000000000000000000000000000000000000000000278d007f000000000000000000000000000000000000000000000000000000006e52ed83426106e39190610a9f565b6106ed9190610aff565b6106f79190610a45565b90505f7f000000000000000000000000000000000000000000000a968163f0a57b4000007f000000000000000000000000000000000000000000034f086f3b33b6840000006107469190610aff565b90505f7f000000000000000000000000000000000000000000000a968163f0a57b4000007f000000000000000000000000000000000000000000034f086f3b33b6840000006107959190610b2f565b90505f5f82146107a65760016107a8565b5f5b60ff16836107b69190610a45565b90508084106107eb577f000000000000000000000000000000000000000000034f086f3b33b68400000094505050505061081e565b7f000000000000000000000000000000000000000000000a968163f0a57b400000846108179190610b5f565b9450505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f51148316610875578383151615610869573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61089581610883565b82525050565b5f6020820190506108ae5f83018461088c565b92915050565b5f5ffd5b6108c181610883565b81146108cb575f5ffd5b50565b5f813590506108dc816108b8565b92915050565b5f602082840312156108f7576108f66108b4565b5b5f610904848285016108ce565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109368261090d565b9050919050565b6109468161092c565b82525050565b5f60208201905061095f5f83018461093d565b92915050565b5f819050919050565b5f61098861098361097e8461090d565b610965565b61090d565b9050919050565b5f6109998261096e565b9050919050565b5f6109aa8261098f565b9050919050565b6109ba816109a0565b82525050565b5f6020820190506109d35f8301846109b1565b92915050565b5f815190506109e7816108b8565b92915050565b5f60208284031215610a0257610a016108b4565b5b5f610a0f848285016109d9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a4f82610883565b9150610a5a83610883565b9250828201905080821115610a7257610a71610a18565b5b92915050565b5f604082019050610a8b5f83018561088c565b610a98602083018461088c565b9392505050565b5f610aa982610883565b9150610ab483610883565b9250828203905081811115610acc57610acb610a18565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610b0982610883565b9150610b1483610883565b925082610b2457610b23610ad2565b5b828204905092915050565b5f610b3982610883565b9150610b4483610883565b925082610b5457610b53610ad2565b5b828206905092915050565b5f610b6982610883565b9150610b7483610883565b9250828202610b8281610883565b91508282048414831517610b9957610b98610a18565b5b509291505056fea26469706673582212200f52e19e4063f9b58f485aca2cff48de44e7a331dd1fc36c0e594d2dd143750364736f6c63430008220033",
      "deploymentTx": "0xf25148803469119092d1164574bfb76dcc7515c348faf420eb46be45c526001d",
      "fundingTx": "0xff66cb4fc62b2d63ed0dd90e415c7ce8213667c7972749fab13141f0c8e189dc",
      "sourceVerification": "Verified Source"
    },
    {
      "id": "H2",
      "name": "Founder Permanent Lock",
      "type": "MDCPermanentLock",
      "address": "0x7bC7F3aDD58986b1C5B92714A0fB80C1b672fa0a",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "expectedLockedAmount": "1000000000000000000000000"
      },
      "runtimeHash": "0x1d34a4c44bea24eb87c67243a7f8547370b3577b2cadb17c66f81702997b0fb5",
      "runtime": "0x608060405234801561000f575f5ffd5b506004361061003f575f3560e01c80637b80889b1461004357806384e7137b14610061578063fc0c546a1461007f575b5f5ffd5b61004b61009d565b604051610058919061019b565b60405180910390f35b61006961013b565b604051610076919061019b565b60405180910390f35b61008761015f565b604051610094919061022e565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016100f79190610267565b602060405180830381865afa158015610112573d5f5f3e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061013691906102ae565b905090565b7f00000000000000000000000000000000000000000000d3c21bcecceda100000081565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b5f819050919050565b61019581610183565b82525050565b5f6020820190506101ae5f83018461018c565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f6101f66101f16101ec846101b4565b6101d3565b6101b4565b9050919050565b5f610207826101dc565b9050919050565b5f610218826101fd565b9050919050565b6102288161020e565b82525050565b5f6020820190506102415f83018461021f565b92915050565b5f610251826101b4565b9050919050565b61026181610247565b82525050565b5f60208201905061027a5f830184610258565b92915050565b5f5ffd5b61028d81610183565b8114610297575f5ffd5b50565b5f815190506102a881610284565b92915050565b5f602082840312156102c3576102c2610280565b5b5f6102d08482850161029a565b9150509291505056fea26469706673582212206c749e1c82998a2c3e9562f8253ca187e2ef689fd56626e682cc34428266ff1e64736f6c63430008220033",
      "deploymentTx": "0x9f048b3eb9bde12aeead001b058cd11fb3488ea6578c8049466f54b6171779c5",
      "fundingTx": "0x52ab507c2615157f7c833671000f9b188af238b77d282f5249999e68e17267bc",
      "sourceVerification": "Verified Source"
    },
    {
      "id": "H3",
      "name": "Security Vault",
      "type": "MDCFixedPeriodVault",
      "address": "0x825892BD3eA80Ff1d01b9D69EE58d07F98ABB369",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x024ed346AF0813435D398a0d46d968157ca5f373",
        "allocation": "5000000000000000000000000",
        "startTime": "1788720515",
        "interval": "2592000",
        "amountPerInterval": "10000000000000000000000"
      },
      "runtimeHash": "0xbf487d85307806b9113e749b38221bc79ee390f19db18ed758a940612fe22920",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e04ff152146101a4578063e33b7de3146101c2578063fbccedae146101e0578063fc0c546a146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb919061089b565b60405180910390f35b6100ee60048036038101906100e991906108e2565b6102ba565b005b6100f8610475565b604051610105919061094c565b60405180910390f35b610116610499565b604051610123919061089b565b60405180910390f35b6101346104bd565b604051610141919061089b565b60405180910390f35b6101526104e1565b60405161015f919061089b565b60405180910390f35b610170610505565b60405161017d919061089b565b60405180910390f35b61018e610566565b60405161019b919061089b565b60405180910390f35b6101ac610593565b6040516101b9919061089b565b60405180910390f35b6101ca6105b7565b6040516101d7919061089b565b60405180910390f35b6101e86105bc565b6040516101f5919061089b565b60405180910390f35b6102066105eb565b60405161021391906109c0565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610276919061094c565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109ed565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc6105bc565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d9190610a45565b925050819055506103ff7f000000000000000000000000024ed346af0813435d398a0d46d968157ca5f373847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f000000000000000000000000024ed346af0813435d398a0d46d968157ca5f37373ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a78565b60405180910390a2505050565b7f000000000000000000000000024ed346af0813435d398a0d46d968157ca5f37381565b7f000000000000000000000000000000000000000000000000000000006a9db58381565b7f0000000000000000000000000000000000000000000422ca8b0a00a42500000081565b7f0000000000000000000000000000000000000000000000000000000000278d0081565b5f5f61050f610662565b90507f0000000000000000000000000000000000000000000422ca8b0a00a425000000811061055e577f0000000000000000000000000000000000000000000422ca8b0a00a425000000610560565b805b91505090565b5f5f6105706105bc565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b7f00000000000000000000000000000000000000000000021e19e0c9bab240000081565b5f5481565b5f5f6105c6610505565b9050805f5410156105e3575f54816105de9190610a9f565b6105e5565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b61061c8383836001610821565b61065d57826040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610654919061094c565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006a9db583421015610693575f905061081e565b5f60017f0000000000000000000000000000000000000000000000000000000000278d007f000000000000000000000000000000000000000000000000000000006a9db583426106e39190610a9f565b6106ed9190610aff565b6106f79190610a45565b90505f7f00000000000000000000000000000000000000000000021e19e0c9bab24000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107469190610aff565b90505f7f00000000000000000000000000000000000000000000021e19e0c9bab24000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107959190610b2f565b90505f5f82146107a65760016107a8565b5f5b60ff16836107b69190610a45565b90508084106107eb577f0000000000000000000000000000000000000000000422ca8b0a00a42500000094505050505061081e565b7f00000000000000000000000000000000000000000000021e19e0c9bab2400000846108179190610b5f565b9450505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f51148316610875578383151615610869573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61089581610883565b82525050565b5f6020820190506108ae5f83018461088c565b92915050565b5f5ffd5b6108c181610883565b81146108cb575f5ffd5b50565b5f813590506108dc816108b8565b92915050565b5f602082840312156108f7576108f66108b4565b5b5f610904848285016108ce565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109368261090d565b9050919050565b6109468161092c565b82525050565b5f60208201905061095f5f83018461093d565b92915050565b5f819050919050565b5f61098861098361097e8461090d565b610965565b61090d565b9050919050565b5f6109998261096e565b9050919050565b5f6109aa8261098f565b9050919050565b6109ba816109a0565b82525050565b5f6020820190506109d35f8301846109b1565b92915050565b5f815190506109e7816108b8565b92915050565b5f60208284031215610a0257610a016108b4565b5b5f610a0f848285016109d9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a4f82610883565b9150610a5a83610883565b9250828201905080821115610a7257610a71610a18565b5b92915050565b5f604082019050610a8b5f83018561088c565b610a98602083018461088c565b9392505050565b5f610aa982610883565b9150610ab483610883565b9250828203905081811115610acc57610acb610a18565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610b0982610883565b9150610b1483610883565b925082610b2457610b23610ad2565b5b828204905092915050565b5f610b3982610883565b9150610b4483610883565b925082610b5457610b53610ad2565b5b828206905092915050565b5f610b6982610883565b9150610b7483610883565b9250828202610b8281610883565b91508282048414831517610b9957610b98610a18565b5b509291505056fea26469706673582212200f52e19e4063f9b58f485aca2cff48de44e7a331dd1fc36c0e594d2dd143750364736f6c63430008220033",
      "deploymentTx": "0x5191f67afb7552ff67cf5fd9005822ca74c95895004f4caf45a6e0b30740c057",
      "fundingTx": "0xc3a4e01b9fef58d66ecea3f1e64dff30f3c7ee4649f0a13c01c63012c454b422",
      "sourceVerification": "Similar Match / Verification pending re-verification"
    },
    {
      "id": "H4",
      "name": "Promotion Vault",
      "type": "MDCFixedPeriodVault",
      "address": "0x1380E0F1d9AeBA2Dc447Aaa1d3fbbE73Af9bd6ee",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x623d3B101c03c5C4B53Efed35D0731DD8Ebb0Ff2",
        "allocation": "1000000000000000000000000",
        "startTime": "1788720515",
        "interval": "2592000",
        "amountPerInterval": "1000000000000000000000"
      },
      "runtimeHash": "0xcc2942bb06f9447a21c1000af9548bc91d4e8c85002a0893e0be7004de2c5326",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e04ff152146101a4578063e33b7de3146101c2578063fbccedae146101e0578063fc0c546a146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb919061089b565b60405180910390f35b6100ee60048036038101906100e991906108e2565b6102ba565b005b6100f8610475565b604051610105919061094c565b60405180910390f35b610116610499565b604051610123919061089b565b60405180910390f35b6101346104bd565b604051610141919061089b565b60405180910390f35b6101526104e1565b60405161015f919061089b565b60405180910390f35b610170610505565b60405161017d919061089b565b60405180910390f35b61018e610566565b60405161019b919061089b565b60405180910390f35b6101ac610593565b6040516101b9919061089b565b60405180910390f35b6101ca6105b7565b6040516101d7919061089b565b60405180910390f35b6101e86105bc565b6040516101f5919061089b565b60405180910390f35b6102066105eb565b60405161021391906109c0565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610276919061094c565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109ed565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc6105bc565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d9190610a45565b925050819055506103ff7f000000000000000000000000623d3b101c03c5c4b53efed35d0731dd8ebb0ff2847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f000000000000000000000000623d3b101c03c5c4b53efed35d0731dd8ebb0ff273ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a78565b60405180910390a2505050565b7f000000000000000000000000623d3b101c03c5c4b53efed35d0731dd8ebb0ff281565b7f000000000000000000000000000000000000000000000000000000006a9db58381565b7f00000000000000000000000000000000000000000000d3c21bcecceda100000081565b7f0000000000000000000000000000000000000000000000000000000000278d0081565b5f5f61050f610662565b90507f00000000000000000000000000000000000000000000d3c21bcecceda1000000811061055e577f00000000000000000000000000000000000000000000d3c21bcecceda1000000610560565b805b91505090565b5f5f6105706105bc565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b7f00000000000000000000000000000000000000000000003635c9adc5dea0000081565b5f5481565b5f5f6105c6610505565b9050805f5410156105e3575f54816105de9190610a9f565b6105e5565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b61061c8383836001610821565b61065d57826040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610654919061094c565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006a9db583421015610693575f905061081e565b5f60017f0000000000000000000000000000000000000000000000000000000000278d007f000000000000000000000000000000000000000000000000000000006a9db583426106e39190610a9f565b6106ed9190610aff565b6106f79190610a45565b90505f7f00000000000000000000000000000000000000000000003635c9adc5dea000007f00000000000000000000000000000000000000000000d3c21bcecceda10000006107469190610aff565b90505f7f00000000000000000000000000000000000000000000003635c9adc5dea000007f00000000000000000000000000000000000000000000d3c21bcecceda10000006107959190610b2f565b90505f5f82146107a65760016107a8565b5f5b60ff16836107b69190610a45565b90508084106107eb577f00000000000000000000000000000000000000000000d3c21bcecceda100000094505050505061081e565b7f00000000000000000000000000000000000000000000003635c9adc5dea00000846108179190610b5f565b9450505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f51148316610875578383151615610869573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61089581610883565b82525050565b5f6020820190506108ae5f83018461088c565b92915050565b5f5ffd5b6108c181610883565b81146108cb575f5ffd5b50565b5f813590506108dc816108b8565b92915050565b5f602082840312156108f7576108f66108b4565b5b5f610904848285016108ce565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109368261090d565b9050919050565b6109468161092c565b82525050565b5f60208201905061095f5f83018461093d565b92915050565b5f819050919050565b5f61098861098361097e8461090d565b610965565b61090d565b9050919050565b5f6109998261096e565b9050919050565b5f6109aa8261098f565b9050919050565b6109ba816109a0565b82525050565b5f6020820190506109d35f8301846109b1565b92915050565b5f815190506109e7816108b8565b92915050565b5f60208284031215610a0257610a016108b4565b5b5f610a0f848285016109d9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a4f82610883565b9150610a5a83610883565b9250828201905080821115610a7257610a71610a18565b5b92915050565b5f604082019050610a8b5f83018561088c565b610a98602083018461088c565b9392505050565b5f610aa982610883565b9150610ab483610883565b9250828203905081811115610acc57610acb610a18565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610b0982610883565b9150610b1483610883565b925082610b2457610b23610ad2565b5b828204905092915050565b5f610b3982610883565b9150610b4483610883565b925082610b5457610b53610ad2565b5b828206905092915050565b5f610b6982610883565b9150610b7483610883565b9250828202610b8281610883565b91508282048414831517610b9957610b98610a18565b5b509291505056fea26469706673582212200f52e19e4063f9b58f485aca2cff48de44e7a331dd1fc36c0e594d2dd143750364736f6c63430008220033",
      "deploymentTx": "0xcbbfeff20e872300de94dc85cf104517aec413a106c20ab6cc4c228607d9243d",
      "fundingTx": "0xad2920fd485ef185754abc49837ad0389fbe14fb05fbbfd85ff689c273454e26",
      "sourceVerification": "Similar Match / Verification pending re-verification"
    },
    {
      "id": "H5",
      "name": "Development Vault",
      "type": "MDCFixedPeriodVault",
      "address": "0x18249ABC9bd22848a096168493b2acf88Bf7aEaE",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x71C082Ac52ABc1bE00A302b8976FB4A9bcF6A093",
        "allocation": "5000000000000000000000000",
        "startTime": "1788720515",
        "interval": "2592000",
        "amountPerInterval": "10000000000000000000000"
      },
      "runtimeHash": "0x2ddc5ec5087d995562070b428a8a0c54620bf99ab658cd951bbb98914e113163",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e04ff152146101a4578063e33b7de3146101c2578063fbccedae146101e0578063fc0c546a146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb919061089b565b60405180910390f35b6100ee60048036038101906100e991906108e2565b6102ba565b005b6100f8610475565b604051610105919061094c565b60405180910390f35b610116610499565b604051610123919061089b565b60405180910390f35b6101346104bd565b604051610141919061089b565b60405180910390f35b6101526104e1565b60405161015f919061089b565b60405180910390f35b610170610505565b60405161017d919061089b565b60405180910390f35b61018e610566565b60405161019b919061089b565b60405180910390f35b6101ac610593565b6040516101b9919061089b565b60405180910390f35b6101ca6105b7565b6040516101d7919061089b565b60405180910390f35b6101e86105bc565b6040516101f5919061089b565b60405180910390f35b6102066105eb565b60405161021391906109c0565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610276919061094c565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109ed565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc6105bc565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d9190610a45565b925050819055506103ff7f00000000000000000000000071c082ac52abc1be00a302b8976fb4a9bcf6a093847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f00000000000000000000000071c082ac52abc1be00a302b8976fb4a9bcf6a09373ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a78565b60405180910390a2505050565b7f00000000000000000000000071c082ac52abc1be00a302b8976fb4a9bcf6a09381565b7f000000000000000000000000000000000000000000000000000000006a9db58381565b7f0000000000000000000000000000000000000000000422ca8b0a00a42500000081565b7f0000000000000000000000000000000000000000000000000000000000278d0081565b5f5f61050f610662565b90507f0000000000000000000000000000000000000000000422ca8b0a00a425000000811061055e577f0000000000000000000000000000000000000000000422ca8b0a00a425000000610560565b805b91505090565b5f5f6105706105bc565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b7f00000000000000000000000000000000000000000000021e19e0c9bab240000081565b5f5481565b5f5f6105c6610505565b9050805f5410156105e3575f54816105de9190610a9f565b6105e5565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b61061c8383836001610821565b61065d57826040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610654919061094c565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006a9db583421015610693575f905061081e565b5f60017f0000000000000000000000000000000000000000000000000000000000278d007f000000000000000000000000000000000000000000000000000000006a9db583426106e39190610a9f565b6106ed9190610aff565b6106f79190610a45565b90505f7f00000000000000000000000000000000000000000000021e19e0c9bab24000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107469190610aff565b90505f7f00000000000000000000000000000000000000000000021e19e0c9bab24000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107959190610b2f565b90505f5f82146107a65760016107a8565b5f5b60ff16836107b69190610a45565b90508084106107eb577f0000000000000000000000000000000000000000000422ca8b0a00a42500000094505050505061081e565b7f00000000000000000000000000000000000000000000021e19e0c9bab2400000846108179190610b5f565b9450505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f51148316610875578383151615610869573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61089581610883565b82525050565b5f6020820190506108ae5f83018461088c565b92915050565b5f5ffd5b6108c181610883565b81146108cb575f5ffd5b50565b5f813590506108dc816108b8565b92915050565b5f602082840312156108f7576108f66108b4565b5b5f610904848285016108ce565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109368261090d565b9050919050565b6109468161092c565b82525050565b5f60208201905061095f5f83018461093d565b92915050565b5f819050919050565b5f61098861098361097e8461090d565b610965565b61090d565b9050919050565b5f6109998261096e565b9050919050565b5f6109aa8261098f565b9050919050565b6109ba816109a0565b82525050565b5f6020820190506109d35f8301846109b1565b92915050565b5f815190506109e7816108b8565b92915050565b5f60208284031215610a0257610a016108b4565b5b5f610a0f848285016109d9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a4f82610883565b9150610a5a83610883565b9250828201905080821115610a7257610a71610a18565b5b92915050565b5f604082019050610a8b5f83018561088c565b610a98602083018461088c565b9392505050565b5f610aa982610883565b9150610ab483610883565b9250828203905081811115610acc57610acb610a18565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610b0982610883565b9150610b1483610883565b925082610b2457610b23610ad2565b5b828204905092915050565b5f610b3982610883565b9150610b4483610883565b925082610b5457610b53610ad2565b5b828206905092915050565b5f610b6982610883565b9150610b7483610883565b9250828202610b8281610883565b91508282048414831517610b9957610b98610a18565b5b509291505056fea26469706673582212200f52e19e4063f9b58f485aca2cff48de44e7a331dd1fc36c0e594d2dd143750364736f6c63430008220033",
      "deploymentTx": "0xe41345a6b6ffaa2d7a7ee5a0dac8a27a9786ed4b88dbb6bd2dde25024019084f",
      "fundingTx": "0x41adab2208cbca6e07dc7feb1b71144378462dec4639ba7878f46d4f34f79a08",
      "sourceVerification": "Similar Match / Verification pending re-verification"
    },
    {
      "id": "H6",
      "name": "Team Vault",
      "type": "MDCFixedPeriodVault",
      "address": "0x95181C13E57A46Ab674B4a31E658a5c466D0810e",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x18D23a56A3deae5c857e9Cc1AA8428DEF74dc6C0",
        "allocation": "5000000000000000000000000",
        "startTime": "1819824515",
        "interval": "15552000",
        "amountPerInterval": "500000000000000000000000"
      },
      "runtimeHash": "0x73de4c47447a3d777bc99484f9a2446da8175b64869fdb4a896d7544ef3ba0dc",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e04ff152146101a4578063e33b7de3146101c2578063fbccedae146101e0578063fc0c546a146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb919061089b565b60405180910390f35b6100ee60048036038101906100e991906108e2565b6102ba565b005b6100f8610475565b604051610105919061094c565b60405180910390f35b610116610499565b604051610123919061089b565b60405180910390f35b6101346104bd565b604051610141919061089b565b60405180910390f35b6101526104e1565b60405161015f919061089b565b60405180910390f35b610170610505565b60405161017d919061089b565b60405180910390f35b61018e610566565b60405161019b919061089b565b60405180910390f35b6101ac610593565b6040516101b9919061089b565b60405180910390f35b6101ca6105b7565b6040516101d7919061089b565b60405180910390f35b6101e86105bc565b6040516101f5919061089b565b60405180910390f35b6102066105eb565b60405161021391906109c0565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610276919061094c565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109ed565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc6105bc565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d9190610a45565b925050819055506103ff7f00000000000000000000000018d23a56a3deae5c857e9cc1aa8428def74dc6c0847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f00000000000000000000000018d23a56a3deae5c857e9cc1aa8428def74dc6c073ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a78565b60405180910390a2505050565b7f00000000000000000000000018d23a56a3deae5c857e9cc1aa8428def74dc6c081565b7f000000000000000000000000000000000000000000000000000000006c78518381565b7f0000000000000000000000000000000000000000000422ca8b0a00a42500000081565b7f0000000000000000000000000000000000000000000000000000000000ed4e0081565b5f5f61050f610662565b90507f0000000000000000000000000000000000000000000422ca8b0a00a425000000811061055e577f0000000000000000000000000000000000000000000422ca8b0a00a425000000610560565b805b91505090565b5f5f6105706105bc565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b7f0000000000000000000000000000000000000000000069e10de76676d080000081565b5f5481565b5f5f6105c6610505565b9050805f5410156105e3575f54816105de9190610a9f565b6105e5565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b61061c8383836001610821565b61065d57826040517f5274afe7000000000000000000000000000000000000000000000000000000008152600401610654919061094c565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006c785183421015610693575f905061081e565b5f60017f0000000000000000000000000000000000000000000000000000000000ed4e007f000000000000000000000000000000000000000000000000000000006c785183426106e39190610a9f565b6106ed9190610aff565b6106f79190610a45565b90505f7f0000000000000000000000000000000000000000000069e10de76676d08000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107469190610aff565b90505f7f0000000000000000000000000000000000000000000069e10de76676d08000007f0000000000000000000000000000000000000000000422ca8b0a00a4250000006107959190610b2f565b90505f5f82146107a65760016107a8565b5f5b60ff16836107b69190610a45565b90508084106107eb577f0000000000000000000000000000000000000000000422ca8b0a00a42500000094505050505061081e565b7f0000000000000000000000000000000000000000000069e10de76676d0800000846108179190610b5f565b9450505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f51148316610875578383151615610869573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61089581610883565b82525050565b5f6020820190506108ae5f83018461088c565b92915050565b5f5ffd5b6108c181610883565b81146108cb575f5ffd5b50565b5f813590506108dc816108b8565b92915050565b5f602082840312156108f7576108f66108b4565b5b5f610904848285016108ce565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109368261090d565b9050919050565b6109468161092c565b82525050565b5f60208201905061095f5f83018461093d565b92915050565b5f819050919050565b5f61098861098361097e8461090d565b610965565b61090d565b9050919050565b5f6109998261096e565b9050919050565b5f6109aa8261098f565b9050919050565b6109ba816109a0565b82525050565b5f6020820190506109d35f8301846109b1565b92915050565b5f815190506109e7816108b8565b92915050565b5f60208284031215610a0257610a016108b4565b5b5f610a0f848285016109d9565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a4f82610883565b9150610a5a83610883565b9250828201905080821115610a7257610a71610a18565b5b92915050565b5f604082019050610a8b5f83018561088c565b610a98602083018461088c565b9392505050565b5f610aa982610883565b9150610ab483610883565b9250828203905081811115610acc57610acb610a18565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610b0982610883565b9150610b1483610883565b925082610b2457610b23610ad2565b5b828204905092915050565b5f610b3982610883565b9150610b4483610883565b925082610b5457610b53610ad2565b5b828206905092915050565b5f610b6982610883565b9150610b7483610883565b9250828202610b8281610883565b91508282048414831517610b9957610b98610a18565b5b509291505056fea26469706673582212200f52e19e4063f9b58f485aca2cff48de44e7a331dd1fc36c0e594d2dd143750364736f6c63430008220033",
      "deploymentTx": "0xb28b470b914c47262ee594702460a637562aa0d96ad6269e0eb3232205893481",
      "fundingTx": "0x68a4f0adc603c49635e2fbcc6084a7d1372779a2a64e0773d7e4c61b574629e9",
      "sourceVerification": "Similar Match / Verification pending re-verification"
    },
    {
      "id": "H7",
      "name": "Remaining Liquidity Reserve Vault",
      "type": "MDCLiquidityReserveVault",
      "address": "0xBc8b60A131c112258e26b6D4adb82bDa80D19849",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x8E991f30F532242335917C4dD6AE85a8f33daec1",
        "allocation": "8500000000000000000000000",
        "batch2Time": "1804272515",
        "batch2Amount": "5000000000000000000000000",
        "batch3Time": "1819824515",
        "batch3Amount": "3500000000000000000000000"
      },
      "runtimeHash": "0x653792035a07924d6f5b7f023afa264820e142d93ef6c9b7f7e0cd5552658907",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100cd575f3560e01c806388a17bde1161008a578063e33b7de311610064578063e33b7de3146101dd578063f7032f1a146101fb578063fbccedae14610219578063fc0c546a14610237576100cd565b806388a17bde146101835780639b2a31e7146101a1578063dfc494dd146101bf576100cd565b806306f0dd6e146100d15780630bf6cc08146100ef5780630f40abe91461010d57806334c6afe21461012b57806337bdc99b1461014957806361d027b314610165575b5f5ffd5b6100d9610255565b6040516100e691906107e1565b60405180910390f35b6100f7610279565b60405161010491906107e1565b60405180910390f35b610115610317565b60405161012291906107e1565b60405180910390f35b61013361033b565b60405161014091906107e1565b60405180910390f35b610163600480360381019061015e9190610828565b61035f565b005b61016d61051a565b60405161017a9190610892565b60405180910390f35b61018b61053e565b60405161019891906107e1565b60405180910390f35b6101a9610562565b6040516101b691906107e1565b60405180910390f35b6101c76105c3565b6040516101d491906107e1565b60405180910390f35b6101e56105f0565b6040516101f291906107e1565b60405180910390f35b6102036105f5565b60405161021091906107e1565b60405180910390f35b610221610619565b60405161022e91906107e1565b60405180910390f35b61023f610648565b60405161024c9190610906565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000006b8b038381565b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016102d39190610892565b602060405180830381865afa1580156102ee573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103129190610933565b905090565b7f0000000000000000000000000000000000000000000422ca8b0a00a42500000081565b7f000000000000000000000000000000000000000000000000000000006c78518381565b5f8103610398576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6103a1610619565b9050808211156103dd576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6103e6610279565b905080831115610422576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f828254610432919061098b565b925050819055506104a47f0000000000000000000000008e991f30f532242335917c4dd6ae85a8f33daec1847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661066c9092919063ffffffff16565b7f0000000000000000000000008e991f30f532242335917c4dd6ae85a8f33daec173ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f5460405161050d9291906109be565b60405180910390a2505050565b7f0000000000000000000000008e991f30f532242335917c4dd6ae85a8f33daec181565b7f0000000000000000000000000000000000000000000707f1ec5dcde3d880000081565b5f5f61056c6106bf565b90507f0000000000000000000000000000000000000000000707f1ec5dcde3d880000081106105bb577f0000000000000000000000000000000000000000000707f1ec5dcde3d88000006105bd565b805b91505090565b5f5f6105cd610619565b90505f6105d8610279565b90508082106105e757806105e9565b815b9250505090565b5f5481565b7f00000000000000000000000000000000000000000002e5276153cd3fb380000081565b5f5f610623610562565b9050805f541015610640575f548161063b91906109e5565b610642565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b6106798383836001610767565b6106ba57826040517f5274afe70000000000000000000000000000000000000000000000000000000081526004016106b19190610892565b60405180910390fd5b505050565b5f7f000000000000000000000000000000000000000000000000000000006b8b03834210156106f0575f9050610764565b7f000000000000000000000000000000000000000000000000000000006c785183421015610740577f0000000000000000000000000000000000000000000422ca8b0a00a4250000009050610764565b7f0000000000000000000000000000000000000000000707f1ec5dcde3d880000090505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f511483166107bb5783831516156107af573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b6107db816107c9565b82525050565b5f6020820190506107f45f8301846107d2565b92915050565b5f5ffd5b610807816107c9565b8114610811575f5ffd5b50565b5f81359050610822816107fe565b92915050565b5f6020828403121561083d5761083c6107fa565b5b5f61084a84828501610814565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61087c82610853565b9050919050565b61088c81610872565b82525050565b5f6020820190506108a55f830184610883565b92915050565b5f819050919050565b5f6108ce6108c96108c484610853565b6108ab565b610853565b9050919050565b5f6108df826108b4565b9050919050565b5f6108f0826108d5565b9050919050565b610900816108e6565b82525050565b5f6020820190506109195f8301846108f7565b92915050565b5f8151905061092d816107fe565b92915050565b5f60208284031215610948576109476107fa565b5b5f6109558482850161091f565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610995826107c9565b91506109a0836107c9565b92508282019050808211156109b8576109b761095e565b5b92915050565b5f6040820190506109d15f8301856107d2565b6109de60208301846107d2565b9392505050565b5f6109ef826107c9565b91506109fa836107c9565b9250828203905081811115610a1257610a1161095e565b5b9291505056fea26469706673582212206cbb9e66731bcb22433c85daf6b8944276a051ba9c7196a3ae15b51c932d718564736f6c63430008220033",
      "deploymentTx": "0x8d803a07187fa1554017e7149c8e93ce12fb585e92f341f40a2784b49a3537f9",
      "fundingTx": "0x9856a7ce2f0832dda6ecd62c50fbdf8bb104373c1518e3b7985634d79935f5fb",
      "sourceVerification": "Verified Source"
    },
    {
      "id": "H8",
      "name": "Ecosystem Part I Vault",
      "type": "MDCEcosystemPartIVault",
      "address": "0x936e059C7Ea9f29FE7D6D0bAeb586CCafCb48bba",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0x0DAe5650cb05FFeCe7C5cE30ed39Fb6D82b21a46",
        "allocation": "9750000000000000000000000",
        "startTime": "1882032515",
        "interval": "31104000",
        "initialAmount": "750000000000000000000000",
        "stepAmount": "50000000000000000000000",
        "periodCount": "10"
      },
      "runtimeHash": "0x739e1a15d391f703703bf3b5dd238a8a077f57e82d6e09863370a9df5279e391",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100e8575f3560e01c8063947a36fb1161008a578063e33b7de311610064578063e33b7de314610216578063fbccedae14610234578063fc0c546a14610252578063fc1ed43714610270576100e8565b8063947a36fb146101bc5780639b2a31e7146101da578063dfc494dd146101f8576100e8565b806361d027b3116100c657806361d027b31461014457806378e97925146101625780637f1975191461018057806388a17bde1461019e576100e8565b80630bf6cc08146100ec5780631989488b1461010a57806337bdc99b14610128575b5f5ffd5b6100f461028e565b6040516101019190610954565b60405180910390f35b61011261032c565b60405161011f9190610954565b60405180910390f35b610142600480360381019061013d919061099b565b610350565b005b61014c61050b565b6040516101599190610a05565b60405180910390f35b61016a61052f565b6040516101779190610954565b60405180910390f35b610188610553565b6040516101959190610954565b60405180910390f35b6101a6610577565b6040516101b39190610954565b60405180910390f35b6101c461059b565b6040516101d19190610954565b60405180910390f35b6101e26105bf565b6040516101ef9190610954565b60405180910390f35b610200610620565b60405161020d9190610954565b60405180910390f35b61021e61064d565b60405161022b9190610954565b60405180910390f35b61023c610652565b6040516102499190610954565b60405180910390f35b61025a610681565b6040516102679190610a79565b60405180910390f35b6102786106a5565b6040516102859190610954565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016102e89190610a05565b602060405180830381865afa158015610303573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103279190610aa6565b905090565b7f000000000000000000000000000000000000000000000a968163f0a57b40000081565b5f8103610389576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f610392610652565b9050808211156103ce576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6103d761028e565b905080831115610413576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f8282546104239190610afe565b925050819055506104957f0000000000000000000000000dae5650cb05ffece7c5ce30ed39fb6d82b21a46847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166106c99092919063ffffffff16565b7f0000000000000000000000000dae5650cb05ffece7c5ce30ed39fb6d82b21a4673ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f546040516104fe929190610b31565b60405180910390a2505050565b7f0000000000000000000000000dae5650cb05ffece7c5ce30ed39fb6d82b21a4681565b7f00000000000000000000000000000000000000000000000000000000702d898381565b7f000000000000000000000000000000000000000000000000000000000000000a81565b7f0000000000000000000000000000000000000000000810a48f204e0ce1c0000081565b7f0000000000000000000000000000000000000000000000000000000001da9c0081565b5f5f6105c961071c565b90507f0000000000000000000000000000000000000000000810a48f204e0ce1c000008110610618577f0000000000000000000000000000000000000000000810a48f204e0ce1c0000061061a565b805b91505090565b5f5f61062a610652565b90505f61063561028e565b90508082106106445780610646565b815b9250505090565b5f5481565b5f5f61065c6105bf565b9050805f541015610679575f54816106749190610b58565b61067b565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b7f000000000000000000000000000000000000000000009ed194db19b238c0000081565b6106d68383836001610855565b61071757826040517f5274afe700000000000000000000000000000000000000000000000000000000815260040161070e9190610a05565b60405180910390fd5b505050565b5f7f00000000000000000000000000000000000000000000000000000000702d898342101561074d575f9050610852565b5f60017f0000000000000000000000000000000000000000000000000000000001da9c007f00000000000000000000000000000000000000000000000000000000702d89834261079d9190610b58565b6107a79190610bb8565b6107b19190610afe565b90507f000000000000000000000000000000000000000000000000000000000000000a8110610803577f0000000000000000000000000000000000000000000810a48f204e0ce1c00000915050610852565b61084e817f000000000000000000000000000000000000000000009ed194db19b238c000007f000000000000000000000000000000000000000000000a968163f0a57b4000006108b7565b9150505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f511483166108a957838315161561089d573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f5f8490505f836001876108cb9190610b58565b6108d59190610be8565b8560026108e29190610be8565b6108ec9190610afe565b90505f6002836108fc9190610c29565b036109155760028261090e9190610bb8565b9150610925565b6002816109229190610bb8565b90505b80826109319190610be8565b925050509392505050565b5f819050919050565b61094e8161093c565b82525050565b5f6020820190506109675f830184610945565b92915050565b5f5ffd5b61097a8161093c565b8114610984575f5ffd5b50565b5f8135905061099581610971565b92915050565b5f602082840312156109b0576109af61096d565b5b5f6109bd84828501610987565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109ef826109c6565b9050919050565b6109ff816109e5565b82525050565b5f602082019050610a185f8301846109f6565b92915050565b5f819050919050565b5f610a41610a3c610a37846109c6565b610a1e565b6109c6565b9050919050565b5f610a5282610a27565b9050919050565b5f610a6382610a48565b9050919050565b610a7381610a59565b82525050565b5f602082019050610a8c5f830184610a6a565b92915050565b5f81519050610aa081610971565b92915050565b5f60208284031215610abb57610aba61096d565b5b5f610ac884828501610a92565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610b088261093c565b9150610b138361093c565b9250828201905080821115610b2b57610b2a610ad1565b5b92915050565b5f604082019050610b445f830185610945565b610b516020830184610945565b9392505050565b5f610b628261093c565b9150610b6d8361093c565b9250828203905081811115610b8557610b84610ad1565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610bc28261093c565b9150610bcd8361093c565b925082610bdd57610bdc610b8b565b5b828204905092915050565b5f610bf28261093c565b9150610bfd8361093c565b9250828202610c0b8161093c565b91508282048414831517610c2257610c21610ad1565b5b5092915050565b5f610c338261093c565b9150610c3e8361093c565b925082610c4e57610c4d610b8b565b5b82820690509291505056fea264697066735822122073dc3f669d80d21e7c013a00d27db3c5a52b0c6ccfe570a2d125876b60ef29d664736f6c63430008220033",
      "deploymentTx": "0x0b8636a7a5461aa41925505b08bfafe781ec2f271f5539e3e1d3594036ff9ebd",
      "fundingTx": "0x4a9e49105e130b4b208c1493b37a6cfa5448b785adf6ba6f5c3d887ffba87e5a",
      "sourceVerification": "Verified Source"
    },
    {
      "id": "H9",
      "name": "Ecosystem Part II Vault",
      "type": "MDCEcosystemPartIIVault",
      "address": "0xC0e6F4cFD517c36Bd3ADA025e63cf4B9ADE6670a",
      "expected": {
        "token": "0xd6b160672Fad1376943F1E6d60C41adb103aED33",
        "treasury": "0xd3C8A2A1efc06964E255250460548853ED9bcf3d",
        "allocation": "9750000000000000000000000",
        "startTime": "2037552515",
        "interval": "124416000",
        "initialAmount": "4875000000000000000000000"
      },
      "runtimeHash": "0xa6a44e9779325b19c060ae6f7c5c78653ec77e6b17d8911ed97012e66cb7f474",
      "runtime": "0x608060405234801561000f575f5ffd5b50600436106100b2575f3560e01c80639b2a31e71161006f5780639b2a31e714610168578063dfc494dd14610186578063e33b7de3146101a4578063fbccedae146101c2578063fc0c546a146101e0578063fc1ed437146101fe576100b2565b80630bf6cc08146100b657806337bdc99b146100d457806361d027b3146100f057806378e979251461010e57806388a17bde1461012c578063947a36fb1461014a575b5f5ffd5b6100be61021c565b6040516100cb9190610855565b60405180910390f35b6100ee60048036038101906100e9919061089c565b6102ba565b005b6100f8610475565b6040516101059190610906565b60405180910390f35b610116610499565b6040516101239190610855565b60405180910390f35b6101346104bd565b6040516101419190610855565b60405180910390f35b6101526104e1565b60405161015f9190610855565b60405180910390f35b610170610505565b60405161017d9190610855565b60405180910390f35b61018e610566565b60405161019b9190610855565b60405180910390f35b6101ac610593565b6040516101b99190610855565b60405180910390f35b6101ca610598565b6040516101d79190610855565b60405180910390f35b6101e86105c7565b6040516101f5919061097a565b60405180910390f35b6102066105eb565b6040516102139190610855565b60405180910390f35b5f7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016102769190610906565b602060405180830381865afa158015610291573d5f5f3e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102b591906109a7565b905090565b5f81036102f3576040517fdd5bc4e500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f6102fc610598565b905080821115610338576040517fdcd0b2e700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f61034161021c565b90508083111561037d576040517f14ecd6c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b825f5f82825461038d91906109ff565b925050819055506103ff7f000000000000000000000000d3c8a2a1efc06964e255250460548853ed9bcf3d847f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3373ffffffffffffffffffffffffffffffffffffffff1661060f9092919063ffffffff16565b7f000000000000000000000000d3c8a2a1efc06964e255250460548853ed9bcf3d73ffffffffffffffffffffffffffffffffffffffff167f46c63c18e28ef8669399cfae91e1db142c629cffca556533f24944c2917400c6845f54604051610468929190610a32565b60405180910390a2505050565b7f000000000000000000000000d3c8a2a1efc06964e255250460548853ed9bcf3d81565b7f000000000000000000000000000000000000000000000000000000007972958381565b7f0000000000000000000000000000000000000000000810a48f204e0ce1c0000081565b7f00000000000000000000000000000000000000000000000000000000076a700081565b5f5f61050f610662565b90507f0000000000000000000000000000000000000000000810a48f204e0ce1c00000811061055e577f0000000000000000000000000000000000000000000810a48f204e0ce1c00000610560565b805b91505090565b5f5f610570610598565b90505f61057b61021c565b905080821061058a578061058c565b815b9250505090565b5f5481565b5f5f6105a2610505565b9050805f5410156105bf575f54816105ba9190610a59565b6105c1565b5f5b91505090565b7f000000000000000000000000d6b160672fad1376943f1e6d60c41adb103aed3381565b7f0000000000000000000000000000000000000000000408524790270670e0000081565b61061c83838360016107db565b61065d57826040517f5274afe70000000000000000000000000000000000000000000000000000000081526004016106549190610906565b60405180910390fd5b505050565b5f7f0000000000000000000000000000000000000000000000000000000079729583421015610693575f90506107d8565b5f60017f00000000000000000000000000000000000000000000000000000000076a70007f0000000000000000000000000000000000000000000000000000000079729583426106e39190610a59565b6106ed9190610ab9565b6106f791906109ff565b90506101008111156107095761010090505b5f7f0000000000000000000000000000000000000000000408524790270670e0000090505f5f5b838110801561073f57505f8314155b156107d057817f0000000000000000000000000000000000000000000810a48f204e0ce1c000006107709190610a59565b83106107a2577f0000000000000000000000000000000000000000000810a48f204e0ce1c000009450505050506107d8565b82826107ae91906109ff565b91506002836107bd9190610ab9565b9250806107c990610ae9565b9050610730565b508093505050505b90565b5f5f63a9059cbb60e01b9050604051815f525f1960601c86166004528460245260205f60445f5f8b5af1925060015f5114831661082f578383151615610823573d5f823e3d81fd5b5f873b113d1516831692505b806040525050949350505050565b5f819050919050565b61084f8161083d565b82525050565b5f6020820190506108685f830184610846565b92915050565b5f5ffd5b61087b8161083d565b8114610885575f5ffd5b50565b5f8135905061089681610872565b92915050565b5f602082840312156108b1576108b061086e565b5b5f6108be84828501610888565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6108f0826108c7565b9050919050565b610900816108e6565b82525050565b5f6020820190506109195f8301846108f7565b92915050565b5f819050919050565b5f61094261093d610938846108c7565b61091f565b6108c7565b9050919050565b5f61095382610928565b9050919050565b5f61096482610949565b9050919050565b6109748161095a565b82525050565b5f60208201905061098d5f83018461096b565b92915050565b5f815190506109a181610872565b92915050565b5f602082840312156109bc576109bb61086e565b5b5f6109c984828501610993565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610a098261083d565b9150610a148361083d565b9250828201905080821115610a2c57610a2b6109d2565b5b92915050565b5f604082019050610a455f830185610846565b610a526020830184610846565b9392505050565b5f610a638261083d565b9150610a6e8361083d565b9250828203905081811115610a8657610a856109d2565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610ac38261083d565b9150610ace8361083d565b925082610ade57610add610a8c565b5b828204905092915050565b5f610af38261083d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610b2557610b246109d2565b5b60018201905091905056fea26469706673582212203f69083f7ce54371a8fd83be83013e18f4344e06780aad9e43d4779e17f445f164736f6c63430008220033",
      "deploymentTx": "0x2128d2ef513b165575a96bf81d7a0de8c97657bb607301a96f24fff275c29860",
      "fundingTx": "0x26e1af74d362e07b0169c8ad2b00db8a7289c8caa3ec2f68c5e9ec8fc875ee9e",
      "sourceVerification": "Verified Source"
    }
  ]
};
function freeze(value) { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; }
export const CONFIG = freeze(data);
