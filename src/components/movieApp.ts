import { Vue, Component } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {},
})
export default class MovieApp extends Vue {
  searchTerm = "";
  apiKey = "ee0ac88ee409b7e463539db07f6cd832";
  movies = [];
  theatersMovies = [];
  topRatedMovies = [];

  async created() {
    await this.getMoviesInTheaters();
  }

  async searchMovies() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.searchTerm}&language=en-US`
      );
      this.movies = response.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async getMoviesInTheaters() {
    try {
      const nowPlayingResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`
      );
      this.theatersMovies = nowPlayingResponse.data.results;
      this.movies = nowPlayingResponse.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  async getTopRatedMovies() {
    try {
      const topRatedResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
      );
      this.topRatedMovies = topRatedResponse.data.results;
      this.movies = topRatedResponse.data.results;
    } catch (error) {
      console.error(error);
    }
  }

  goHome() {
    this.movies = this.theatersMovies;
  }
}
