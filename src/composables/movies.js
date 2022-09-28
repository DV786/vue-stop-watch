import { ref } from "vue";
import http from "../../http-common"
import { useRouter } from "vue-router";    

export default function useMovies() {
    const movie =  ref([])
    const movies = ref([])

    const errors = ref([])
    const router = useRouter()

    const getMovies = async () => {
        try {
            let response = await http.get('/movies')
            //console.log("data-->",response.data);

            movies.value = response.data
        } catch (error) {
            console.log(error);
        }
    }

    const storeMovie = async (data) => {
        errors.value = [];
        try {
            await http.post('/movies',data);
            await router.push({name: 'movies.index'})
            
        } catch (error) {
            if(error.response.status === 400) {
                for(const key in error.response.data.errors) {
                    errors.value.push(error.response.data.errors[key][0]);
                }
            }
        }
    }

    const getMovie = async (id) => {
        let response = await http.get(`/movies/${id}`)
        movie.value = response.data
    }

    const updateMovie = async(id) => {
        errors.value = []
        try {
            await http.put(`/movies/${id}`,movie.value)
            await router.push({name: 'movies.index'})
        } catch (error) {
            if(error.response.status === 400){
                for(const key in error.response.data.errors){
                    errors.value.push(error.response.data.errors[key][0])
                }
            }
        }
    }

    const destroyMovie = async (id) => {
        await http.delete(`/movies/${id}`)
    }

    return {
      movie,
      movies,
      errors,
      getMovies,
      storeMovie,
      getMovie,
      updateMovie,
      destroyMovie, 
    }
}