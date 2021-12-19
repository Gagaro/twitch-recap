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
import {defineComponent, PropType} from "vue";
import MinutesWatchedRecap from "./Recaps/MinutesWatchedRecap.vue";
import ChatMessagesRecap from "./Recaps/ChatMessagesRecap.vue";
import {ChatData, MinutesData} from "@/interfaces";

export default defineComponent({
  name: "Recap",
  components: {
    MinutesWatchedRecap,
    ChatMessagesRecap,
  },
  props: {
    year: {
      type: Number,
      required: true,
    },
    minutesData: {
      type: Array as PropType<MinutesData[]>,
      required: false,
    },
    chatsData: {
      type: Array as PropType<ChatData[]>,
      required: false,
    },
  },
  computed: {
  },
  methods: {
  },
});
</script>