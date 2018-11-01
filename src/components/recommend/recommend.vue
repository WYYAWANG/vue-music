<template>
    <div class="recommend-content">
        <div class="slider-wrap"></div>
        <div class="recommend-list">
            <h1 class="list-title"></h1>
            <ul></ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
    created() {
        this._getRecommend()
    },
    methods: {
        _getRecommend(){
            getRecommend().then((res)=>{
            if(res.code===ERR_OK){
                console.log(res.data.slider)
            }   
            })
        }
    }       
}
</script>

<style lang="stylus" scoped>

</style>