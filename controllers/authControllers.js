const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utils/tokenCreate.js");
const sellerModel = require("../models/sellerModel.js");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel.js");

class authControllers {
  //Login
  admin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 401, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 401, { error: "Email not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //End Login

  //Seller Login
  seller_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 401, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 401, { error: "Email not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  //End Seller Login

  //Seller Register
  seller_register = async (req, res) => {
    const { email, name, password } = req.body;

    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 400, { error: "Email Already Exit" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manualy",
          shopInfo: {},
        });
        await sellerCustomerModel.create({
          myId: seller._id,
        });

        const token = await createToken({
          id: seller._id,
          role: seller.role,
        });

        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        responseReturn(res, 201, { token, message: "Register Success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  //End Seller Register

  //GetUser
  getUser = async (req, res) => {
    const { role, id } = req;

    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("Seller Info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //End GetUser
}

module.exports = new authControllers();
