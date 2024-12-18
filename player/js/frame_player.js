/* 폭죽 플러그인 등록 */
/* gsap.registerPlugin(Physics2DPlugin); */

/* 3초 후 실행 */
setTimeout(function () {
	if ($(".box_wrap_bg").hasClass('active')) {
		$(".bbang").each(function () {
			createParticles($(this)[0]);
		});
	}
}, 2500);

/* 입자 생성 */
function createParticles(bbang) {
	const quantity = 75; // 입자 수
	const colors = ["#FFFF04", "#EA4C89", "#892AB8", "#4AF2FD"];
	const x = -3 // 위치
	const y = 38;

	for (let i = 0; i < quantity; i++) {
		const angle = gsap.utils.random(-150, -20);
		const velocity = gsap.utils.random(20, 150);
		const dot = $("<div></div>");
		dot.css("--b", colors[Math.floor(gsap.utils.random(0, colors.length))]);
		$(bbang).append(dot);

		animateParticle(dot[0], x, y, angle, velocity);
	}
}

/* 입자 애니메이션 */
function animateParticle(dot, x, y, angle, velocity) {
	gsap.set(dot, {
		opacity: 0,
		x: x,
		y: y,
		scale: gsap.utils.random(1.1, 1.4)
	});

	gsap.timeline({
			onComplete: function () {
				$(dot).remove();
			}
		})
		.to(dot, {

			duration: 0.05,
			opacity: 1
		}, 0)
		.to(dot, {
			duration: 1.8,
			rotationX: `-=${gsap.utils.random(720, 1440)}`,
			rotationZ: `+=${gsap.utils.random(720, 1440)}`,
			physics2D: {
				angle: angle,
				velocity: velocity,
				gravity: 120
			}
		}, 0)
		.to(dot, {
			duration: 1,
			opacity: 0
		}, 0.8);
}

$(window).on('load', function () {
	$('.item').draggable({
		revert: "invalid",
		cursor: "move",
		helper: "clone",
		start: function (event, ui) {
			$(this).addClass("dragging");
		},
		stop: function (event, ui) {
			$(this).removeClass("dragging");
		}
	});

	$('.box').droppable({
		accept: ".item",
		drop: function (event, ui) {
			const $ballClone = ui.helper.clone();
			$ballClone.css({
				position: "absolute",
				top: "0",
				left: "0"
			}).appendTo($(this));
			ui.draggable.css({
				visibility: "hidden"
			});

			$(this).css('border', 'none');
			$('.move').css('display', 'none');
			$('.mobon_reset, .gift_set').addClass('active');
			$('.box_wrap_bg').addClass('active');
			$('.gift_title').addClass('active').find('span').text('1등 선물세트 완성!!');

			setTimeout(function () {
				$('.gift_set').removeClass('active');
			}, 1000);

			setTimeout(function () {
				window.location.href = "https://www.dongwonmall.com/index.do";
			}, 2500);
		}
	});
});