<script>
import '../lib/font/iconfont.css'
export default {
  props:{
    percent:{
      type: Number,
      default: 0
    },
    status:{
      type:Number,
      default: -2
    },
    abort:{
      type:Function,
      default:function(event){
        this.$emit('clear')
        return false
      }
    }
  },
  render(){
    const iconStatus={
      class:['icon-guanbi','iconfont'],
      on:{
        click: this.abort
      }
    }
    return (
      <div class="progress">
        <div class="progress-bar" style={{'width': `${this.percent}%`}}>{this.percent}%</div> <i {...iconStatus}></i>
      </div>
    )
  }

}
</script>
<style>
  .icon-guanbi{
    position: absolute;
    right: -30px;
    z-index: 99;
    height: 20px;
  }
  .progress {
    position: relative;
    margin-right: 40px;
    height: 20px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
}
.progress-bar {
    float: left;
    width: 0;
    height: 100%;
    border-radius: 4px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    -webkit-transition: width .6s ease;
    -o-transition: width .6s ease;
    transition: width .6s ease;
}
</style>
