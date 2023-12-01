$(document).ready(function () {
  const syöttökenttä = $('#syöttökenttä');
  const listanSisältö = $('#tehtävä');

  listanSisältö.sortable({
    update: function () {
      saveData();
    }
  });

  $('#lisääNappi').on('click', function () {
    lisääTehtävä();
  });

  listanSisältö.on('click', 'li', function (e) {
    $(this).toggleClass('tehty');
    saveData();
  });

  listanSisältö.on('click', 'span', function (e) {
    $(this).parent().fadeOut(400, function () {
      $(this).remove();
      saveData();
    });
  });

  function lisääTehtävä() {
    if (syöttökenttä.val().length < 3) {
      syöttökenttä.css({
        border: "2px dotted red",
        borderRadius: "40px"
      });
      alert("Tehtävän täytyy olla vähintään 3 merkkiä pitkä!");
    } else {
      syöttökenttä.css({
        border: "none",
        borderRadius: "none"
      });
      let li = $('<li style="display: none;"></li>').html(syöttökenttä.val());
      listanSisältö.append(li);
      li.fadeIn();
      let span = $('<span>\u00d7</span>');
      li.append(span);
    }
    syöttökenttä.val('');
    saveData();
  }

  function saveData() {
    localStorage.setItem("data", listanSisältö.html());
  }

  function näytäTehtävät() {
    listanSisältö.html(localStorage.getItem("data"));
  }

  näytäTehtävät();
});
