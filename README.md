
# Dynamic Post Page with OG Image Generation

## Objective

This project aims to create a static post page using React that dynamically generates an Open Graph (og:image) based on the post content.

## Installation and Setup

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Steps

1.  *Clone the repository*
    
    Copy code
    - `git clone <repository-url>`
    - `cd <repository-directory>` 
    
2.  *Setup the backend*
    
    -   Navigate to the backend directory:      
        `cd backend` 
    -   Install dependencies:
        `npm install `
    -   Create a .env file in the backend directory with the following content:
        `PORT=3000 `
    -   Start the backend server:
        `npm start `
3.  *Setup the frontend*
    
    -   Navigate to the frontend directory:
        `cd frontend `
    -   Install dependencies:
        `npm install `
    -   Start the React development server:
        `npm run dev `
        

### Running the Project

-   Open your browser and navigate to http://localhost:5173 to see the homepage with the list of posts.
-   Click on the post to navigate to its detailed view. The Open Graph image will be dynamically generated and included as a meta tag in the page's HTML.

## Project Flow

### 1. *Frontend (React)*

#### Structure

-   App.jsx: Sets up routing for the homepage and individual post pages.
-   HomePage.jsx: Displays a list of posts using PostCard components.
-   PostPage.jsx: Displays the full post and includes the Open Graph image meta tag.
-   PostCard.jsx: Represents individual post cards with title, description, and media.
-   PostData.jsx: Provides mock data for posts.

#### Components

-   App.jsx: Manages routing using react-router-dom.
-   HomePage.jsx: Fetches and displays posts.
-   PostCard.jsx: Displays a summary of the post with options to like, comment, and share.
-   PostPage.jsx: Fetches a single post's details and dynamically generates the Open Graph image URL.

### 2. *Backend (Node.js with Express)*

#### Structure

-   index.js: Main entry point for the backend.
-   Uses Puppeteer to generate screenshots of HTML content for the Open Graph image.

#### API Endpoints

-   /api/generate-image: Uses Puppeteer to create an Open Graph image from the HTML content.




## Explanation of the System

### OG Image Generation Process

1.  *Frontend*:
    -   The PostPage component fetches the details of the selected post.
    -   It generates a URL for the og:image by sending the post details to the backend.
2.  *Backend*:
    
    -   The /api/generate-image endpoint receives the post details.
    -   Puppeteer is used to render an HTML template with the post details and take a screenshot.
    -   The screenshot is saved as an image and its URL is returned to the frontend.

### Styling and Design

-   The post cards and pages are styled to provide a visually appealing layout.
-   The generated og:image includes the post's title, description, media, and other relevant information, styled to match the post's design.

## App Screenshots

### Homepage
![enter image description here](https://res.cloudinary.com/dhrbg2jbi/image/upload/fl_preserve_transparency/v1722958287/Screenshot_2024-08-06_205408_ixxzjr.jpg?_s=public-apps)
### Post Page
![enter image description here](https://res.cloudinary.com/dhrbg2jbi/image/upload/fl_preserve_transparency/v1722960126/Screenshot_2024-08-06_213109_kw0rko.jpg?_s=public-apps)
### Open Graph Image (`og:image`)
![enter image description here](https://res.cloudinary.com/dhrbg2jbi/image/upload/fl_preserve_transparency/v1722958457/og-image_gjuyey.jpg?_s=public-apps)
## Performance Optimization

-   The backend server uses Puppeteer for headless browser automation to generate images efficiently.
-   The frontend pre-fetches data to minimize loading times.


## Conclusion

This project showcases a powerful integration of React and Node.js with Puppeteer to dynamically craft stunning Open Graph images tailored to each post. By generating visually captivating images based on post content, the setup not only enhances the aesthetic appeal of posts but also ensures they stand out and shine when shared across social media platforms. This approach optimizes engagement and ensures a polished, professional appearance for every share.
