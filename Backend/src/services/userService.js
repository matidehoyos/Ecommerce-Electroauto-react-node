const { User } = require("../../db.js");

const findUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error(error);
    }
}

const findUserById = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

const findUserByEmailMP = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user.dataValues
    } catch (error) {
        throw new Error(error);
    }
}

const createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
}

const deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

const updateUser = async (id, preferenceUser) => {
    try {
        const user = await User.findByPk(id);
        if(!user) {
            throw new Error('Usuario no encontrado');
        }
        user.compra = preferenceUser;
        await user.save();
        return user.dataValues;
    } catch (error) {
        throw new Error(error);
    }
};


const suspendUser = async (id) => {
    try {
        return await User.findByIdAndUpdate(id, { suspended: true });
    } catch (error) {
        throw new Error(error);
    }
}

const unsuspendUser = async (id) => {
    try {
        return await User.findByIdAndUpdate(id, { suspended: false });
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = { findUsers, findUserById, findUserByEmail, createUser, deleteUser, updateUser, suspendUser, unsuspendUser, findUserByEmailMP };