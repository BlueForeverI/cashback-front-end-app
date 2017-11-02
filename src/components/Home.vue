<template>
  <div id='home'>
    <h2>{{ labels.homeTitle }}</h2>
    <p>{{ labels.homeDescription }}</p>
  </div>
</template>

<script>
import { labels } from '../labels/Home.labels.json'

export default {
  name: 'home',
  data: () => {
    return {
      labels: labels[process.env.LANG]
    }
  }
}
</script>