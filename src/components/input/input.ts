// todo: 优化input组件的封装

Component({
    behaviors: ['wx://form-field'],
    externalClasses: ['m-input__custom'],
    properties: {
        initValue: {
            type: String,
            value: '',
            observer(newVal: string) {
                this.setData({
                    value: newVal
                })
            }
        },
        type: {
            type: String,
            value: 'text'
        },
        placeholder: {
            type: String,
            value: ''
        },
        name: {
            type: String,
            value: ''
        },
        maxlength: {
            type: Number,
            value: 140
        },

        // todo: 封装原始input，重命名原来的conform-type
        confirmtype: {
            type: String,
            value: 'done'
        },
        // todo: 传入 placeholderclass 类型。现在只定义了两个
        placeholderclasstype: {
            type: String,
            value: 'text'  // 表单类型'text' 首页搜索'search'
        }
    },
    methods: {
        handleClearInput() {
            this.triggerEvent('clear', {value: ''});
            this.setData({
                value: ''
            })
        },
        bindinput(e) {

            const value = e.detail.value;

            this.triggerEvent('input', e.detail, e);
            this.setData({
                value: value
            })
        },
        bindblur(e) {
            this.triggerEvent('blur', e.detail, e);
        },
        bindconfirm(e) {
            this.triggerEvent('confirm', e.detail, e);
        },
        bindfocus(e) {
            this.triggerEvent('focus', e.detail, e);
        }
    }
});
