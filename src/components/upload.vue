<script>
import upload from './upload'
export default {
  props:{
    drag: Boolean, // 是否允许拖拽上传
    progressShow:{
      type: Boolean,
      default: true
    }
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
    return(
    <div class="upload">
      <input style={{display:'none'}} ref="upload" type="file" on-change={this.handleChange}/>
      <div on-click={this.handleClick}>{this.$slots.default}</div>
      {this.uploadStatus !== 2 && this.progressShow?
      <progress-bar abort={this.handleClick} status={this.uploadStatus}  percent={this.percent}></progress-bar>: ''}
      {this.uploadStatus === 0?`上传失败：${this.errorMsg}`:''}
      {this.uploadStatus === 1?'上传成功':''}
    </div>
    )
  }
}
</script>
<style>

</style>
