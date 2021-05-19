const dbConnection = require("../config/mongoConnection");

const data = require("../data");
const userData = data.users;
const postData = data.posts;
const commentData = data.comments;
const lockedPostData = data.lockedPosts;
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

  let brandonPost2 = await postData.addpost(
    "brandyman",
    "Rosemary Greyhound Cocktail",
    "Heat the water and sugar over medium heat for approximately 5 minutes, making sure to not let it boil to the point that the sugar crystalizes (Image 1). While warm, pour the simple syrup over the rosemary sprigs inside a bottle (Image 2). Set aside a few sprigs for garnishing your cocktails later. Source: https://www.hgtv.com/lifestyle/entertaining/rosemary-greyhound-with-simple-syrup-recipe-pictures",
    [
      "2 ounces vodka",
      "1/2 ounce rosemary simple syrup",
      "4 ounces grapefruit",
      "rosemary sprigs, for garnish",
      "2 cups water",
      "2 cups sugar",
      "6 sprigs rosemary",
    ]
  );

  let shannonPost2 = await postData.addpost(
    "shannonhobby",
    "Blackberry + Honeysuckle Spritz",
    "In a pot over medium heat, add blackberries, sugar, water and lemon juice. Bring to a boil, cover, then reduce and simmer for about 20 minutes to allow the blackberries to break down and release their juice. Allow to cool, then transfer simple syrup, including blackberries, to a lidded glass container and refrigerate for up to 2 weeks. Note: This yields about 2 cups of simple syrup, which is enough for approximately 10 cocktails.",
    [
      "blackberries",
      "1 cup sugar",
      "1 cup water",
      "1 tbs lemon juice",
      "cathead honeysuckle vodka",
      "soda water",
      "prosecco",
      "fresh lavender stems as garnish",
      " fresh blackberries as garnish",
    ]
  );
  await lockedPostData.addpost(
    "Watermelon Refresher",
    "*For the watermelon-strawberry juice, blend equal amounts (by weight) of watermelon and strawberries. Strain the juice through a fine-mesh strainer into a pitcher or large measuring cup and refrigerate until needed. \n  For the Basil-Ginger Simple Syrup, you'll need 1 cup water, 1 cup sugar, 1 two-inch piece of ginger, peeled and thinly sliced, Handful of fresh basil.In a medium saucepan, heat the water and sugar over medium heat until the sugar is completely dissolved. Add the ginger and basil, and immediately remove from heat, allowing it to steep until cool. Strain the syrup into a jar through a fine-mesh strainer and refrigerate. Yields approximately one cup of syrup, and will keep refrigerated for two to three weeks. \n Add all ingredients to an ice filled shaker glass.\n Shake and strain over fresh ice in a festive glass.\n https://www.stylemepretty.com/2014/06/04/signature-cocktail-summer-watermelon-refresher/",
    [
      "Hangar one vodka",
      "Watermelon-strawberry juice",
      "Basil-ginger Syrup",
      "lime juice",
    ],
    11
  );
  await lockedPostData.addpost(
    "A Christmas Mint Julep",
    "Combine all ingredients in a stock pot and bring to a boil. Reduce the heat and simmer for 45 minutes. Strain the simple syrup and refrigerate in an air-tight container. \n Muddle the mint leaves and simple syrup. Add bourbon and serve in a traditional mint julep cup over crushed ice. Top with club soda and garnish with a sprig of rosemary and three fresh cranberries.\n https://www.hgtv.com/outdoors/gardens/garden-to-table/a-christmas-mint-julep",
    [
      "32 ounces water",
      "16 ounces sugar",
      "1 pint fresh cranberries",
      "10 sprigs rosemary (7-10 inches long)",
      "2 ½ ounces Maker’s Mark bourbon",
      "¾ ounces club soda",
      "5 mint leaves",
    ],
    50
  );
  await lockedPostData.addpost(
    "Berry Rose Mojito",
    "In a small bowl, muddle together strawberries, juice from half a lime and 1 teaspoon of sugar.\n Muddle mint and remaining sugar in the bottom of a highball glass.\n Add ice and strawberry mixture to a cocktail shaker. Pour in Rosé.\n Shake until cold. Pour through strainer into glass. Garnish with lime and mint. \n https://www.hgtv.com/design/design-blog/entertaining/berry-rose-mojito-recipe",
    [
      "3 strawberries, sliced",
      "half a lime, plus other half for garnish",
      "6-8 mint leaves",
      "2 teaspoons of sugar",
      "6 ounces sparkling rosé",
    ],
    15
  );
  await lockedPostData.addpost(
    "Lazy Sunday Mimosa",
    "he'll never know ",
    [";)"],
    100
  );
}

main().then(() => process.exit());
