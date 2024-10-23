new Vue({
  el: "#app",
  data: {
    redirecting: true,
    error: false,
    errorMessage: "",
    qrCodes: [],
  },
  created() {
    let uniqueId = window.location.pathname.split("/").pop();
    uniqueId = uniqueId.replace("#", "");
    if (!uniqueId || uniqueId === "") {
      this.fetchQrCodeList();
    } else {
      this.callApi(uniqueId);
    }
  },
  methods: {
    async callApi(uniqueId) {
      try {
        // change the API url
        const response = await fetch(
          `https://console.brickmmo.com/api/qr/scan/${uniqueId}`
        );
        const data = await response.json();
        if (!data.error) {
          setTimeout(() => {
            window.location.href = data.qr.url;
            console.log(data);
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
        const response = await fetch(
          "https://console.brickmmo.com/api/qr/list"
        );
        const text = await response.text();
        const data = JSON.parse(text);

        if (!data.error) {
          this.qrCodes = data.qrs;
          this.redirecting = false;
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        this.error = true;
        this.errorMessage = err.message;
        this.redirecting = false;
      }
    },
  },
});
