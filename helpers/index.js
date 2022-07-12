const logger = (...msgs) => {
    console.log(new Date().toISOString(), ...msgs);
};

module.exports = {
    logger,
};
