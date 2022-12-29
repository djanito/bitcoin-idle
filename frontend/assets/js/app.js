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
    upgrades: {"0":0, "1":0, "2":0, "3":0}
  },
  mounted() {
    if (localStorage.BitcoinClickerGame) {
      var storage = localStorage.getItem('BitcoinClickerGame');
      gameData = JSON.parse(storage);
      this.bitcoin = parseInt(gameData.bitcoin);
    } else {
      localStorage.setItem("BitcoinClickerGame", JSON.stringify(defaultGameData));
    }
  },

  methods: {
    increaseBtc : function() {
      this.bitcoin += 1;
      gameData.bitcoin = this.bitcoin;
      localStorage.setItem("BitcoinClickerGame", JSON.stringify(gameData));
    },

    increaseAmelioration : function(ind) {
      this.upgrades[ind] += 1;
      gameData.bitcoin = this.bitcoin;
      localStorage.setItem("BitcoinClickerGame", JSON.stringify(gameData));
    },
  }
});