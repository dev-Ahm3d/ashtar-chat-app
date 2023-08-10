exports.pagination = req =>{
    const page = +req.query.page || 1 
    const limit = +req.query.limit  || 5
    const offset = (page - 1) * limit 
    return {limit,offset}
}