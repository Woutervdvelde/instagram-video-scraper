# Disclaimer

This repository has been forked from the original creator @riad-azz, for a personal project I needed more information than just the video URL.
The only thing that has been added are extra responses, instead of only returning the "videoUrl" the API will now also return the title, description, thumbnail and source url.
The source url contains the profile name and post ID.

# Instagram Video Scraper API

Scrape instagram videos with no login required using puppeteer and express.

## Description

This is a powerful Instagram video scraper built using Express.js and Puppeteer. It allows you to extract video URL's from Instagram posts/reels with ease. Whether you want to create a personal video collection or analyze content for research, this tool makes the process straightforward.

## Getting Started

Clone the repository

```bash
git clone https://github.com/Woutervdvelde/instagram-video-scraper.git
```

Install dependencies

```bash
cd instagram-video-scraper && npm install
```

Running the server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

- `GET /api/video?url={POST_URL}`: Scrapes the video URL of the specified Instagram Post/Reel URL.

## Examples

### Request Example

```javascript
const fetch = require('node-fetch');

const postUrl = 'https://www.instagram.com/p/{shortcode}/';
const apiUrl = `http://localhost:3000/api/video?url=${postUrl}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Handle the scraped data here
    mp4Url = data.videoUrl;
    console.log(mp4Url);
  })
  .catch(error => {
    console.error(error);
  });
```

### Response Example

```json
{
  "title": "title text...",
  "description": "10K likes, 47 coments - channel on June 17, 2024: Description...",
  "thumbnail": "https://scontent-ams2-1.cdninstagram.com/v/t51...jpg?...",
  "videoUrl": "https://scontent.cdninstagram.com/v/t50.2886-16/385047357_643...mp4?...",
  "source": "https://instagram.com/profile/p/C19ZXkXtMqD"
}
```

## License

This Instagram Video Scraper is licensed under the MIT License - see the LICENSE file for details.
