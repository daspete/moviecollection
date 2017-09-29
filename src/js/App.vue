<template>
    <div>
        <div class="filter">
            <h2>Streamsmart</h2>
            <div>
                <label>Title</label>
                <input v-model="search">
            </div>
            <div>
                <label>Year</label>
                <input v-model="year">
            </div>

            <div>
                <label>Page</label>
                <select v-model="page">
                    <option v-for="_page in pages" :value="_page">{{ _page }}</option>
                </select>
                of {{ pages }}
            </div>

            <div class="genres">
                <h4>Genre</h4>
                <button v-on:click="changeGenre('')">All</button>
                <button v-for="_genre in genres" :class="`${genre == _genre ? 'active' : ''}`" v-on:click="changeGenre(_genre)">{{ _genre }}</button>
            </div>
        </div>
        
        <div :class="`player${video != null ? ' visible' : ''}`">
            <div v-if="video != null">
                <video :src="video" autoplay controls></video>
            </div>
            <button class="btn-close" v-on:click="closeVideo">&times;</button>
        </div>
        
        <div class="moviethumbs">
            <div class="moviethumbs__wrapper" :style="`width: ${movies.length * 97}px`">
                <button v-for="(movie, _movieID) in movies" :class="`movie-thumb${ _movieID == movieID ? ' current' : '' }`" v-on:click="changeMovie(_movieID)">
                    <img :src="movie.poster">
                </button>
            </div>
        </div>

        <div class="moviedescription">
            <div class="moviedescription__inner" v-if="typeof movies[movieID] !== 'undefined'">
                <h2>{{ movies[movieID].title }} <span>({{ movies[movieID].year }})</span></h2>
                <p>{{ movies[movieID].description.replace('Fehler Melden', '') }}</p>

                <h4>Streams</h4>
                <button v-for="(stream, index) in movies[movieID].streamurls" v-on:click="getVideo(stream)">Stream {{ index + 1 }}</button>

                <h4>Trailer</h4>
                <iframe :src="movies[movieID].trailer.replace('www.youtube.com/watch?v=', 'www.youtube.com/embed/')"></iframe>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        store: ['config'],
        props: [],
        components: {},
        data(){
            return {
                year: '',
                genre: '',
                genres: [],
                search: '',
                page: 1,
                pages: 1,
                movies: [],
                movieID: 0,
                movieUpdateTimeout: null,
                video: null
            }
        },
        watch:{
            year: function(value){
                this.page = 1;
                this.movieID = 0;
                this.startMovieUpdateTimeout();
            },
            search: function(value){
                this.page = 1;
                this.movieID = 0;
                this.startMovieUpdateTimeout();
            },
            page: function(value){
                this.movieID = 0;
                this.updateMovies();
            }
        },
        mounted(){},
        created(){
            this.getGenres();
            this.updateMovies();
        },
        methods: {
            startMovieUpdateTimeout(){
                if(this.movieUpdateTimeout !== null){
                    clearTimeout(this.movieUpdateTimeout);
                }

                this.movieUpdateTimeout = setTimeout(() => {
                    this.updateMovies();
                }, 500);
            },

            getGenres(){
                axios.get(`${this.config.urls.api}genres`).then((res) => {
                    this.genres = res.data;
                });
            },

            changeGenre(genre){
                this.genre = genre;
                this.updateMovies();
            },

            changeMovie(_movieID){
                this.movieID = _movieID;
            },

            updateMovies(){
                axios.get(`${this.config.urls.api}movies`, {
                    params: {
                        year: this.year,
                        search: this.search,
                        genre: this.genre,
                        page: this.page
                    }
                }).then((res) => {
                    this.movies = res.data.movies;
                    this.pages = parseInt(res.data.totalpages);
                });
            },

            getVideo(streamurl){
                axios.get(`${this.config.urls.api}video`, {
                    params: {
                        streamurl: streamurl
                    }
                }).then((res) => {
                    this.video = res.data.video;
                });
            },
            closeVideo(){
                this.video = null;
            }
        }
    }

</script>