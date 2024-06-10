const roles = require('../config/roles.json');

class Permission {
    constructor() {
        this.Permissions = {};
    }

    getPermissionsByRoleName(roleName) {
        const role = roles.roles.find(obj => obj.name === roleName);
        return role ? role.permissions : [];
    }
}

module.exports = Permission;