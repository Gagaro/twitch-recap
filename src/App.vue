<template>
  <Presentation></Presentation>
  <Upload
    @minutesData="minutesData = $event"
    @chatsData="chatsData = $event"
  ></Upload>
  <template v-if="hasData">
    <div class="bg-secondary mx-auto pt-4 pb-8">
      <div>
        <ul class="flex justify-center">
          <li v-for="year of years"
              :key="year"
              class="text-xl cursor-pointer"
              :class="{'text-tertiary border-tertiary border-b-2 font-bold px-2 mx-0': currentYear === year,
                       'text-white border-white border-b px-1 mx-1': currentYear !== year}"
              @click="currentYear = year"
          >{{ year }}</li>
        </ul>
      </div>
      <Recap
        :year="currentYear"
        :minutesData="minutesData"
        :chatsData="chatsData"
      ></Recap>
    </div>
    <Charts
      :year="currentYear"
      :minutesData="minutesData"
      :chatsData="chatsData"
    ></Charts>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Upload from "./components/Upload.vue";
import Presentation from "./components/Presentation.vue";
import Recap from "./components/Recap.vue";
import Charts from "./components/Charts.vue";

export default defineComponent({
  name: "App",
  components: {
    Presentation,
    Upload,
    Recap,
    Charts,
  },
  data() {
    return {
      minutesData: undefined,
      chatsData: undefined,
      currentYear: 2021,
    };
  },
  computed: {
    years(): number[] {
      return [2021, 2020, 2019, 2018, 2017, 2016];
    },
    hasData(): boolean {
      return !!this.minutesData || !!this.chatsData;
    },
  },
});
</script>

<style>
</style>
