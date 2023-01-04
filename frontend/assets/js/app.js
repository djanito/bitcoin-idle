function b64e(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function b64d(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  }).join(''));
}

const twoDecimal = num => Number((num).toPrecision(3));

var defaultGameData = {
           "bitcoin": 0,
           "upgrades": {
              "mouse": {
                "owned" : 0,
                "bought" : 0,
                "cookieProduced" : 0,
              },
              "mousepad": {
                "owned" : 0,
                "bought" : 0,
                "cookieProduced" : 0,
              },
              "headset": {
                "owned" : 0,
                "bought" : 0,
                "cookieProduced" : 0,
              }
           }
};

var gameData = defaultGameData;

const app = new Vue({
  el: '#clicker',
  data: {
    bitcoin: 0,
    hashrate: 0,
    upgrades: [0, 0, 0, 0],
    components: [],
  },
  mounted() {
    if (localStorage.BitcoinClickerGame) {
      var storage = localStorage.getItem('BitcoinClickerGame');
      gameData = JSON.parse(storage);
      this.bitcoin = parseInt(gameData.bitcoin);
    } else {
      localStorage.setItem("BitcoinClickerGame", JSON.stringify(defaultGameData));
    }

    window.setInterval(() => { 
      if (this.currentHashRate > 0) {
        this.increaseBtc(this.currentHashRate);
      }
    }, 1000);
  },

  methods: {
    increaseBtc : function(amount) {
      this.bitcoin = twoDecimal(this.bitcoin + amount);
      //gameData.bitcoin = this.bitcoin;
      //localStorage.setItem("BitcoinClickerGame", JSON.stringify(gameData));
    },

    increaseAmelioration : function(id) {
      component = this.components[id];

      console.log(component);

      if (this.bitcoin >= component.price) {
        this.bitcoin = twoDecimal(this.bitcoin -  component.price);
        component.price = twoDecimal(component.price * 1.15);

        let backupList = this.upgrades;
        backupList[id]++;
        this.upgrades = []
        this.upgrades = backupList;

        this.components[id] = component;
      } else {
        console.log("not enought money");
      }

    },

    enought(id) {
      return this.bitcoin >= this.components[id].price ? 'nes-text is-success' : 'nes-text is-error'
    }
  },

  computed: {
    currentHashRate() {
      hashrate = 0;
      this.components.forEach((comp) => {
        hashrate += comp.hashrate * this.upgrades[comp.id];
      });

      return twoDecimal(hashrate);
    }
  },

});