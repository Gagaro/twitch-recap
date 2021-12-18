<template>
  <h1 class="text-5xl my-4 font-bold text-primary text-center">Twitch Recap</h1>
  <div>
    <dl class="container mx-auto">
      <dt class="font-bold">What is Twitch Recap?</dt>
      <dd>Twitch Recap shows you a lot of data from your viewing habits.</dd>

      <dt class="font-bold">How does this works?</dt>
      <dd>
        <p>You can ask Twitch about your data <a class="underline text-secondary" target="_blank"
                                                 href="https://app.onetrust.com/app/#/webform/ee57cd1d-b315-4b29-90cd-4def381b86c9">here</a>.
          <span class="italic">(<a class="underline text-secondary" target="_blank"
                                   href="https://www.twitch.tv/p/en/legal/privacy-choices/">source</a>)</span></p>
        <p>Once you have your data, just drag and drop the CSV files in the box below.</p>
      </dd>

      <dt class="font-bold">But I don't want to share my data with you...</dt>
      <dd>I wouldn't either. That's why everything is computed in your own browser! None of your data is sent anywhere.</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Presentation",
  components: {
  },
});
</script>