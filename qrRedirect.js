new Vue({
    el: '#app',
    data: {
        redirecting: true,
        error: false,
        errorMessage: '',
        qrCodes: []
    },
    created() {
        const uniqueId = window.location.hash.split('/').pop();

        if (!uniqueId || uniqueId === '') {
            this.fetchQrCodeList();
        } else {
            this.callApi(uniqueId);
        }
    },
    methods: {
        async callApi(uniqueId) {
            try {
                // change the API url
                const response = await fetch(`http://local.console.brickmmo.com:7777/api/qr/redirect/id/${uniqueId}`);
                const data = await response.json();

                if (!data.error) {
                    setTimeout(() => {
                        window.location.href = data.redirect_url;
                    }, 3000);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                this.error = true;
                this.errorMessage = err.message;
                this.redirecting = false;
            }
        },

        // Fetch the list of all QR codes when no ID is provided
        async fetchQrCodeList() {
            try {
                //change the API url
                const response = await fetch('http://local.console.brickmmo.com:7777/api/qr/list');
                const text = await response.text(); 
                const data = JSON.parse(text);

                if (!data.error) {
                    this.qrCodes = data.qr_codes;
                    this.redirecting = false;
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
