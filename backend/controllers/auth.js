import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  res.status(201).json({
    user,
  });
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'User not found',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid password',
    });
  }

  const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });

  res.status(200).json({
    token,
    user,
  });
};
