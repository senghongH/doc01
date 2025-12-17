<template>
    <div class="bg-gray-500/10 rounded-md p-4 mt-4">
        <button
            @click="fetchJoke"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {{ loading ? 'Loading...' : 'Get Random Joke' }}
        </button>

        <div v-if="joke" class="mt-4 p-3 bg-white/10 rounded">
            <p class="text-green-400">{{ joke }}</p>
        </div>

        <div v-if="error" class="mt-4 text-red-400">
            {{ error }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const joke = ref<string>('')
const loading = ref(false)
const error = ref<string>('')

async function fetchJoke() {
    loading.value = true
    error.value = ''

    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke')
        const data = await response.json()
        joke.value = `${data.setup} - ${data.punchline}`
    } catch (e) {
        error.value = 'Failed to fetch joke'
    } finally {
        loading.value = false
    }
}
</script>