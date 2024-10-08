import jwt from "jsonwebtoken";

export const checkToken = async (authHeader) => {
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      // eslint-disable-next-line no-undef
      const secretKey = process.env.SECRET_KEY;
      const decodedToken = jwt.verify(token, secretKey);

      if (decodedToken) {
        const {
          userId,
          firstName,
          lastName,
          email,
          countries_visited: countriesVisited,
          friends: friends,
          followers: followers,
        } = decodedToken;

        return {
          userId,
          firstName,
          lastName,
          email,
          countriesVisited,
          friends,
          followers,
        };
      } else {
        return {
          success: false,
          message: "Not authorised",
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Invalid or expired token",
      };
    }
  } else {
    return {
      success: false,
      message: "No token provided",
    };
  }
};
