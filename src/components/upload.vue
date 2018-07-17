<script>
import upload from './upload'
export default {
  props:{
    drag: Boolean // 是否允许拖拽上传
  },
  mixins:[upload],
  methods:{
    handleChange(ev) {
      const files = ev.target.files;
      if(!files) return
      this.uploadFiles(files)
    },
    handleClick () {
      if(!this.disabled){
        this.$refs.upload.values = null;
        this.$refs.upload.click();
      }
    }
  },
  render (h) {
    const attr = {
      class:{
        'upload':true
      },
      on:{
        click: this.handleClick,
      }
    }
    return(
    <div {...attr}>
      <input style={{display:'none'}} ref="upload" type="file" on-change={this.handleChange}/>
      {this.$slots.default}
      <progress-bar percent={this.percent}></progress-bar>
      
    </div>
    )
  }
}
</script>
<style>

</style>
