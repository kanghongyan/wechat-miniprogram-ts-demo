Component({
    properties: {
        hidden: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        handleTap() {
            this.triggerEvent('masktap')
        }
    }
});
