import { ref } from "vue";
import http from "../../http-common"
import { useRouter } from "vue-router";    

export default function usestories() {
    const story =  ref([])
    const stories = ref([])

    const errors = ref([])
    const router = useRouter()

    const getStories = async () => {
        try {
            let response = await http.get('/stories')
            //console.log("data-->",response.data);

            stories.value = response.data
        } catch (error) {
            console.log(error);
        }
    }

    const storeStory = async (data) => {
        errors.value = [];
        try {
            await http.post('/stories',data);
            await router.push({name: 'stories.index'})
            
        } catch (error) {
            if(error.response.status === 400) {
                for(const key in error.response.data.errors) {
                    errors.value.push(error.response.data.errors[key][0]);
                }
            }
        }
    }

    const getStory = async (id) => {
        let response = await http.get(`/stories/${id}`)
        story.value = response.data
    }

    const updateStory = async(id) => {
        errors.value = []
        try {
            await http.put(`/stories/${id}`,story.value)
            await router.push({name: 'stories.index'})
        } catch (error) {
            if(error.response.status === 400){
                for(const key in error.response.data.errors){
                    errors.value.push(error.response.data.errors[key][0])
                }
            }
        }
    }

    const destroyStory = async (id) => {
        await http.delete(`/stories/${id}`)
    }

    const getStoriesByPlot = async (searchQuery) => {
        if(searchQuery.trim() === '') return;
        let response = await http.get(`/stories/${searchQuery}`)
        stories.value = response.data
    }

    return {
      story,
      stories,
      errors,
      getStories,
      storeStory,
      getStory,
      updateStory,
      destroyStory,
      getStoriesByPlot 
    }
}