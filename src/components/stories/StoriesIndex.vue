<script>
import { ref, onMounted } from "vue"
import useStories from "../../composables/stories"
import _ from "lodash"

import ArrowUpIcon from "vue-material-design-icons/ArrowUp.vue";
import ArrowDownIcon from "vue-material-design-icons/ArrowDown.vue";
import BookOpenPageVariantIcon from "vue-material-design-icons/BookOpenPageVariant.vue";
import PlusIcon from "vue-material-design-icons/Plus.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";
import PencilIcon from "vue-material-design-icons/Pencil.vue";
import FileIcon from "vue-material-design-icons/FileAccount.vue"
export default {
    components: {
        ArrowUpIcon,
        ArrowDownIcon,
        BookOpenPageVariantIcon,
        PlusIcon,
        DeleteIcon,
        PencilIcon,
        FileIcon
    },
    setup() {
        const {
            stories,
            getStories,
            destroyStory,
            updateStory,
            story,
            getStory,
            getStoriesByPlot
        } = useStories()

        const order = ref('desc');

        const searchQurey = ref("")
        onMounted(getStories)
        
        const deleteStory = async (id) => {
            if(confirm("You sure ?")){
                await destroyStory(id);
                await getStories();
            }
        }

        const doUpvotes = async (storyV) => {
            await getStory(storyV.id);
            story.value.upvotes++,
            storyV.upvotes = story.value.upvotes;  
            await updateStory(storyV.id)
        }

        const sortByUpvotes = () => {
            order.value = order.value === "desc" ? "asc" : "desc"
            stories.value = _.orderBy(stories.value, "upvotes", order.value)
        } 

        const doFilter = () => {
            getStoriesByPlot(searchQurey.value)
        }
        const doClear = async () => {
            searchQurey.value = ""
            await getStories()
        }
     return{
        stories,
        deleteStory,
        doUpvotes,
        order,
        sortByUpvotes,
        searchQurey,
        doFilter,
        doClear
     }
    }
}
</script>
<template>
    <div class="container">
        <h1>Stories<book-open-page-variant-icon /></h1>
        <div class="serchBar">
            <form class="input-group mb-5">
                <input 
                 type="search"
                 class="form-control"
                 v-model="searchQurey"
                 placeholder="Search by Plot"
                 aria-label="Recipient`s username"
                 aria-describedby="button-addon2"
                 required
                />
                <input  
                 type="submit"
                 class="btn btn-primary"
                 style="margin-left: 10px"
                 value="Filter"
                 @click="doFilter"
                />
                <button
                    type="Clear"
                    class="btn btn-info"
                    style="margin-left: 10px"
                    @click="doClear"
                >
                    Clear
                </button>
            </form>
        </div>
        <table class="table">
            <tr class="bg-dark text-white">
                <th>#</th>
                <th>Plot</th>
                <th>Writer</th>
                <th>
                    Upvotes
                    <span @click="sortByUpvotes">
                        <arrow-down-icon v-if="order === 'desc'" title="Sort asc" />
                        <arrow-up-icon v-else title="Sort desc" />
                    </span>
                </th>
                <th>Actions</th>
            </tr>
            <tr v-for="story in stories" :key="story.id">
                <!--<td v-for="prop in story" :key="prop" >
                    {{prop}}
                </td>-->
                <td>{{story.id}}</td>
                <td>{{story.plot}}</td>
                <td>{{story.writer}}</td>
                <td>{{story.upvotes}}</td>
                <td>
                    <button class="btn btn-primary" @click="doUpvotes(story)" >
                        Upvotes
                    </button>
                    |
                    <router-link 
                        :to="{name: 'stories.details', params:{id: story.id} }"
                        class="btn btn-success"
                    >
                        <file-icon title="Details" />
                    </router-link>
                    |
                    <router-link 
                        :to="{name: 'stories.edit', params:{id: story.id } }"
                        class="btn btn-warning"
                    >
                       <pencil-icon title="Edit" />
                    </router-link>
                    |
                    <button
                        class="btn btn-danger"
                        @click="deleteStory(story.id)"
                    >
                        <delete-icon title="Delete" />
                    </button>
                </td>
            </tr>
            <tr />
        </table>
        <p class="lead">
            Here's a list of all your Stories.
            <router-link :to="{ name: 'stories.create' }" class="btn btn-primary">
                <plus-icon title="Add" />
                Add a new one?
            </router-link>
        </p>
    </div>
</template>