new Vue({
  el: "#app",
  data: {
    error: false,
    errorMessage: "",
    qrCodes: [],
  },
  created() {
    this.fetchQrCodeList();
  },
  methods: {
    // Fetch the list of all QR codes when no ID is provided
    async fetchQrCodeList() {
      try {
        //change the API url
        const response = await fetch(
          "https://api.brickmmo.com/qr/list"
        );
        const text = await response.text();
        const data = JSON.parse(text);

        if (!data.error) {
          this.qrCodes = data.qrs;
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        this.error = true;
        this.errorMessage = err.message;
      }
    },
  },
});
