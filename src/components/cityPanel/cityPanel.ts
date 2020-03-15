Component({
    properties: {
        list: {
            type: Array,
            value: []
        },
        hidden: {
            type: Boolean,
            value: true
        }
    },
    // 不要在同一个节点上使用普通样式类和外部样式类
    externalClasses: ['m-cityPanel__pos'],
    methods: {
        handleSelectCity(e) {
            const dataset = e.currentTarget.dataset || {};

            this.triggerEvent('selectcity', {
                code: dataset.citycode || '',
                name: dataset.cityname || ''
            })
        }
    }
});
