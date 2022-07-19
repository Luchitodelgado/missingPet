module.exports = (sequelize, dataTypes) => {
    let alias = 'Humano';
    let cols = {
        id_humano: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreUsuario: {
            type: dataTypes.STRING
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        telefono: {
            type: dataTypes.INTEGER
        },
        domicilio: {
            type: dataTypes.STRING
        },
        fotoPerfil: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
    };
    let config = {
        tableName: 'humano',
        timestamps: false
    };
    const Humano = sequelize.define(alias, cols, config)

    return Humano

}
