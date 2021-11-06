// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import ERC721 iterface
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// NFTs smart contract inherits ERC721 interface
contract SimpleStorage is ERC721Enumerable{


    uint256 public totNFT;
    uint256 public totAuction;
   

    struct NFT {
        uint256 NFTID;
        string NFTName;
        uint256 NFTvalue;//唯一nft
        address Owner;
       
        bool onSale;
    }
    
    mapping(uint256 => address[]) public historyOwner;
    mapping(uint256 => uint256) public transNum;
    
    mapping(string => bool) public NFTNameExists;
    mapping(uint256 => bool) public NFTvalueExists;
    
    mapping(uint256 => NFT) public allNFTs;
    
    struct Auction {
        uint256 AuctionID;
        uint256 whichNFT;
        uint256 MinPrice;//起拍价格
        uint256 MaxPrice;//最高价
        address payable MaxBidder;//最高出价人
        uint endTime;//截止时间
        bool ended;//是否结束
        bool claimed;//认领状态
    }
    
    mapping(address => uint256[]) public attendAuctions;
    mapping(address => uint256) public attendNum;

    mapping(uint256 => Auction) public allAuctions;

    constructor() ERC721("NFT Collection", "NFT") {}
    
    function createNFT(string memory name, uint256 value)public {
        
        require(!NFTNameExists[name]);
        require(!NFTvalueExists[value]);
        totNFT++;
        _mint(msg.sender,totNFT);//分发NFT给客户
        NFTNameExists[name]=true;
        NFTvalueExists[value]=true;
        
        transNum[totNFT]++;
        historyOwner[totNFT].push(ownerOf(totNFT));
        
        NFT memory newNFT = NFT(
            totNFT,
            name,
            value,
            msg.sender,
            false
        );
        
        allNFTs[totNFT] = newNFT;

    }
    
    function allyourNFTs() public view returns(uint[] memory){
        uint balance = balanceOf(msg.sender);
        uint256[] memory ret = new uint[](balance+1);
        ret[0]=balance;
        for (uint i = 1; i <= balance; i++)
        {
            ret[i] = uint256(tokenOfOwnerByIndex(msg.sender, i));
        }
        return ret;
    }
    

    //开始拍卖，参数：NFTID，起始价格，截止时间
    function startAuction(uint256 _NFTId,uint256 minprice,uint256 _duration)public {
        uint endtime=block.timestamp+_duration;
        NFT memory item=allNFTs[_NFTId];
        item.onSale=true;
        totAuction++;
        Auction memory newAuction= Auction(
            totAuction,
            _NFTId,
            minprice,
            minprice,
            payable(msg.sender),
            endtime,
            false,
            false

        );
        
        allNFTs[_NFTId]=item;
        allAuctions[totAuction]=newAuction;
        return ;
    }

    //提高竞价  参数：拍卖id，出价人，新价格
    function biddingforNFT(uint256 _auctionid,uint256 _newprice)public {
        Auction memory thisauction=allAuctions[_auctionid];
        require(thisauction.MaxPrice<_newprice);
        thisauction.MaxPrice=_newprice;
        thisauction.MaxBidder=payable(msg.sender);
        allAuctions[_auctionid]=thisauction;
        attendAuctions[msg.sender].push(_auctionid);
        attendNum[msg.sender]++;
        return ;
        
    }

    //认领nft，参数 auctionid，
    function claimNFT(uint256 _auctionid) public payable{
 
        Auction memory claimedauction=allAuctions[_auctionid];
        require(!claimedauction.claimed);
        require(msg.sender == claimedauction.MaxBidder);
        claimedauction.claimed=true;
        allAuctions[_auctionid]=claimedauction;

        NFT memory thisNFT=allNFTs[claimedauction.whichNFT];
        
        address nftOwner=ownerOf(thisNFT.NFTID);
         _transfer(nftOwner, msg.sender, claimedauction.whichNFT);
        payable(nftOwner).transfer(msg.value);
        
        transNum[claimedauction.whichNFT]++;
        historyOwner[claimedauction.whichNFT].push(msg.sender);

        thisNFT.Owner=msg.sender;
        thisNFT.onSale=false;
        allNFTs[claimedauction.whichNFT]=thisNFT;
        return ;
    }
    

}