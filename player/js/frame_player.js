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

	$('.box_group').droppable({
		accept: ".item",
		drop: function (event, ui) {
			const closestBox = $(this).find('.box:not(:has(*))').first();

			if (closestBox.length > 0) {
				const ballClone = ui.helper.clone();

				if (ui.draggable.hasClass('tuna')) {
					ballClone.css({
						position: "absolute",
						top: "0%",
						left: "0%",
					}).appendTo(closestBox);
					ui.draggable.css({
						visibility: "hidden"
					});

					closestBox.css('border', 'none');
					$('.move').css('display', 'none');
					$('.mobon_reset, .gift_set').addClass('active');
					$('.box_wrap_bg').addClass('active');
					$('.gift_title').addClass('active').find('span').text('1등 선물세트 완성!!');

					setTimeout(function () {
						$('.gift_set').removeClass('active');
					}, 1000);

					if ($(".box_wrap_bg").hasClass('active') && $(".box_wrap_bg #drawing_canvas").length > 0) {
						drawing_canvas();
					}

					setTimeout(function () {
						window.location.href = "https://www.dongwonmall.com/index.do";
					}, 2500);
				} else {
					ui.draggable.css({
						visibility: "hidden"
					});
					$('.fail_modal').css('display', 'flex');
					setTimeout(function () {
						$('.fail_modal').css('display', 'none');
						ui.draggable.css({
							visibility: "visible"
						});
					}, 2000);
				}
			}
		}
	});
});