<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @drag.prevent.stop=""
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <div v-if="uploadedFiles.length > 0">
        <div v-for="(file, index) in uploadedFiles" :key="index" class="mb-4">
          <div class="font-bold text-sm">{{ file.name }}</div>
          <!-- Display MP3 files -->
          <audio v-if="file.type === 'audio/mpeg'" controls class="w-full mt-2">
            <source :src="file.url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <!-- Display image files -->
          <img
            v-else-if="file.type.startsWith('image/')"
            :src="file.url"
            :alt="file.name"
            class="mt-2 max-w-full h-auto"
          />
          <!-- Display PDF files -->
          <iframe
            v-else-if="file.type === 'application/pdf'"
            :src="file.url"
            class="w-full h-64 mt-2"
            frameborder="0"
          ></iframe>
          <!-- Unsupported file type -->
          <div v-else class="text-red-500 mt-2">Unsupported file type: {{ file.type }}</div>
        </div>
      </div>
      <!-- Progess Bars -->
      <div class="mb-4" v-if="1 == 2">
        <!-- File Name -->
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div class="transition-all progress-bar bg-blue-400" style="width: 75%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      is_dragover: false,
      uploadedFiles: [],
    }
  },
  methods: {
    upload($event) {
      this.is_dragover = false
      const files = [...$event.dataTransfer.files]
      files.forEach((file) => {
        const fileURL = URL.createObjectURL(file)
        this.uploadedFiles.push({
          name: file.name,
          type: file.type,
          url: fileURL,
        })
      })
      console.log(files)
    },
  },
}
</script>
