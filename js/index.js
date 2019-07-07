var dialog_default = document.querySelector('#dialog-default');
const NAME_STORAGE = 'click14';


var app = new Vue({
	el: '#app',
	data: {
		coins: 0,
		power: 0, //сила на районе
		auto_coins: 0,
		levels: [
			{
				id: 0,
				text: 'Запрячь брата',
				price: 0.001,
				auto_coins: 0.0001
			},
			{
				id: 1,
				text: 'Поставить на счёчтик',
				price: 0.1,
				auto_coins: 0.001
			},
			{
				id: 2,
				text: 'Крышевать ларёк',
				price: 100,
				auto_coins: 0.1
			},
			{
				id: 3,
				text: 'Защимить лоха',
				price: 1000,
				auto_coins: 0.2
			}
		],
		shop: [
			{
				id: 0,
				text: 'Дать закурить',
				price: 0.0001,
				power: 0.001
			},
			{
				id: 1,
				text: 'Добавить 10 рублей',
				price: 0.01,
				power: 0.002
			},
			{
				id: 2,
				text: 'Name',
				price: 1.0,
				power: 0.5
			}
		],
		lang: {
			ru: {
				shop: 'Магаз',
				money: 'Лавэ',
				power: 'Влияние',
				price: 'Цена',
				ok: 'Понял',
				setting: 'Настройки'
			},
			en: {
				shop: 'Shop',
				money: 'Money',
				power: 'Power',
				price: 'Price',
				ok: 'Okay',
				setting: 'Setting'
			}
		}
	},
	methods: {
		click: () => {

			app.$data.coins += 0.0001;
			save();

		},
		auto: (e) => {
			let id = e.target.dataset.id
			if (app.$data.coins >= app.$data.levels[id].price) {

				app.$data.coins -= app.$data.levels[id].price;
				app.$data.levels[id].price = app.$data.levels[id].price + (app.$data.levels[id].price / 100 * 30);
				app.$data.auto_coins += app.$data.levels[id].auto_coins;

				save();
			} else {
				dialog_default.showModal();
			}
		},
		buy: (e) => {
			let id = e.target.dataset.id
			if (app.$data.coins >= app.$data.shop[id].price) {

				app.$data.coins -= app.$data.shop[id].price;
				app.$data.power += app.$data.shop[id].power;

				save();
			} else {
				dialog_default.showModal();
			}
		},
		restart: () => {
			restart();
		}
	}
});
window.onload = () => {
	if (localStorage.getItem(NAME_STORAGE) != null) {
		app.$data.levels = JSON.parse(localStorage.getItem(NAME_STORAGE)).levels;
		app.$data.shop = JSON.parse(localStorage.getItem(NAME_STORAGE)).shop;
		app.$data.coins = JSON.parse(localStorage.getItem(NAME_STORAGE)).coins
		app.$data.auto_coins = JSON.parse(localStorage.getItem(NAME_STORAGE)).auto_coins
		app.$data.power = JSON.parse(localStorage.getItem(NAME_STORAGE)).power

		save();
	} else {
		save();
	}
}
setInterval(() => {
	app.$data.coins += app.$data.auto_coins;

	save();
}, 1000);
