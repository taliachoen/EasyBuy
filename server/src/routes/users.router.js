const { Router } = require("express") ;
const {
  getUsers,
  getUserById,
  register,
  loginUser,
  getCurrentUser,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  authUser,
  logOut
} = require("../controllers/users.controller.js") ;
const validateResource = require("../middleware/validateResource.js") ;
const {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} = require("../schema/users.schema.js") ;
const { createSessionSchema } = require("../schema/auth.schema.js") ;

const router = Router();

// /api/users

router.get("/", getUsers);

// /api/users/123
router.get("/getUserById/:id", getUserById);

// /api/users

router.post("/register", validateResource(createUserSchema), register);

router.post("/login", validateResource(createSessionSchema), loginUser);

router.get("/me", getCurrentUser);

router.get("/auth",authUser);

router.get("/logout",logOut)

router.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

module.exports = router;
