const BASE_URL = "http://192.249.19.243:8780/";
// const BASE_URL = "http://localhost:8081/";

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
        $("#myList label").show();
        $("#myList label").filter(function () {
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

$(document).ready(function () {
    $("#logoutBtn").on("click", function () {
        console.log("로그아웃 시도");
        doLogout();
    });
});

function doLogout() {
    fetch(BASE_URL + "api/auth/logout")
        .then((response) => response.json())
        .then((data) => {
            $(location).attr("href", BASE_URL);
        })
        .catch((err) => console.error(err));
}
