const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var cors = require('cors');

const Users = require("./src/models/users");
const Trips = require('./src/models/Trips');
const Logs = require('./src/models/Logs');
const Chats = require('./src/models/Chats');
const API_PORT = 3001;
const app  = express();
const router = express.Router();
var http = require('http').Server(app);
var server = app.listen(8000)
var io = require('socket.io').listen(server);

// this is our MongoDB database
const dbRoute = "mongodb+srv://admin:admin@cluster0-z8mpz.mongodb.net/RideSharingSystem?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(cors());

//USERS MODULE

router.get("/getUsers", (req, res) => {
  Users.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/addUser", (req, res) => {
  let data = new Users({
    userName: req.body.userName,
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    password: req.body.password, 
    role: req.body.role});
  data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
  });
});

router.post("/getUser", (req, res) => {
  if (req.get('Authorization') === 'Bearer RideSharer-token') {

    Users.find((err, data) => {
      data = data.filter(user => { return user.email === req.body.email && user.password === req.body.password; })
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data[0] });
    });

  } else {
      return Observable.throw('Unauthorised');
  }
})

router.post("/updateUser", (req, res) => {
  const { id, update } = req.body;
  Users.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/getUserById/:userID", (req, res) => {
  if (req.get('Authorization') === 'Bearer RideSharer-token') {
    Users.find((err, data) => {
      data = data.filter(user => user.id === req.params.userID)
      data = data.map(data => {
        return {
          _id: data._id,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role
        }
      })
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data});
    })
  } else {
    return Observable.throw('Unauthorised');
  }
})

router.get("/getUserByUsername/:userName", (req, res) => {
  if (req.get('Authorization') === 'Bearer RideSharer-token') {
    Users.find((err, data) => {
      data = data.filter(user => user.userName === req.params.userName);
      data = data.map(data => {
        return {
          _id: data._id,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role
        }
      })
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data});
    })
  } else {
    return Observable.throw('Unauthorised');
  }
})


// TRIPS MODULE

router.get("/getNewestTrips", (req, res) => {
  Trips.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data});
  })
})

router.get("/getTripByUserId/:userID", (req, res) => {
    Trips.find((err, data) => {
      data = data.filter(trip => trip.user._id == req.params.userID)
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data});
    })
})

router.get('/getTrip/:tripID', (req, res) => {
  Trips.find((err, data) => {
    data = data.filter(trip => trip._id == req.params.tripID)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data});
  })
})


router.post("/addTrip", (req, res) => {
  Users.find((err, data) => {
    let user;
    user = data.filter(user => user.userName === req.body.userID);
    console.log(user)
    user = user[0]
    let trip = new Trips({
      startAddress: req.body.trip.startAddress,
      endAddress: req.body.trip.endAddress,
      departureDate: req.body.trip.departureDate,
      roundTrip: req.body.trip.roundTrip,
      returnDate: req.body.trip.returnDate,
      passangers: req.body.trip.passangers,
      price: req.body.trip.price,
      user: {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role, //0: passneger, 1: driver, 2: admin  
      }
    });
    trip.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  })
})

// CHAT EVENTS

io.on('connect', socket => {
  userName = getCookie('UserName', socket.handshake.headers.cookie);
  userID = getCookie('UserId', socket.handshake.headers.cookie);
    let Data = new Logs ({
      userID: userID,
      user: userName,
      event: 'Connection to chat'
    })
    Data.save();
  socket.on('message', m => {
      console.log('[server](message): %s', JSON.stringify(m));
      io.emit('message', m);
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
});


router.post("/saveMessage", (req, res) => {
  Chats.find((err, data) => {
    data = data.filter(chat => chat.users == req.body.users)
    if(data.length == 0) {
      let chat = new Chats({
          users : req.body.users,
          messages: [{
              user: req.body.message.user,
              message: req.body.message.message
          }]
      });
      chat.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    } else {
      Chats.findOneAndUpdate(req.body.users, {
        messages: [...data[0].messages, {
          user: req.body.message.user,
          message: req.body.message.message
        }]
      }, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
      });
    }
  })
})

router.get("/getMessages/:users", (req, res) => {
  Chats.find((err, data) => {
    data = data.filter(chat => chat.users == req.params.users)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data});

  })
})

// FUNCTIONS

var getCookie = (name, cookie) => {
  var value = "; " + cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

/*


router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Users.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});
*/

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})*/

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
