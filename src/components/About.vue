<template>
  <div id="about">
    <h2>{{ labels.aboutTitle }}</h2>
    <p>{{ labels.aboutDescription }}</p>
  </div>
</template>

<script>
import { labels } from '../labels/About.labels.json'

export default {
  name: 'about',
  data: () => {
    return {
      labels: labels[process.env.LANG]
    }
  }
}
</script>