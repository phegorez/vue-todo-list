<script setup>
import { useTodoStore } from "../stores/todo";
import { onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";

const useTodo = useTodoStore();
const route = useRoute();
const router = useRouter();
const todoID = route.params.id;
const isLoading = ref(false);
const isUpdated = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await useTodo.loadTodo(todoID);
  isLoading.value = false;
});

const editTodo = async (todo, id) => {
  await useTodo.editTodo(todo, id);
  isUpdated.value = true;
  setTimeout(() => {
    isUpdated.value = false;
    setTimeout(() => {
      router.push({ name: "todos" });
    }, 1000);
  }, 3000);
};

const changeStatus = async (todo, id) => {
  await useTodo.editTodo(todo, id);
};
</script>

<template>
  <div class="toast toast-top toast-end">
    <div class="alert alert-success" v-if="isUpdated">
      <span>Update successfully.</span>
    </div>
  </div>
  <Loading v-if="isLoading" />
  <div class="w-1/2 mx-auto fixed inset-0 flex flex-col justify-center" v-else>
    <h1 class="text-xl font-bold text-center">Edit To-Do</h1>
    <div class="flex items-center justify-between">
      <RouterLink to="/">
        <button class="btn btn-square btn-outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1.5em"
          >
            <path
              d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
            />
          </svg>
        </button>
      </RouterLink>
      <div class="badge badge-neutral">Edit ID : {{ todoID }}</div>
    </div>
    <div class="form-control w-full">
      <div class="label">
        <span class="label-text">Name</span>
      </div>
      <input
        type="text"
        placeholder="Type name todo"
        v-model="useTodo.selectedTodo.name"
        class="input input-bordered w-full"
      />
    </div>
    <div class="form-control w-full">
      <div class="label">
        <span class="label-text">Status</span>
      </div>
      <select
        v-model="useTodo.selectedTodo.status"
        class="select select-bordered w-full"
        @change="changeStatus(useTodo.selectedTodo, useTodo.selectedTodo.id)"
      >
        <option v-for="status in useTodo.statuses">{{ status }}</option>
      </select>
    </div>
    <button
      @click="editTodo(useTodo.selectedTodo, useTodo.selectedTodo.id)"
      class="btn btn-primary w-full mt-4"
    >
      EDIT
    </button>
  </div>
</template>

<style scoped>
svg {
  fill: white;
}
</style>
