<template>
  <div>
    <h2 class="text-2xl bold text-tertiary">Your top 10 favorite streamers</h2>
    <ul>
      <li
          v-for="([streamer, minutes], index) of totalMinutesByStreamer.slice(0, 10)"
          :key="streamer"
          class="flex justify-between border-b border-dashed mt-1"
          :class="{'text-3xl': index === 0, 'text-2xl': index === 1, 'text-xl': index === 2}"
      >
        <span class="text-l font-bold">{{ streamer }}</span>
        <span>{{ formatMinutes(minutes) }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MinutesWatchedRecap",
  components: {
  },
  props: {
    year: Number,
    minutesData: Array | null,
  },
  computed: {
    totalMinutesByStreamer(): Array {
      if (this.minutesData === null) {
        return null;
      }
      const totalMinutes = {}, year = this.year.toString();
      for (const minutes of this.minutesData) {
        if (minutes.day.startsWith(year)) {
          if (!(minutes.channel_name in totalMinutes)) {
            totalMinutes[minutes.channel_name] = 0;
          }
          totalMinutes[minutes.channel_name] += parseInt(minutes.context);
        }
      }
      return Object.entries(totalMinutes).sort(([,a], [,b]) => b - a);
    },
  },
  methods: {
    formatMinutes(minutes: number): string {
      const hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      if (hours > 0) {
        return `${hours}h${minutes}m`;
      }
      return `${minutes}m`;
    },
  },
});
</script>