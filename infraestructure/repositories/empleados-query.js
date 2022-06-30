const { db } = require('./connections');
const TableName = 'empleados';


const data = [
    {
        id: 1,
        primer_nombre: "José",
        segundo_nombre: "Felix",
        primer_apellido: "Ribas",
        segundo_apellido: "Caldera",
        fecha_nacimiento: new Date('2000-01-20'),
        tipo_identificacion: "cc",
        numero_identificacion: "3131588",
        sueldo: 2000.0
    },
    {
        id: 2,
        primer_nombre: "Kelvin",
        segundo_nombre: "Rafael",
        primer_apellido: "Mosquera",
        segundo_apellido: "Betancourt",
        fecha_nacimiento: new Date('197-06-20'),
        tipo_identificacion: "nit",
        numero_identificacion: "66654847",
        sueldo: 3000.0
    },
];

const findEmpleados = async () => {
    return db.select().table(TableName);
}

const findOneEmpleado = async (id) => {
    return db.select().where('id', id).table(TableName);
}

const createEmpleado = async ({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    tipo_identificacion,
    numero_identificacion,
    sueldo
}) => {
    await db(TableName).insert({
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        fecha_nacimiento,
        tipo_identificacion,
        numero_identificacion,
        sueldo
    });
}
const updateEmpleado = async ({
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    fecha_nacimiento,
    tipo_identificacion,
    numero_identificacion,
    sueldo
}, id) => {
    await db(TableName)
        .where('id', '=', id)
        .update({
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            fecha_nacimiento,
            tipo_identificacion,
            numero_identificacion,
            sueldo
        })
}

const deleteEmpleado = async (id) => {
    await db(TableName)
        .where('id', id)
        .del();
}

const getEmpleadoByTipoNumeroIdentificacion = async (
    tipoIdentificacion,
    numeroIdentificacion, 
    id = null) => {
    let conditions = {
        tipo_identificacion: tipoIdentificacion,
        numero_identificacion: numeroIdentificacion
    }
    let query = db.select().where(conditions)
    if (id)
        query.whereNot('id', id);
    return query.table(TableName);
}

module.exports = {
    findEmpleados,
    findOneEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    getEmpleadoByTipoNumeroIdentificacion,
}
