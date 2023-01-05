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

var defaultGameData = {
           "bitcoin": 0,
           "upgrades": [0, 0, 0, 0],
           "components": []
};

var gameData = defaultGameData;

const app = new Vue({
  el: '#clicker',
  data: {
    bitcoin: 0,
    hashrate: 0,
    upgrades: [0, 0, 0, 0],
    components: [],
    multiplier: 1,
  },
  mounted() {
    if (localStorage.BitcoinClickerGame) {
      var storage = localStorage.getItem('BitcoinClickerGame');
      gameData = JSON.parse(storage);
      this.bitcoin = parseInt(gameData.bitcoin);
      this.components = gameData.components;
      this.upgrades = gameData.upgrades;
      this.hashrate = this.currentHashRate;
    }

    window.setInterval(() => { 
      if (this.currentHashRate > 0) {
        this.increaseBtc(this.currentHashRate);
      }
    }, 1000);

    window.setInterval(() => { 
      this.saveLocalStorage();
    }, 10000);

  },

  methods: {
    increaseBtc : function(amount) {
      this.bitcoin += amount;
    },

    increaseAmelioration : function(id) {
      component = this.components[id];

      if (this.bitcoin >= this.getPrice(component.price)) {
        this.bitcoin -= this.getPrice(component.price);
        component.price = this.getPrice(component.price * 1.15);

        let backupList = this.upgrades;
        backupList[id] += this.multiplier;
        this.upgrades = []
        this.upgrades = backupList;

        this.components[id] = component;
      } else {
        console.log("not enought money");
      }

    },

    setComponents(components) {
      if (localStorage.BitcoinClickerGame) {
        console.log("test");
        var storage = localStorage.getItem('BitcoinClickerGame');
        gameData = JSON.parse(storage);
        this.components = gameData.components;
      } else {
        this.components = components;
        gameData.components = this.components;
        localStorage.setItem("BitcoinClickerGame", JSON.stringify(defaultGameData));
      }

      console.log(this.components);
    },

    setMultiplier(mul) {
      this.multiplier = Number(mul);
    },

    enought(id) {
      return this.bitcoin >= this.getPrice(this.components[id].price) ? 'nes-text is-success' : 'nes-text is-error';
    },

    getPrice(price) {
      if (this.multiplier == 1) {
        return price;
      } else if (this.multiplier == 10) {
        return price * 20.303718238;
      } else if (this.multiplier == 100) {
        return price * 7828749.671335256;
      }
    },

    
    display(id) {
      if (id == 0) {
        return 'nes-container mt-3 hoverDiv is-disabled';
      } 
      else {
        if (this.upgrades[id-1] > 0) {
          return 'nes-container mt-3 hoverDiv is-disabled';
        }
        else {
          return 'invisible';
        }
      }
    },

    saveLocalStorage() {
      gameData.bitcoin = this.bitcoin;
      gameData.components = this.components;
      gameData.upgrades = this.upgrades;
      localStorage.setItem("BitcoinClickerGame", JSON.stringify(gameData));
    }


  },

  computed: {
    currentHashRate() {
      hashrate = 0;
      this.components.forEach((comp) => {
        hashrate += comp.hashrate * this.upgrades[comp.id];
      });

      return hashrate;
    }
  },

  filters: {
    round: function (number) {
      return Math.ceil(Number(number));
    },
    truncate: function (number, decimals) {
      return Number((number).toPrecision(decimals));
    },
  }

});