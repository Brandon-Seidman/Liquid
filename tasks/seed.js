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
    "My Protein Shake",
    "Grab a big hunking handful of frozen fruit. Then what you're gonna do is add in about 1 cup of milk. Mix in 1 scoop of protein powder. Shake. Blend. Shake. Blend.",
    ["frozen fruit of choice 2 cups", "1 cup milk", "1 scoop protein powder"]
  );

  let comment1 = await commentData.addComment(
    "jodycourtois",
    "Sounds gross who even works out anymore",
    "Yuck"
  );
  await postData.addComment(shannonPost._id, comment1._id);
  let comment2 = await commentData.addComment(
    "beepboop",
    "I think it tastes great, it just gets a little chunky with the fruit. Any advice on how to make my smoothie smoothier? ",
    "Chunky in Chinatown"
  );
  await postData.addComment(shannonPost._id, comment2._id);
  let comment3 = await commentData.addComment(
    "bretsteiner",
    "I drink this everyday it's so good",
    "One of my faves!"
  );
  await postData.addComment(shannonPost._id, comment3._id);
  let scottPost = await postData.addpost(
    "scottrocks",
    "Margarita for 1",
    "First prep your glass. Combine all of the ingredients in a cocktail shaker and shake shake shake! Add sweetener to taste. Strain and serve on the rocks.",
    ["Tequila", "Freshly-squeezed lime juice", "Orange liqueur"]
  );
  let comment4 = await commentData.addComment(
    "bretsteiner",
    "So good! I could have 12 of these",
    "MmmmmmmMMM"
  );
  await postData.addComment(scottPost._id, comment4._id);
  let jasonPost = await postData.addpost(
    "jasonscool",
    "Vesper",
    ".5 part lillet blanc, 3 parts plymouth gin and 1 part absolut elyx vodka. Stir over ice and strain into a martini glass. Garnish with a lemon twist. Thank me later.",
    ["Lillet Blanc", "Plymouth Gin", "Absolut Elyx Vodka"]
  );
  let brandonPost = await postData.addpost(
    "brandyman",
    "Easy Whiskey Sour",
    "Shake up all of the ingredients in a cocktail shaker with ice! 4 Tablespoons bourbon whiskey, 2 tablespoons fresh lemon juice, 1 and a half tablespoons pure maple syrup, garnish with orange peel and cockatil cherry, and finally ice for serving",
    ["Maple Syrup", "Whiskey", "Ice", "Orange Peel", "Lemon Juice"]
  );
  let comment5 = await commentData.addComment(
    "shannonhobby",
    "I wasn't sure about the maple syrup at first but now i'm on board",
    "uuuuhh... this slaps?"
  );
  await postData.addComment(brandonPost._id, comment5._id);
}

main();
