new Vue({
  el: "#app",
  data: {
    redirecting: true,
    error: false,
    errorMessage: "",
    qrCodeUrl: "",
    countDown: 5,
  },
  created() {
    let uniqueId = window.location.href.split("/").pop();
    uniqueId = uniqueId.replace("#", "");

    if (!uniqueId || uniqueId === "") {
      this.displayList();
    } else {
      this.loadRedirect(uniqueId);
    }
  },
  methods: {
    async incCountDown() {
      setTimeout(() => {
        if (this.countDown > 0) {
          this.countDown--;
          console.log(this.countDown);
          this.incCountDown();
        } else {
          window.location.href = this.qrCodeUrl;
        }
      }, 1000);
    },
    async loadRedirect(uniqueId) {
      try {
        const response = await fetch(
          `https://console.brickmmo.com/api/qr/scan/${uniqueId}`
        );
        const data = await response.json();
        if (!data.error) {
          this.qrCodeUrl = data.qr.url;
          this.incCountDown();
          console.log(data.qr.url);
          console.log(this.qrCodeUrl);
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
    async displayList() {
      window.location.href = "/";
    },
  },
});
