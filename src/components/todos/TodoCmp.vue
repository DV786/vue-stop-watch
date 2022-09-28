<script>
import { ref,reactive } from "vue"
export default {
    name: 'TodoCmp',
    setup() {
        const task = ref(null);
        const todos = reactive([
            { id: 1, title: "One", isDone: false, time: new Date() },
        ])  

        const taskDone = (index) => {
            todos[index].isDone = true;
        }

        const taskUndo = (index) => {
            todos[index].isDone = false;
        }

        const addNewTask = () => {
            todos.unshift({
                id: Math.floor(Math.random() * 100),
                title: task.value,
                isDone: false,
                time: new Date(),
            })
            task.value = "";
        }
        const removeTask = (index) => {
            if(confirm("Are you sure want to delete item")){
                 todos.splice(index,1)
            }
        }

        const padTo2Digits = (num) => {
           return num.toString().padStart(2, "0")
        }

        const formatDate = (date) => {
            return(
                [
                    date.getFullYear(),
                    padTo2Digits(date.getMonth() + 1),
                    padTo2Digits(date.getDate()),
                ].join("-") +
                "" + 
                [
                    padTo2Digits(date.getHours()),
                    padTo2Digits(date.getMinutes()),
                    padTo2Digits(date.getSeconds()),
                ].join(":")
            )

        }
        return {
            todos,
            task,
            formatDate,
            taskDone,
            taskUndo,
            addNewTask,
            removeTask,
        }
    }
}
</script>
<template>
    <div class="container">
        <h1 class="text-center" style="border-bottom: 1px solid green; padding-bottom: 5px;">Todos</h1>
        <div class="row">
            <div class="col-sm-8">
                <div v-if="todos.length">
                    <div
                     v-for="(todo, index) in todos" 
                     :key="todo"
                     style="padding: 10px; margin-bottom: 10px"
                     :class="[todo.isDone ? 'bg-success' : 'bg-light']"
                    >
                        <div>
                            <h4 :class="{completed: todo.isDone}">{{ todo.title }}</h4>
                            <p>{{ formatDate(todo.time) }}</p>
                        </div>
                        <div>
                            <button 
                             class="btn btn-danger"
                             @click='removeTask(index)'
                             title="Remove todo"
                            >
                                Remove
                            </button>
                            |
                            <button 
                             v-if="!todo.isDone"
                             class="btn btn-success"
                             @click='taskDone(index)'
                             title="Remove todo"
                            >
                                Mark as Done
                            </button>
                            <button 
                             v-else
                             class="btn btn-warning"
                             @click='taskUndo(index)'
                             title="Remove todo"
                            >
                                Mark as undone
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>You dont have any task to do.</div>
            </div>
            <div class="col-sm-4">
                <div>
                    <h2>Add a todo</h2>
                    <input
                        type="text"
                        @keydown.enter="addNewTask"
                        v-model="task"
                        placeholder="Enter your Task and press enter"
                        class="form-control"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.completed {
  text-decoration: line-through;
}
</style>