/**
 * 描述：
 * 2017/10/30
 * 作者：高佳
 */

let VideoSearchDataSource = [
	{
		id: '1',
		title: '所有船队',
		items: [
			{
				id: 'item1_0',
				type: '0',
				title: '所有',
				selected: false
			},
			{
				id: 'item1_1',
				type: '1',
				title: '船队1',
				selected: false
			},
			{
				id: 'item1_2',
				type: '2',
				title: '船队2',
				selected: false,
			},
			{
				id: 'item1_3',
				type: '3',
				title: '船队3',
				selected: false,
			},
			{
				id: 'item1_4',
				type: '4',
				title: '船队4',
				selected: false,
			},
			{
				id: 'item1_5',
				type: '5',
				title: '船队5',
				selected: false,
			},
			{
				id: 'item1_6',
				type: '6',
				title: '船队6',
				selected: false,
			},
			{
				id: 'item1_7',
				type: '7',
				title: '船队7',
				selected: false,
			}
		],
		show: false
	},
	{
		id: '2',
		title: '所有船型',
		items: [
			{
				id: 'item2_0',
				type: '0',
				title: '所有',
				selected: false
			},
			{
				id: 'item2_1',
				type: '1',
				title: '抛沙船',
				selected: false
			},
			{
				id: 'item2_2',
				type: '2',
				title: '抛石船',
				selected: false,
			},
			{
				id: 'item2_3',
				type: '3',
				title: '其他',
				selected: false,
			}],
		show: false
	}
];
let VideoDataSource = [
	{
		code: 1,
		name: 'TJ_01',
		captainName: 'jackjackjackjackjackjackjack',
		phone: '12345678910111111111',
		address: '西安'
	},
	{
		code: 2,
		name: 'TJ_02',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
	{
		code: 3,
		name: 'TJ_03',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
	{
		code: 4,
		name: 'TJ_04',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
	{
		code: 5,
		name: 'TJ_05',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
	{
		code: 6,
		name: 'TJ_06',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
	{
		code: 7,
		name: 'TJ_07',
		captainName: 'jack',
		phone: '12345678910',
		address: '西安'
	},
];

module.exports = {
	VideoSearchDataSource: VideoSearchDataSource,
	VideoDataSource: VideoDataSource
};
