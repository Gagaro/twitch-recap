<template>
  <div>
    <div ref="minutesChart"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import Plotly from "plotly.js";
import {ChatData, MinutesData} from "@/interfaces";

export default defineComponent({
  name: "Charts",
  components: {
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
    updateMinutesPlots(): void {
      if (this.minutesData === undefined) {
        return ;
      }
      const minutesWatched: {
        [key: string]: {
          [key: string]: number
        }
      } = {}, year = this.year.toString();

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
          .map(([streamer, minutesDays]: [string, {[key: string]: number}]) => ({
            x: Object.keys(minutesDays),
            y: Object.values(minutesDays),
            hovertemplate: "<b>%{y}</b> minutes<br><b>%{x}</b>",
            customdata: {
              total: Object.values(minutesDays).reduce((a: number, b: number) => a + b, 0),
            },
            name: streamer,
            type: 'bar'
         })
      ).sort((streamerA, streamerB) => (
        streamerA.customdata.total as number) - (streamerB.customdata.total as number)
      ).slice(-10);

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
      Plotly.newPlot(
          //@ts-ignore
          this.$refs['minutesChart'],
          data,
          layout,
          {displayModeBar: false}
      );
    }
  }
});
</script>