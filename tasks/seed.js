const dbConnection = require("../config/mongoConnection");

const data = require("../data");
const userData = data.users;
const postData = data.posts;
const commentData = data.comments;
const bcrypt = require("bcrypt");

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  // GENERATE NEW USER WITH ENCRYPTED PASSWORD
  async function create(username, password) {
    let saltRounds = 10;
    let hash = await bcrypt.hash(password, saltRounds);
    let newUser = await userData.addUser(username, hash);
    return newUser;
  }

  // POPULATE DATABASE WITH NEW USERS

  await create("shannonhobby", "ihavesomanyprojects");
  await create("scottrocks", "imchillin");
  await create("brandyman", "metoo");
  await create("jason", "yeahyousuckshannon");
  await create("jodycourtois", "pancake");
  await create("bretsteiner", "pancakewithsyrup");
  await create("beepboop", "boopbeep");
  const userArray = await userData.getAllUsers();
  console.log(userArray);

  // posts
}

main();
