new Vue({
  el: "#app",
  data: {
    redirecting: true,
    error: false,
    errorMessage: "",
    qrCodeUrl: "",
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
    async loadRedirect(uniqueId) {
      try {
        // change the API url
        const response = await fetch(
          `https://console.brickmmo.com/api/qr/scan/${uniqueId}`
        );
        const data = await response.json();
        if (!data.error) {
          this.qrCodeUrl = data.qr.url;
          setTimeout(() => {
            window.location.href = data.qr.url;
          }, 20000);
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
