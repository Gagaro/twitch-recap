<template>
  <div>
    <h2 class="text-2xl bold text-tertiary">Your chat messages</h2>
    <div class="text-xl"><span class="font-bold">{{ formatNumber(totalMessagesSent) }}</span> messages sent overall, including:</div>
    <ul>
      <li
          v-for="[streamer, messagesSent] of messagesSentByStreamer.slice(0, 5)"
          :key="streamer"
          class="text-right"
      ><span class="text-l font-bold">{{ formatNumber(messagesSent) }}</span> messages sent on <span class="text-l font-bold">{{ streamer }}</span> channel.</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChatMessagesRecap",
  components: {
  },
  props: {
    year: Number,
    chatsData: Array | null,
  },
  computed: {
    messagesSentByStreamer(): Array {
      const messages = {}, year = this.year.toString();
      for (const chat of this.chatsData) {
        if (chat.day.startsWith(year)) {
          if (!(chat.channel in messages)) {
            messages[chat.channel] = 0;
          }
          messages[chat.channel] += chat.context.split('; ').length;
        }
      }
      return Object.entries(messages).sort(([,a], [,b]) => b - a);
    },
    totalMessagesSent(): number {
      return this.messagesSentByStreamer.reduce((a, [,b]) => a + b, 0);
    },
  },
  methods: {
    formatNumber(number: number): string {
      return new Intl.NumberFormat().format(number);
    }
  },
});
</script>