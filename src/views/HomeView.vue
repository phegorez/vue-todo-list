<script setup>
import { useTodoStore } from '../stores/todo'
import { onMounted, ref, computed } from 'vue';
import { RouterLink } from "vue-router"
import Loading from '../components/Loading.vue'

const useTodo = useTodoStore()
const todoInput = ref('')
const isLoading = ref(false)
const defaultStatus = ref('Pending')

const filterTodoList = computed(() => {
  return useTodo.list.filter(todo => todo.status === defaultStatus.value)
})

onMounted(async () => {
  isLoading.value = true
  await useTodo.loadTodos()
  isLoading.value = false
  console.log(useTodo.list.length)
})

const addTodo = async (todoName) => {
  if (todoInput.value === '') {
    alert('Nah let write something bro')
  } else {
    isLoading.value = true
    await useTodo.addTodo(todoName)
    await useTodo.loadTodos()
    isLoading.value = false
    todoInput.value = ''
  }

}

const deleteTodo = async (todoId) => {
  isLoading.value = true
  await useTodo.deleteTodo(todoId)
  await useTodo.loadTodos()
  isLoading.value = false
}

const changeStatus = async (event, id) => {
  try {
    if (event.target.checked) {
      await useTodo.editTodo({ status: 'Done' }, id)
      await useTodo.loadTodos()
    } else {
      await useTodo.editTodo({ status: 'Doing' }, id)
      await useTodo.loadTodos()
    }
  } catch (err) {
    console.log('Error', err)
  }

}

const selectedTodo = async (id) => {
  await useTodo.loadTodo(id)
}

const changeSelectedStatus = async (newStatus) => {
  defaultStatus.value = newStatus
}

</script>

<template>
  <div>

    <div class="flex">
      <input type="text" class="input input-bordered w-full" placeholder="write your task here" v-model="todoInput">
      <button class="btn btn-primary ml-2" @click="addTodo(todoInput)">ADD</button>
    </div>

    <div role="tablist" class="tabs tabs-boxed mt-4">
      <a role="tab" class="tab" :class="status === defaultStatus ? 'tab-active' : ''" v-for="status in useTodo.statuses"
        @click="changeSelectedStatus(status)">
        {{ status }}
      </a>
    </div>


    <div class="flex items-center justify-center my-10"
      :class="useTodo.list.length <= 0 ? 'block' : 'hidden'">
      <h1 class="text-4xl font-bold">Empty Task</h1>
    </div>


    <div :class="useTodo.list.length > 0 ? 'block' : 'hidden'">
      <Loading v-if="isLoading" />

      <div v-else>
        <div class="flex items-center justify-between my-2" v-for="todo in filterTodoList" :key="todo.id">
          <div>
            <input type="checkbox" :checked="todo.status === 'Done'" class="checkbox"
              @change="changeStatus($event, todo.id)" />
          </div>
          <div :class="todo.status === 'Done' ? 'line-through' : ''" class="text-xl">{{ todo.name }}</div>
          <div>
            <RouterLink :to="{ name: 'edit', params: { id: todo.id } }">
              <button @click="selectedTodo(todo.id)" class="btn btn-square btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                  <path
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </button>
            </RouterLink>
            <button @click="deleteTodo(todo.id)" class="btn btn-square btn-outline ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
svg {
  fill: white;
}
</style>
