import { userModel } from "../../../../database/models/user.model.js";
import { AppError, asyncHandler } from "../../../utils/errorHandling.js";
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';





const signUp = asyncHandler(async (req, res) => {
          const { name, phone, password } = req.body;
          const cheekUser = await userModel.findOne({ phone });
          if (cheekUser) {
                    return next(new Error('User already exists'));
          }
          const user = new userModel({ name, phone, password });
          await user.save();
          const token = Jwt.sign({
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    role: 'CLIENT',
          }, process.env.JWT_SECRET, { expiresIn: '1d' })

          return res.status(200).json({ message: " Success", token });
})

const login = asyncHandler(async (req, res, next) => {
          const { phone, password } = req.body;

          const user = await userModel.findOne({ phone });
          if (!user || !bcrypt.compareSync(password, user.password)) {
                    return next(new Error('Invalid Phone or password'));
          }

          // Generate JWT token
          const token = Jwt.sign(
                    {
                              id: user._id,
                              name: user.name,
                              phone: user.phone,
                              role: 'CLIENT',
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
          );

          // Send response
          res.status(200).json({ message: "Login Success", token });
});
export {
          signUp,
          login
}