const errorManager = (err, req, res, next) => {
    console.log(err);
    switch (err.name) {
      case "ValidationErrorItem":
      case "SequelizeValidationError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "NoInput":
        res.status(400).json({ message: "Please input email/password" });
        break;
      case "WrongPass":
        res.status(401).json({ message: "Invalid Password" });
        break;
      case "Unauthorized":
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid Token" });
        break;
      case "UserNotFound":
        res.status(404).json({ message: "User not found" });
        break;
      case "NotFound":
        res.status(404).json({ message: "Data not found" });
        break;
      case "Forbidden":
        res.status(401).json({ message: "Forbidden" });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  };
  
  module.exports = { errorManager };
  