const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passport_mongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const db = require("./config/keys").mongodb.mongoURI;
const firebase = require("./config/keys").firebase;
const avaitionstack = require("./config/keys").avaitionstack;
const azure_cv = require("./config/keys").azure.cvapi;
const azure_translate = require("./config/keys").azure.translateapi;
const axios = require('axios');
const signin = require("./controllers/user/signin");
const signup = require("./controllers/user/signup");
const Schema = require("./models/user");
const userdata = require("./controllers/user/userdata");
const qrSchema = require("./models/qrcode");
const cdutySchema = require("./models/cduty");
const rentSchema = require("./models/rentcar");
const postSchema = require("./models/postcar");
const updateProfile = require("./controllers/user/updateuser");
const newQR = require("./controllers/qrcode/addqrcode");
const newItem = require("./controllers/customduty/addcustomduty");
const getQRlist = require("./controllers/qrcode/qrcodelist");
const getCdutylist = require("./controllers/customduty/customdutylist");
const scannedQRcode = require("./controllers/qrcode/qrscanned");
const scannedCduty = require("./controllers/customduty/customduty");
const translate = require("./controllers/translate/translate");
const getFlightInfo = require("./controllers/flightinfo/flightinfo");
const getUsers = require("./controllers/user/allusers");
const rentCar=require("./controllers/vehicle/rentcar")
const postCar=require("./controllers/vehicle/postcar")
const getCar=require("./controllers/vehicle/getcar")
const getprevCar=require('./controllers/vehicle/previousCar')
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const app = express();

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "MoBial API",
//       description: "Moial API Information",
//       contact: {
//         name: "Nikheel Jain"
//       },
//       servers: ["http://localhost:3001"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["./controllers/user/*.js","./controllers/customduty/*.js","./controllers/flightinfo/*.js","./controllers/qrcode/*.js","./controllers/translate/*.js","./controllers/vehicle/*.js","server.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "kuchbhi",
    resave: false,
    saveUninitialized: false,
  })
);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
Schema.plugin(passport_mongoose);
app.use(passport.initialize());
app.use(passport.session());
const User = mongoose.model("User", Schema);
const QRcode = mongoose.model("QRcode", qrSchema);
const Cduty = mongoose.model("Cduty", cdutySchema);
const PostCar=mongoose.model("PostCar", postSchema);
const RentCar=mongoose.model("RentCar", rentSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/api/firebase", (req, res) => {
  return res.json(firebase)
});
app.get('/', (req, resp) => { resp.send('working ') })
app.post('/api/signin', (req, resp) => { signin.handlesignin(req, resp, User) })
app.post('/api/signup', (req, resp) => { signup.handlesignup(req, resp, User) })
app.post('/api/userdata', (req, resp) => { userdata.userdata(req, resp, User) })
app.post('/api/update_profile', (req, resp) => { updateProfile.updateProfile(req, resp, User) })
//qr codes
app.post('/api/scan_qrcode', (req, resp) => { scannedQRcode.scannedQRcode(req, resp, User, QRcode) })
app.get('/api/get_qrcodes', (req, resp) => { getQRlist.getQRlist(req, resp, QRcode) })
app.post('/api/addqrCode', (req, resp) => { newQR.newQR(req, resp, QRcode) })
//custom duty
app.get('/api/get_cduty', (req, resp) => { getCdutylist.getCdutylist(req, resp, Cduty) })
app.post('/api/scan_cduty', (req, resp) => { scannedCduty.scannedCduty(req, resp, Cduty, azure_cv) })
app.post('/api/addcdutyitem', (req, resp) => { newItem.newItem(req, resp, Cduty) })
//translate
app.post('/api/translate', (req, resp) => { translate.translate(req, resp, azure_translate) })
//flight info
app.post('/api/flight_info', (req, resp) => { getFlightInfo.getFlightInfo(req, resp, avaitionstack.accesskey) })
app.get('/api/users', (req, resp) => { getUsers.getUsers(req, resp, User) })
//car 
app.post('/api/post_car', (req, resp) => { postCar.postCar(req, resp, PostCar) })
app.get('/api/active_car', (req, resp) => { getCar.getCar(req, resp, PostCar) })
app.post('/api/rent_car', (req, resp) => { rentCar.rentCar(req, resp, RentCar) })
app.post('/api/previous_car', (req, resp) => { getprevCar.getprevCar(req, resp, RentCar,PostCar) })

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app is runing on ${port}`);
});
