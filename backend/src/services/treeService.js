import User from "../models/User.js";

const buildTree = async (userId) => {

  const children = await User.find({
    referredBy: userId
  }).select(
    "fullName email referralCode createdAt"
  )

  return Promise.all(
    children.map(async (child) => ({
      ...child.toObject(),

      children: await buildTree(
        child._id
      )
    }))
  );

};

export default buildTree;