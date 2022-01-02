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
const axios = require('axios');
const signin = require("./controllers/signin");
const signup = require("./controllers/signup");
const Schema = require("./models/user");
const userdata = require("./controllers/userdata");
const qrSchema = require("./models/qrcode");
const cdutySchema = require("./models/cduty");
const updateProfile = require("./controllers/updateuser");
const newQR = require("./controllers/addqrcode");
const newItem = require("./controllers/addcustomduty");
const getQRlist = require("./controllers/qrcodelist");
const getCdutylist = require("./controllers/customdutylist");
const scannedQRcode = require("./controllers/qrscanned");
const scannedCduty=require("./controllers/customduty");
const getFlightInfo=require("./controllers/flightinfo");

const app = express();
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
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/api/firebase", (req, res) => {
  return res.json(firebase)
});
//Routes
app.get('/', (req, resp) => { resp.send('working ') })
app.post('/api/signin', (req, resp) => { signin.handlesignin(req, resp, User) })
app.post('/api/signup', (req, resp) => { signup.handlesignup(req, resp, User) })
app.post('/api/userdata', (req, resp) => { userdata.userdata(req, resp, User) })
app.post('/api/addqrCode', (req, resp) => { newQR.newQR(req, resp, QRcode) })
app.post('/api/addcdutyitem', (req, resp) => { newItem.newItem(req, resp, Cduty) })
app.post('/api/update_profile', (req, resp) => { updateProfile.updateProfile(req, resp, User) })
app.post('/api/scan_qrcode', (req, resp) => { scannedQRcode.scannedQRcode(req, resp, User,QRcode) })
app.get('/api/get_qrcodes', (req, resp) => { getQRlist.getQRlist(req, resp, QRcode) })
app.get('/api/get_cduty', (req, resp) => { getCdutylist.getCdutylist(req, resp, Cduty) })
app.post('/api/scan_cduty', (req, resp) => { scannedCduty.scannedCduty(req, resp,Cduty) })
app.post('/api/flight_info', (req, resp) => { getFlightInfo.getFlightInfo(req, resp,avaitionstack.accesskey) })


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app is runing on ${port}`);
});
