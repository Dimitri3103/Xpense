module.exports = {
    _id: '_design/role',
    views: {
        list: {
            map: function (doc) {
                if (doc._id === 'sys:roles') {
                    doc.roles.forEach(role => {
                        const { i18n: { fr, en } } = role;
                        emit(role.id, { roleId: role.roleId, id: role.id, nameFR: fr.name, nameEN: en.name, description: role.description });
                    })
                }
            }.toString()
        }
    }
}
