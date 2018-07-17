import * as qiniu from 'qiniu-js'
import progressBar from  './progress'
const noop = () => {}
export default {
  props : {
    header: {
      type: Object
    },
    path: {
      type: String
    },
    name: {
      type: String,
      default: 'file'
    },
    data: {
      type: Object
    },
    percent:{
      type:Number,
      default: 0
    },
    qiniuToken: {
      type: String,
      required:true
    },
    fileList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    onStart:{
      type:Function,
      default:noop
    },
    beforeUpload: Function,
    limit:{
      type:Number,
      default: 1
    },
    onRemove:{
      type:Function,
      default:noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    config: {
      type: Object,
      default:()=>{
        return {}
      }
    },
    autoUpload:{
      type:Boolean,
      default:true
    },
    putExtra: {
      type: Object,
      default: ()=>{
        return {
          fname: "",
          params: {},
          mimeType:  null
        }
      }
    }
  },
  components:{
    progressBar
  },
  methods: {
    /**
     * @name uploadFiles
     * @description 上传文件列表，文件列表长度限制， 文件长度超出回调函数, 是否立即上传
     * @param [file] files
     */
    uploadFiles(files) {
      if(this.limit && this.fileList.length+files.length>this.limit){
        this.onExceed && this.onExceed(files,this.fileList);
        return
      }
      let postFiles = Array.prototype.slice.call(files)
      if(!this.multiple){
        postFiles = postFiles.slice(0,1)
      }
      if(postFiles.length === 0){return}

      postFiles.forEach(rawFile => {
        this.onStart(rawFile);
        if (this.autoUpload) this.upload(rawFile)
      })
    },
    /**
     * @name upload
     * @description 修改文件格式，beforeUpload 钩子实现
     * @param {file} rawFile
     */
    upload(rawFile) {
      this.$refs.upload.value = null
      if (!this.beforeUpload) {
        return this.post(rawFile)
      }
      const before = this.beforeUpload(rawFile);
      if(before && before.then){
        before.then(processedFile =>{
          const fileType = Object.prototype.toString.call(processedFile);
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if(fileType === '[object Blob]'){
              processedFile = new File(processedFile,rawFile.name,{type: rawFile.type})
              for(const p in rawFile) {
                if (rawFile.hasOwnProperty(p)){
                    processedFile[p] = rawFile[p]
                }
              }
            }
            this.post(processedFile)
          } else {
            this.post(rawFile)
          }
        },()=>{
          this.onRemove(null, rawFile)
        })
      }else if(before !== false){
        this.post(rawFile)
      } else{
        this.onRemove(null, rawFile)
      }
    },
    /**
   * @name abort
   * @description 停止上传
   * @param {file} file
   */
  abort(file) {
    const {reqs} = this;
    if (file) {
      let uid = file;
      if (reqs[uid])
        uid = file.uid
      if (reqs[uid]) {
        reqs[uid].abort()
      }
    } else {
      Object
        .keys(reqs)
        .forEach((uid) => {
          if (reqs[uid]) {
            reqs[uid].abort();
          }
          delete reqs[uid]
        })
    }
  },
  post(file) {
    let observable = qiniu.upload(file, `${this.path}/${file.name}`, this.qiniuToken, this.putExtra, this.config)
    let subscription = observable.subscribe(this.onProgress, this.onError, this.onSuccess)
  }
  },
}
