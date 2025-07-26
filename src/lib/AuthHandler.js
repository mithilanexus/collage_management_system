import bycrypt from "bcryptjs";

const hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bycrypt.compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword ,comparePassword};
