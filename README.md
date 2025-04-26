# 📽️ momovivie

A React app built with Vite, powered by TMDB API.

## 🔥 Live Preview

Check out the live demo:

👉 [momovivie.raufmazzidan.com](https://momovivie.raufmazzidan.com)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory and add the following:

```env
VITE_TMDB_TOKEN=your_tmdb_token
```

> **Note**: Get your TMDB API key [here](https://www.themoviedb.org/settings/api).

## 🏃 How to Run the App Locally

After installing dependencies and setting up environment variables, start the dev server:

```bash
npm run dev
```

the app will run on: [http://localhost:5173](http://localhost:5173)

## 🧪 Testing & Coverage

Run unit tests:

```bash
npm run test
```

Generate code coverage:

```bash
npm run coverage
```

> The coverage report will be available in the `/coverage` folder after running the command.

### ✅ Current Unit Test Score:

![momovivie coverage 26/04/25](/public/coverage.png)

## 🚀 Deploy to Vercel

Step-by-step:

1. Push your code to GitHub.
2. Go to Vercel, import your GitHub repo.
3. Set Environment Variables on Vercel (same as your .env file).
4. Set up vercel.json to handle React Router (SPA) refresh issue.

Create a vercel.json file at your project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Why?

> By default, when you refresh on a route like `/movies/123`, Vercel will try to find a matching file, which doesn't exist in a SPA. This `rewrites` rule tells Vercel to always serve `index.html`, and React Router will take care of routing.

## 🎥 TMDB API Usage

I use The Movie Database (TMDB) API to fetch movies.

### API List Movie Now Playing [[docs]](https://developer.themoviedb.org/reference/movie-now-playing-list)

> https://api.themoviedb.org/3/movie/now_playing

params:

```json
{
  "page": 1,
  "language": "en-US",
  "region": "id"
}
```

### API List Movie Popular [[docs]](https://developer.themoviedb.org/reference/movie-popular-list)

> https://api.themoviedb.org/3/movie/popular

params:

```json
{
  "page": 1,
  "language": "en-US",
  "region": "id"
}
```

### API List Indonesian Movie Popular Release on 2025 [[docs]](https://developer.themoviedb.org/reference/discover-movie)

> https://api.themoviedb.org/3/discover/movie

params:

```json
{
  "include_adult": true,
  "page": 1,
  "sort_by": "popularity.desc",
  "with_original_language": "id",
  "primary_release_year": 2025
}
```

### API Detail Movie [[docs]](https://developer.themoviedb.org/reference/movie-details)

> https://api.themoviedb.org/3/movie/[movieId]

params:

```json
{
  "language": "en-US",
  "region": "ID"
}
```

### API List Search [[docs]](https://developer.themoviedb.org/reference/search-movie)

> https://api.themoviedb.org/3/search/movie

params:

```json
{
  "include_adult": false,
  "page": 1,
  "query": "jumbo",
  "language": "en-US"
}
```

### API List Recommendation Movie [[docs]](https://developer.themoviedb.org/reference/movie-recommendations)

> https://api.themoviedb.org/3/movie/[movieId]/recommendations

params:

```json
{
  "page": 1,
  "language": "en-US"
}
```

## 👀 Quick Preview

### Home

![home](/public/preview-1.png)

### Detail

![detail](/public/preview-2.png)

### Search

![search](/public/preview-3.png)
