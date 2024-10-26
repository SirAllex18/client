import Party from "../models/Party.js";
import User from "../models/Users.js";

export const assignRole = async (req, res) => {
  try {
    const { roleUser, firstName, lastName, buget, id } = req.body;

    // Fetch user by ID
    const user = await User.findById(id);

    if (!user) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role) {
      return res
        .status(400)
        .json({ error: "User already has a role assigned" });
    }

    user.role = roleUser;
    await user.save();

    return res
      .status(200)
      .json({ message: "Role assigned successfully", user });
  } catch (error) {
    console.error(error);
    // Send error response
    return res.status(500).json({ error: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { roleToFind } = req.body;
    console.log(roleToFind);
    const roleFind = await Party.findOne({ role: roleToFind });
    const users = roleFind.users;
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
};

export const updateRoleForUser = async (req, res) => {
  try {
    const { id, roleUser } = req.body;

    const updatedUserRole = await User.findByIdAndUpdate(
      id,
      { role: roleUser },
      { new: true, runValidators: true }
    );
    if (!updatedUserRole) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUserRole });
  } catch (err) {
    console.log(err);
  }
};
