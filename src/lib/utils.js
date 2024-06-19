const cheerio = require('cheerio');
const { CustomError } = require('./errors');

const getPostId = (postUrl) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;
  let postId;

  if (!postUrl) {
    throw new CustomError("Post URL is required", 400);
  }

  const postCheck = postUrl.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = postUrl.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    throw new CustomError("Invalid URL, post ID not found", 400);
  }

  return postId;
};

function extractProfileFromDescription(description) {
  const pattern = /-\s+([^-\s]+)\s+on\s+/;
  const match = description.match(pattern);      
  return match ? match[1] : null;
}

const getVideoDetails = (html, postId) => {
  const $ = cheerio.load(html);

  // Check if this post exists
  const isNotFound = $('main > div > div > span').length > 0;
  if (isNotFound) {
    throw new CustomError("This post is private or does not exist", 404);
  }

  // Check if instagram redirected the page to a login page
  const isLoginPage = $('input[name="username"]').length > 0;
  if (isLoginPage) {
    throw new CustomError("Something went wrong, please try again", 500);
  }

  // Get video metadata
  const videoElement = $("video")
  if (!videoElement) {
    throw new CustomError("This post does not contain a video", 404);
  }

  const title = $('meta[property="og:title"]').attr('content')
  const description = $('meta[name="description"]').attr('content')
  const thumbnail = videoElement.parent().find("img").attr("src")
  const videoUrl = $("video").attr("src");
  const source = `https://instagram.com/${extractProfileFromDescription(description)}/p/${postId}`

  return { title, description, thumbnail, videoUrl, source };
}


module.exports = {
  getPostId,
  getVideoDetails
}