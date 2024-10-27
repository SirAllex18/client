import Party from "../models/Party.js";
import User from "../models/Users.js";

export const assignRole = async (req, res) => {
  try {
    const { roleUser, firstName, lastName, buget, id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = roleUser;
    await user.save();

    const existingParty = await Party.findOne({ role: roleUser });
    const userInfo = { firstName, lastName, buget };

    if (existingParty) {
      existingParty.users.push(userInfo);
      await existingParty.save();
    } else {
      await Party.create({ role: roleUser, users: [userInfo] });
    }

    return res
      .status(200)
      .json({ message: "Role assigned successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { roleToFind } = req.body;

    const roleFind = await Party.findOne({ role: roleToFind });
    const users = roleFind.users;
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
};

export const updateRoleForUser = async (req, res) => {
  try {
    const { id, roleUser, name } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const oldRole = user.role;
    user.role = roleUser;
    await user.save();

    if (oldRole) {
      await Party.findOneAndUpdate(
        { role: oldRole },
        { $pull: { users: { firstName: user.firstName, lastName: user.lastName } } },
        { new: true }
      );
    }

    const newParty = await Party.findOne({ role: roleUser });
    const userInfo = { firstName: user.firstName, lastName: user.lastName, buget: user.buget };

    if (newParty) {
      newParty.users.push(userInfo);
      await newParty.save();
    } else {
      await Party.create({ role: roleUser, users: [userInfo] });
    }

    res
      .status(200)
      .json({ message: "Role updated successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
