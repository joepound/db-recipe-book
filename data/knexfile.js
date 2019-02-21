module.exports = {
  // For Knex CLI only (use config named "server" for actual dev use) - need to do this for file pathing
  development: {
    client: "sqlite3",
    connection: {
      filename: "./recipe-book.sqlite3"
    },
    useNullAsDefault: true
  },

  // For actual dev use
  devServer: {
    client: "sqlite3",
    connection: {
      filename: "./data/recipe-book.sqlite3"
    },
    useNullAsDefault: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./data/recipe-book.sqlite3"
    },
    useNullAsDefault: true
  }
};
