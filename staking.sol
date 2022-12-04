// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/ERC20.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}




contract staking {

    address public EPNS_COMM_ADDRESS = 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;

    mapping(uint => uint) rewards;

    mapping(uint=>string[])  public likes;
   mapping(uint=> string[]) public dislikes;
   mapping(uint => bool) public isFake;
   mapping(uint => string) public articleAuthors;
   mapping(uint=>uint) public authorBalances;
   mapping(uint=>string[]) public winners;

   mapping(uint=>address[])  public push_likes;
   mapping(uint=> address[]) public push_dislikes;
    mapping(uint=>address[]) public push_winners;




   uint decimals = 1e9;


    // mapping(uint=>string[]) public winners;

    function post(uint articleId, string memory journalist) public {
       articleAuthors[articleId] = journalist;
   }
    

    function addLiker(uint256 articleId, string memory liker, address push_liker) public {
        likes[articleId].push(liker);
        if(push_liker != address(0))
        push_likes[articleId].push(push_liker);
    }

    function addDisliker(uint256 articleId, string memory disliker, address push_disliker) public {
        dislikes[articleId].push(disliker);
        if(push_disliker != address(0))
        push_dislikes[articleId].push(push_disliker);

    }

    function trigger(uint articleId) public returns (string[] memory) {

        uint noOfLikes = likes[articleId].length;
        uint noOfDisLikes = dislikes[articleId].length;

        bool likeWin = (noOfLikes >= noOfDisLikes)?true:false;


        if(likeWin) {
            
            uint reward;

            reward = noOfDisLikes*decimals/(noOfLikes*2);

            authorBalances[articleId] = reward*noOfLikes;

            rewards[articleId] = reward;

            winners[articleId] = likes[articleId];

            push_winners[articleId] = push_likes[articleId];

            uint n = push_winners[articleId].length;

            for(uint i = 0; i < n; ++i) {
                notify(push_winners[articleId][i]);
            }

            return likes[articleId];

        }
        else {
            isFake[articleId] = true;

            uint reward;

            reward = noOfLikes*decimals/(noOfDisLikes*2);

            authorBalances[articleId] = reward*noOfDisLikes;

            rewards[articleId] = reward;

            winners[articleId] = dislikes[articleId];

            push_winners[articleId] = push_dislikes[articleId];

            uint n = push_winners[articleId].length;

            for(uint i = 0; i < n; ++i) {
                notify(push_winners[articleId][i]);
            }

            return dislikes[articleId];   
                }

    }
    function getLikersByArticleId(uint articleId) public view returns (string[] memory) {
        return likes[articleId];
    }

    function getDisLikersByArticleId(uint articleId) public view returns (string[] memory) {
        return dislikes[articleId];
    }


    function getRewardByArticleId(uint articleId) public view returns (uint) {
        return rewards[articleId];
    }

     function getAuthorsByArticleId(uint articleId) public view returns (string memory) {
        return articleAuthors[articleId];
    }

     function getAuthorBalancesByArticleId(uint articleId) public view returns (uint) {
        return rewards[articleId];
    }
    function getWinnerssByArticleId(uint articleId) public view returns (string[] memory) {
        return winners[articleId];
    }


    function isThisArticleFake(uint articleId) public view returns (bool) {
        return isFake[articleId];
    }

    function getPushWinnersByArticleId(uint articleId) public view returns (address[] memory) {
        return push_winners[articleId];
    }

    function notify(address to) public returns (bool success){
                IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0x5c7Bd6B3d0debEc11F9e231a63e5720E25f56e0d, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
            to, // to recipient, put address(this) in case you want Broadcast or Subset. For Targetted put the address to which you want to send
            bytes(
                string(
                    // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                    abi.encodePacked(
                        "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                        "+", // segregator
                        "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                        "+", // segregator
                        "Congratulations!", // this is notificaiton title
                        "+", // segregator
                        "Please ", // notification body
                        // addressToString(msg.sender), // notification body
                        " claim ", // notification body
                        // uint2str(amount.div(10 ** uint(decimals()))), // notification body
                        " your reward from your zkBOB Account." // notification body
                    )
                )
            )
        );

        return true;
    }


}