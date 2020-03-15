Component({
    methods: {
        handleSearch(e) {
            this.triggerEvent('inputconfirm', {
                value: e.detail.value
            })
        },
        handleInputFocus() {
            this.triggerEvent('inputfocus')
        },
        handleClear(e) {
            this.triggerEvent('inputclear', e.detail, e)
        }
    }
});
