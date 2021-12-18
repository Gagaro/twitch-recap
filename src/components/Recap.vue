<template>

  <div>
    <div class="flex justify-around">
      <MinutesWatchedRecap
          v-if="!!minutesData"
          :year="year"
          :minutesData="minutesData"
      ></MinutesWatchedRecap>
      <ChatMessagesRecap
          v-if="!!chatsData"
          :year="year"
          :chatsData="chatsData"
      ></ChatMessagesRecap>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MinutesWatchedRecap from "./Recaps/MinutesWatchedRecap.vue";
import ChatMessagesRecap from "./Recaps/ChatMessagesRecap.vue";

export default defineComponent({
  name: "Recap",
  components: {
    MinutesWatchedRecap,
    ChatMessagesRecap,
  },
  props: {
    year: Number,
    minutesData: Array | null,
    chatsData: Array | null,
  },
  computed: {
  },
  methods: {
  },
});
</script>