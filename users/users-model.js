const db = require("../database/dbConfig");

module.exports = {
    add,
    find,
    findBy,
    findById,
    deleteUser,
}

function find() {
    return db("users").select("id", "username").orderBy("id")
}

function findBy(filter) {
    return db("users").where(filter).orderBy("id")
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id")
        return findById(id)
    } catch (error) {
        throw error
    }
}

function findById(id) {
    return db("users").where({ id }).first();
}

function deleteUser(id) {
    return db("users")
        .where({ id: id })
        .then((removedUser) => {
            return db("users")
                .where({ id: id })
                .first()
                .del()
                .then(() => {
                    return removedUser
                })
        })
}