import express from "express";
import {
  assignRole,
  getUsersByRole,
  updateRoleForUser,
} from "../controllers/role.js";

const router = express.Router();
router.post("/role", assignRole);
router.post("/getRole", getUsersByRole);
router.post("/updateRole", updateRoleForUser);

export default router;
