<template>
  <div>
    <div ref="minutesChart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Plotly from "plotly.js-dist";

export default defineComponent({
  name: "Charts",
  components: {
  },
  props: {
    year: Number,
    minutesData: Array | null,
    chatsData: Array | null,
  },
  mounted() {
    this.updateMinutesPlots();
  },
  watch: {
    year() {
      this.updateMinutesPlots();
    },
    minutesData() {
      this.updateMinutesPlots();
    },
  },
  methods: {
    updateMinutesPlots() {
      if (this.minutesData === null) {
        return [];
      }
      const minutesWatched = {}, year = this.year.toString();

      for (const minutes of this.minutesData) {
        if (minutes.day.startsWith(year)) {
          if (!(minutes.channel_name in minutesWatched)) {
            minutesWatched[minutes.channel_name] = {};
          }
          if (!(minutes.day in minutesWatched[minutes.channel_name])) {
            minutesWatched[minutes.channel_name][minutes.day] = 0;
          }
          minutesWatched[minutes.channel_name][minutes.day] += parseInt(minutes.context);
        }
      }
      const data = Object.entries(minutesWatched)
          .map(([streamer, minutesDays]) => ({
            x: Object.keys(minutesDays),
            y: Object.values(minutesDays),
            hovertemplate: "<b>%{y}</b> minutes<br><b>%{x}</b>",
            customdata: {
              total: Object.values(minutesDays).reduce((a, b) => a + b, 0),
            },
            name: streamer,
            type: 'bar'
         })
      ).sort((streamerA, streamerB) => streamerA.customdata.total - streamerB.customdata.total).slice(-10);

      const layout = {
        title: 'Top 10 Streamer Watched Time',
        xaxis: {
          title: 'Day',
          rangeslider: true,
        },
        yaxis: {
          title: 'Time Watched',
        },
        barmode: 'stack',
        paper_bgcolor: 'rgba(0,0,0,0)',
      };
      Plotly.newPlot(this.$refs['minutesChart'], data, layout, {displayModeBar: false});
    }
  }
});
</script>