var save = (name, value) => {
		localStorage.setItem(name, value);
}

const NAME_GAME = 'game-click';


var app = new Vue({
	el: '#app',
	data: {
		clicks: 0
	},
	methods: {
		click: function() {
			app.$data.clicks++;
			save(NAME_GAME, app.$data.clicks);
		}
	}
});
if (localStorage.getItem(NAME_GAME) != null) {
	app.$data.clicks = localStorage.getItem(NAME_GAME);
} else {
	localStorage.setItem(NAME_GAME, 0);
}