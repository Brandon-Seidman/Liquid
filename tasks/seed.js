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
  await create("jasonscool", "yeahyousuckshannon");
  await create("jodycourtois", "pancake");
  await create("bretsteiner", "pancakewithsyrup");
  await create("beepboop", "boopbeep");
  const userArray = await userData.getAllUsers();
  console.log(userArray);

  // posts
  let shannonPost = await postData.addpost(
    "shannonhobby",
    "My Protien Shake",
    "Grab a big hunking handful of frozen fruit. Then what you're gonna do is add in about 1 cup of milk. Mix in 1 scoop of protein powder. Shake. Blend. Shake. Blend.",
    ["frozen fruit of choice 2 cups", "1 cup milk", "1 scoop protein powder"]
  );
  let scottPost = await postData.addpost(
    "scottrocks",
    "Margarita for 1",
    "First prep your glass. Combine all of the ingredients in a cocktail shaker and shake shake shake! Add sweetener to taste. Strain and serve on the rocks.",
    ["Tequila", "Freshly-squeezed lime juice", "Orange liqueur"]
  );
  let jasonPost = await postData.addpost(
    "jasonscool",
    "Vesper",
    ".5 part lillet blanc, 3 parts plymouth gin and 1 part absolut elyx vodka. Stir over ice and strain into a martini glass. Garnish with a lemon twist. Thank me later.",
    ["Lillet Blanc", "Plymouth Gin", "Absolut Elyx Vodka"]
  );
  let jasonPost = await postData.addpost(
    "jasonscool",
    "Vesper",
    ".5 part lillet blanc, 3 parts plymouth gin and 1 part absolut elyx vodka. Stir over ice and strain into a martini glass. Garnish with a lemon twist. Thank me later.",
    ["Lillet Blanc", "Plymouth Gin", "Absolut Elyx Vodka"]
  );
}

main();
