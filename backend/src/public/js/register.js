window.onload = function () {
  $(".form-register").on("submit", registerHandler);
};
class apiController {
  constructor() {
    this.url = "http://192.249.19.243:8780/api/";
  }
  register(data) {
    const apiPath = "auth/register";
    return this._postData(apiPath, data);
  }
  async _postData(apiPath, data) {
    return fetch(this.url + apiPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.status);
  }
}

const Api = new apiController();

function registerHandler(event) {
  event.preventDefault();
  const email = $("#inputEmail").val();
  const password1 = $("#inputPassword").val();
  const password2 = $("#inputPassword2").val();
  const name = $("#inputName").val();

  const registerForm = {
    email,
    password1,
    password2,
    name,
  };
  if (validationInput(registerForm)) {
    //TODO: 회원가입 함수로 빼기
    Api.register({ email, password: password1, name }).then((status) => {
      console.log("status: " + status);
      if (status == 200) {
        alert("회원가입 성공");
        $(location).attr("href", "http://192.249.19.243:8780/");
      } else {
        alert("회원가입 실패");
        location.reload(true);
      }
    });
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
}
function validationInput(registerForm) {
  const { email, password1, password2, name } = registerForm;
  if (
    email.length > 0 &&
    password1.length > 0 &&
    password2.length > 0 &&
    name.length > 0 &&
    confirmPassword(password1, password2)
  )
    return true;
  else return false;
}

function confirmPassword(password1, password2) {
  if (password1 != password2) {
    return false;
  } else {
    return true;
  }
}
