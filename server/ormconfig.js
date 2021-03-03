
module.exports ={
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": 3306,
  "username": process.env.DB_USER,
  "password": process.env.DB_PWD,
  "database": "checkin",
  "entities": [
    "node_modules/@hilma/auth-nest/dist/**/*.entity{.ts,.js}",
    "dist/**/*.entity{.ts,.js}",
    "node_modules/@hilma/fileshandler-typeorm/**/*.entity.{ts,js}",
  ],
  "synchronize": true,
  logging:true
  // "ssl": true
}



