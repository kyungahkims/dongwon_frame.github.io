$(window).on('load', function () {
	const classes = ['new', 'hot', 'up', 'down', 'hyphen'];
	const classCounts = {
		new: 0,
		hot: 0,
		up: 0,
		down: 0,
		hyphen: 0
	};
	const maxCount = 2;

	/* 아이콘 랜덤 */
	function getRandomClass() {
		let randomClass;
		do {
			randomClass = classes[Math.floor(Math.random() * classes.length)];
		} while (classCounts[randomClass] >= maxCount);
		return randomClass;
	}

	$('ul li').find('.random').each(function () {
		const randomClass = getRandomClass();
		classCounts[randomClass]++;
		$(this).addClass(randomClass);
	});
});

/* 임시 */
$('.mobon_box').click(function () {
	window.location.href = "https://www.dongwonmall.com/index.do";
});