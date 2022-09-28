<script>
import useMovies from "../../composables/movies"
import { onMounted } from "vue"

import VideoIcon from "vue-material-design-icons/Video.vue"
import PlusIcon from "vue-material-design-icons/Plus.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";
 
export default {
    components: {
        VideoIcon,
        PlusIcon,
        DeleteIcon,
        PencilIcon,
    },
    setup() {
        const { movies, getMovies, destroyMovie } = useMovies();
        
        onMounted(getMovies)

        const deleteMovie = async(id) => {
            if(confirm("You sure?")){   
                await destroyMovie(id);
                await getMovies()
            }
        }
    return{
        movies,
        deleteMovie 
    }
   }
}
</script>
<template>
    <div class="container">
        <h1>Movies<video-icon/></h1>
        <table class="table">
            <tr class="bg-dark text-white">
                <th>#</th>
                <th>Title</th>
                <th>Director</th>
                <th>Action</th>
            </tr>
            <tr v-for="movie in movies" :key="movie.id">
                <td>{{movie.id}}</td>
                <td>{{movie.title}}</td>
                <td>{{movie.director}}</td>
                <td>
                    <router-link :to="{name: 'movies.edit', params: { id: movie.id} }" class="btn btn-warning">
                        <pencil-icon title="edit" />
                    </router-link>
                    |
                    <button @click="deleteMovie(movie.id)" class="btn btn-danger">
                        <delete-icon title="delete" />
                    </button>
                </td>
            </tr>
        </table>
        <p class="lead">
            Here`s a list of all your movies
            <router-link :to="{name: 'movies.create'}" class="btn btn-primary">
                <plus-icon title="Add" />
                Add a new one?
            </router-link>
        </p>
    </div>
</template>
<style scoped>

</style>