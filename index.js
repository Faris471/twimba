import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

/*
Challenge:
3. We could improve index.js by moving one line
   of code to a better position. Find it and move it!
*/

const tweetInput = document.getElementById('tweet-input')
const handleName = document.getElementById('handle-input')
const savedTweets = JSON.parse(localStorage.getItem("tweetsArray")) || []
if(savedTweets.length > 0){
    tweetsData.length = 0 
    tweetsData.push(...savedTweets)
    console.log(tweetsData)
}

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.id === 'reply-btn'){
        handleCommentClick(e.target.dataset.id)
    }
    else if(e.target.dataset.delete){
        handleTrashClick(e.target.dataset.delete)
    }
})

function handleTrashClick(tweetId){
    const index = tweetsData.findIndex(tweet => tweet.uuid === tweetId)
    tweetsData.splice(index, 1)
    render()
}

function handleCommentClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return `${tweet.uuid}` === tweetId
    })[0]

    const replyInput = document.querySelector(`[data-id="${targetTweetObj.uuid}"]`)

    if(replyInput.value&&handleName.value){
        let replyObj = {
                handle: handleName.value,
                profilePic: `images/scrimbalogo.png`,
                tweetText: replyInput.value,
            }
        targetTweetObj.replies.push(replyObj)
    }
    render()
}
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 
}

function handleReplyClick(replyId){
    const targetTweetObj = tweetsData.find(function(tweet){
        return `${tweet.uuid}` === replyId
    })
    targetTweetObj.commentsHidden = !targetTweetObj.commentsHidden
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
    

}

function handleTweetBtnClick(){

    if(tweetInput.value&&handleName.value){
        tweetsData.unshift({
            handle: handleName.value,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            commentsHidden: true,
            uuid: uuidv4()
        })
     render()
    tweetInput.value = ''
    }

}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHideClass = ''

        if (tweet.commentsHidden){
            repliesHideClass = "hidden"
        }
        

        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
        // try to change the hidden clase for the replies so we dont need the renderReplies() function  
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-trash" data-delete="${tweet.uuid}"></i>
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="${repliesHideClass}" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                    <div class="tweet-reply reply">
                        <img src="images/scrimbalogo.png" class="profile-pic">
                        <textarea placeholder="Post your reply."
                        id="reply-input"
                        data-id="${tweet.uuid}"
                        class="reply-input"></textarea>
                    </div>
                    <button id="reply-btn" 
                    class="reply-btn"
                    data-id="${tweet.uuid}">reply</button> 
                </div>   
            </div>
`
   })
   return feedHtml 
}

function render(){
    localStorage.setItem("tweetsArray",JSON.stringify(tweetsData))
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()