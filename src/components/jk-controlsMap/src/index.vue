<script>
import BaseHMap from "@/components/jk-baseHMap"
export default {
  components: {
    BaseHMap
  },
  methods: {
    render
  },
  render() {
    return (
      <div class="jk-controlsMap">
        <BaseHMap />
      </div>
    )
  }
}
</script>

<style lang="scss">
.jk-controlsMap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
