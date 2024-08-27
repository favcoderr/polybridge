// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LekanToken is ERC721A, Ownable {
    constructor() Ownable(msg.sender) ERC721A("Lekan", "LKN") {}

    uint256 private limit = 5;
    string[] private descriptions = [
        "Car from the future driving on water",
        "Girl sitting on a hill overlooking the sky, stars planets jupiter",
        "Futuristic robot making coffee in a cafe",
        "Cute baby panda eating bamboo in the forest",
        "Night sky filled with spaceships and shooting stars, neon colors, drawing"
    ];
    mapping(uint256 => string) private _tokenURIs;

    function _baseURI() internal pure override returns (string memory) {
        return "QmZMcWPjGipqd4ij4LdRWZPmbGKYvW4vrAz4K6QQN9Ry45";
    }

    function mint(address reciever, uint256 quantity) external onlyOwner {
        require(reciever != address(0), "Invalid Address");
        require(totalSupply() < limit, "Maximum NFT Minted");
        _safeMint(reciever, quantity);
    }

    function prompt(uint256 tokenId) public view returns (string memory) {
        return descriptions[tokenId];
    }

       function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert("Token does not texis");

        string memory baseURI = _baseURI();
        string memory tokenIdStr = _toString(tokenId);
        string memory extension = ".png";
        return
            bytes(baseURI).length != 0
                ? string(abi.encodePacked(baseURI, "/", tokenIdStr, extension))
                : "";
    }
}
