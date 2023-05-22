const verifyRoles = (...allowedRoles) => {
    return(req, res, next) => {
        if(!req?.roles) return res.status(401).json({msg: 'Not Authorized'})
        const rolesArray = [...allowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)
        if(!result) return res.status(401).json({msg: 'Not Authorized'})
        next()
    }
}

module.exports = verifyRoles