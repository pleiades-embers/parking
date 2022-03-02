import { getFrontAmapGeocodeRegeo } from "/application/api/address";
Component({
  mixins: [],
  data: {
    index: 0,
    subsiteName: "",
    drawerShow: false
  },
  props: {
    main: 0,
    buttons: [],
    drawerSwitch: "off",
    drawer: [],
    search: null,
    position: 0,
    style: {
      backgroundColor: "#FFFFFF",
      color: "#000000"
    }
  },
  async didMount() {
    const { latitude, longitude } = await my.getLocation({ type: "gcj02" });
    const location={
      lat: latitude,
      lon: longitude
    }
    getApp().globalData.location = location;

    this.initRegeo(location);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    async initRegeo(location) {
      const { lat, lon } = location;
      const {
        data: { formattedAddress }
      } = await getFrontAmapGeocodeRegeo(`${lon},${lat}`);
      this.setData({
        subsiteName: formattedAddress
      });
    }
  }
});
