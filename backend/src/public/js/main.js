$(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
    });
});

$(document).ready(function () {
    $("#rightsidebarCollapse").on("click", function () {
        $("#rightsidebar").toggleClass("active");
    });
});

$(document).ready(function () {
    $("#listSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        var cnt = 0;
        $("#myList a").show();
        $("#myList a").filter(function () {
            var isMatched = $(this).text().toLowerCase().indexOf(value) > -1;
            $(this).toggle(isMatched);
            if (isMatched) cnt++;
            if (cnt > 10) {
                $(this).hide();
            }
        });
    });
});

$(document).ready(function () {
    $("#tableSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});
