<template>
  <div
    class="flex flex-col"
  >
    <input
      ref="csvFilesInput"
      class="hidden"
      name="csvFiles"
      type="file"
      @change="onInputChange"
      multiple
    />

    <div
        class="py-16 mt-8 text-center bg-tertiary text-primary cursor-pointer"
        :class="{'bg-indigo-100': isFileOnDrop, '': !isFileOnDrop}"
        @drop.prevent.stop="onFileDrop"
        @dragenter.prevent.stop="isFileOnDrop = true"
        @dragstart.prevent.stop="isFileOnDrop = true"
        @dragover.prevent.stop="isFileOnDrop = true"
        @dragleave.prevent.stop="isFileOnDrop = false"
        @dragend.prevent.stop="isFileOnDrop = false"
        @drag.prevent.stop
        @click="openFileDialog"
    >
      Drop your CSVs or <span class="underline">click</span> here to start.
    </div>

    <p class="text-red-700" v-for="error in errors">{{ error }}</p>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Papa from "papaparse";
import {ChatData} from "@/interfaces";

export default defineComponent({
  name: "Upload",
  components: {
  },
  emits: ['minutesData', 'chatsData'],
  data() {
    return {
      errors: [] as string[],
      isFileOnDrop: false,
    };
  },
  methods: {
    openFileDialog() {
      (this.$refs.csvFilesInput as HTMLInputElement).click();
    },
    onInputChange(event: Event) {
      const files = (event.target as HTMLInputElement)?.files;
      if (!!files) {
        this.handleFiles(files);
      }
    },
    onFileDrop(event: InputEvent | DragEvent) {
      this.isFileOnDrop = false;
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        this.handleFiles(event.dataTransfer.files);
      }
    },
    handleFiles(files: FileList) {
      for (const file of Array.from(files)) {
        if (file.name.includes('minutes_watched')) {
          this.parseFile(file, 'minutesData');
        } else if (file.name.includes('chats_cheers_sub_notifications')) {
          this.parseFile(file, 'chatsData');
        }
      }
    },
    parseFile(file: File, event: "minutesData" | "chatsData") {
      const component = this;
      Papa.parse(file, {
        worker: true,
        header: true,
        skipEmptyLines: true,
        complete: (results: {data: ChatData[]}) => {
          if (event === "chatsData") {
            component.$emit(event, results.data.filter(row => row.event_type === 'chat'));
          } else {
            component.$emit(event, results.data);
          }
        }
      });
    }
  },
});
</script>
