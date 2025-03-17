import argon2 from "argon2";

const hashpassword = async (password) => {
  try {
    const hashedpassword = await argon2.hash(password);
    return hashedpassword;
  } catch (error) {
    return null;
  }
};

const comparepassword = async (enteredpassword, hashedpassword) => {
  return await argon2.verify(hashedpassword, enteredpassword);
};

export { hashpassword, comparepassword };
