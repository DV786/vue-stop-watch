<script>
import useStories from "../../composables/stories"
import { reactive, onMounted } from "vue"

export default {
    props: {
        id: {
            required: true,
            type: String,
        },
    },
    setup(props) {
        const form = reactive({
            plot: "",
            writer:"",
            upvotes: 0
        });

        const { errors, story, getStory, updateStory } = useStories();

        onMounted(getStory(props.id))

        const saveStory = async () => {
            await updateStory(props.id)
        }

        return{
            form,
            story,
            errors,
            saveStory,
        }
    },
}
</script>
<template>
    <div class="text-danger" v-if="errors.length !== 0">
        <ul>
            <li v-for="(err,index) in errors" :key="index">
                {{err}}
            </li>
        </ul>
    </div>

    <div class="container" style="width: 400px">
        <h2>Create Movies</h2>
        <form @submit.prevent="saveStory">
            <div class="form-group">
                <label for="Plot">Plot</label>
                <input
                 type="text" 
                 name="Plot" 
                 id="Plot" 
                 class="form-control"
                 v-model="story.plot"
                 required 
                />
            </div>
            <div class="form-group">
                <label for="Writer">Writer</label>
                <input
                 type="text" 
                 name="Writer" 
                 id="Writer" 
                 class="form-control"
                 v-model="story.writer"
                 required 
                />
            </div>
            <router-link :to="{name: 'stories.index'}" class="btn btn-primary">
                Back
            </router-link>
            |
            <button type="submit" class="btn btn-success">
                Save
            </button>
        </form>
    </div>
</template>
<style scoped>

</style>