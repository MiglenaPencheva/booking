const DATABASE_NAME = 'hotels';

const config = {
    PORT: 6000,
    DB_URI: `mongodb://localhost/${DATABASE_NAME}`,
    SALT_ROUNDS: 10,
    SECRET: 'STAVAMNOGOSOLENO',
    COOKIE_NAME: 'TOKEN',
};

module.exports = config;