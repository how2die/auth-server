'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('credential', {
        userid: {
            type: type.STRING,
            primaryKey: true
        },
        password: type.STRING
    });
};
