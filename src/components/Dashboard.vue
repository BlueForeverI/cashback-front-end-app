<template>
  <div id="dashboard">
    <h2>{{ labels.dashboardTitle }}</h2>
  </div>
</template>

<script>
import { labels } from '../labels/Dashboard.labels.json'

export default {
  name: 'dashboard',
  data: () => {
    return {
      labels: labels[process.env.LANG]
    }
  }
}
</script>