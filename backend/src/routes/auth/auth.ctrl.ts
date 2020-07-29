import { Request, RequestHandler } from "express";
import { User } from "../../entity/user";

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const dto = {
      email: req.body.email,
      password: req.body.password,
    };
    //TODO: password Hash 해주기.

    const isExist = await User.isExistByEmailPassword(dto);
    if (!isExist) {
      console.log("존재하지 않는 이메일, 비밀번호로 접속 시도");
      return res
        .status(404)
        .json({ msg: "존재하지 않는 이메일/비밀번호 입니다." });
    }
    if (req.session) {
      req.session.user = {
        email: dto.email,
      };
    }
    return res.status(200).json({ msg: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    if (!req.session) {
      return res.status(403).json({ msg: "잘못된 요청" });
    }
    const sessUser = req.session.user;
    if (!sessUser) {
      console.log("session이 존재하지 않습니다.");
      return res.status(403).json({ msg: "로그아웃 상태입니다." });
    }
    console.log(`USER:${sessUser.email} logout`);
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
    });
    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const dto = {
      email: body.email,
      name: body.name,
      password: body.password,
    };

    const isExist = await User.count({
      email: dto.email,
    });
    if (isExist) {
      console.log("이미 존재하는 이메일로 회원가입 시도");
      return res.status(409).json({ msg: "이미 존재하는 이메일" });
    }
    const user = new User();
    user.email = dto.email;
    user.password = dto.password;
    user.name = dto.name;
    await user.save();

    return res.status(200).json({ msg: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const deleteUserByEmail: RequestHandler = async (req, res, next) => {
  try {
    const email = req.body.email;

    const isExist = await User.findOne({ email });
    if (!isExist) {
      console.log("존재하지 않는 user_id 삭제 요청");
      return res.status(404).json({});
    }
    await isExist.remove();
    return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    // 주어진 비밀번호&이메일이 존재하는지 확인
    const dto = {
      email: req.body.email,
      password: req.body.current_pw,
    };
    const newPassword = req.body.change_pw as string;
    if (!newPassword) {
      console.log("유효하지 않는 입력입니다.[" + newPassword + "]");
      return res.status(400).json({ msg: "유효하지 않은 입력입니다." });
    }
    const oldUser = await User.findOne(dto);
    if (!oldUser) {
      console.log("존재하지 않는 이메일/비밀번호 입니다.");
      return res
        .status(404)
        .json({ msg: "존재하지 않는 이메일/비밀번호 입니다." });
    }
    oldUser.password = newPassword;
    await oldUser.save();
    // 비밀번호를 갱신
    return res.json({ msg: "OK" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};
