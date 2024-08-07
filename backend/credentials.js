module.exports = {
    mongo: {
        development: {
            connectionString: 'mongodb+srv://ElizabethU:RecipeReaperDB@recipereaper.oc4dbbr.mongodb.net/RecipeReaperData?retryWrites=true&w=majority&appName=RecipeReaper'
        },
        production: {
            connectionString: 'mongodb+srv://ElizabethU:RecipeReaperDB@recipereaper.oc4dbbr.mongodb.net/RecipeReaperData?retryWrites=true&w=majority&appName=RecipeReaper'
        }
    },
    session: {
        secret: "reaperofrecipes",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    }
}