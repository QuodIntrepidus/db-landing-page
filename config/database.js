if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://utkarsh:Shimasu1@ds163164.mlab.com:63164/shimasu-beta'}
} else{
    module.exports = {mongoURI: 'mongodb://localhost:27017/shimasu-dev'}
}