new Vue({
    el: '#app',
    data: {
        redirecting: true,
        error: false,
        errorMessage: ''
    },
    created() {
        const uniqueId = window.location.pathname.split('/').pop();
        //const uniqueId = "670e0665c41cd"
        this.callApi(uniqueId);
    },
    methods: {
        async callApi(uniqueId) {
            try {
                const response = await fetch(`http://local.console.brickmmo.com:7777/api/qr/redirect/id/${uniqueId}`);
                const data = await response.json();

                if (!data.error) {
                    window.location.href = data.redirect_url;
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                this.error = true;
                this.errorMessage = err.message;
                this.redirecting = false; 
            }
        }
    }
});
