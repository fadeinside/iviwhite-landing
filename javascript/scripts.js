// Инициировать каждую функцию после загрузки DOM контента
document.addEventListener("DOMContentLoaded", function () {
	updateBottomMenuMove();
	updateMouseUpMenuBehavior();
});


// Функция обновляет поведение страницы при клике мышью на элементы, связанные с нижним и боковым меню. Если пользователь кликает вне этих элементов, то функция удаляет соответствующие атрибуты bottomBarActive и sideBarActive, которые регулируют отображение меню на странице. Это позволяет скрыть меню, если пользователь кликнул вне его области.
function updateMouseUpMenuBehavior() {
	var allStuff = `[bottomBarActive]`;
	var allStuffi = allStuff.split(", ");
	var active = "bottomBarActive";
	var activei = active.split(", ");
	$(document).mouseup(function (e) {
		if (!$(allStuff).is(e.target) && $(allStuff).has(e.target).length === 0) {
			$("body").removeClass("cropOnMobile");
			for (var i = 0; i < activei.length; i++) {
				$(allStuffi[i]).attr(activei[i], null);
			}
		}
	});
}

// Эта функция используется для управления отображением нижнего меню в интерфейсе.
function updateBottomMenuMove() {
	// селектор для элементов, на которые будет навешан обработчик событий
	const bottomTarget = "[data-bottombar]";
	// селектор для меню
	const bottomMenu = ".bottombar, .bottombar-custom";
	// название атрибута, который используется для указания активного состояния меню.
	const active = "bottomBarActive";

	// На элемент, соответствующий селектору bottomTarget, устанавливается обработчик событий click, который находит все элементы, у которых атрибут data-for равен значению атрибута data-bottombar кликнутого элемента.
	$(document).on("click", bottomTarget, function () {
		const $clicked = $(this);
		$(`[data-for="${$clicked.data("bottombar")}"]`).each(function () {
			// Затем на каждом найденном элементе нижнего меню вызывается метод attr(), который устанавливает значение атрибута, указанного в переменной active, в null. 
			$(bottomMenu).attr(active, null);

			// После этого определяется, находится ли элемент меню за пределами экрана, и если это так, то меню перемещается.
			const $parent = $(this).parent(".menuTarget");
			const isBehindTheScreen = $parent.length ?
				($parent.position().left + $(this).outerWidth() + 10 >= $(window).outerWidth()) :
				($(this).position().left + $(this).outerWidth() + 10 >= $(window).outerWidth());

			if (isBehindTheScreen) {
				$(this).css({ right: "10px" });
			} else {
				$(this).css({ right: "unset" });
			}

			// Затем на элементе body добавляется класс cropOnMobile, а на элементе меню устанавливается значение атрибута active в true.
			$("body").addClass("cropOnMobile");
			$(this).attr(active, true);
		});
	});
}