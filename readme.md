# Streamsmart

With this VueJS package, you can render a mediacollection. 

## Requirements

- NodeJS >= 7
- a public API, which gives you the movies

## Installation

- clone this repo into a folder
- run ```npm install```
- run a webserver which points to the public folder
- or, you can run this page via the npm-package **http-server** (to install run ```npm install -g http-server```). Then you can go to the public folder and run ```hs``` to start the page
- go to [http://localhost:8080](your server url) and see your movies

## API Requirements

your API needs to have following endpoints

### /movies

**Possible query parameters**

- year --> filters your movies by year
- genre --> filters your movies by a specific genre
- search --> filter your movies by a part of a title
- page --> sets the page of the filtered movies (your API should deliver 60 movies per page)

**The Response** should be

```json
{
    "totalpages": 55,
    "movies": [
        {
            "title": "movie title",
            "poster": "[LINK TO THE PREVIEW IMAGE OF THE MOVIE]",
            "genres": ["genre1", "genre2"],
            "year": "2017",
            "trailer": "[YOUTUBE TRAILER LINK]",
            "description": "[MOVIE DESCRIPTION]",
            "streamurls": ["[STREAMCLOUD LINK]"]
        },....
    ]
}
```

### /genres

Your API should return all possible genres of your movie collection

**The Response** should be

```json
[
    "genre 1",
    "genre 2",
    "genre 3",
    "genre 4",
    ....
]
```

### /video

**Possible query parameters**

- streamurl --> The link to the movie on streamcloud

**The Response** should be

```json
{
    "video": "[URL TO AN MP4 VIDEO]"
}
```