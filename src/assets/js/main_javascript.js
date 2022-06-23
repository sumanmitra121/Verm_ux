
var togleMenu = document.querySelector('.navbar-toggler');
var body = document.body;
var leftMenuBar = document.querySelector('.sidebar');

togleMenu.onclick = function(){
	body.classList.toggle("sidebar-icon-only");
	leftMenuBar.classList.toggle("active");
}

$("li.nav-item").hover(
  function () {
    $(this).addClass("hover-open");
  },
  function () {
    $(this).removeClass("hover-open");
  }
);

