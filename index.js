const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Note = require("./models/note.js");
var methodOverride = require("method-override");
const port = 5000;
const ExpressError = require("./ExpressError");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/notezipper");
}

//INDEX ROUTE
app.get("/notes", async (req, res) => {
  try {
    let notes = await Note.find();
    // console.log(notes);
    res.render("index.ejs", { notes });
  } catch (err) {
    next(err);
  }
});

//NEW ROUTE
app.get("/notes/new", (req, res) => {
  // throw new ExpressError(404, "Page not found");
  try {
    res.render("new.ejs");
  } catch (err) {
    next(err);
  }
});

// CREATE ROUTE
app.post("/notes", async (req, res, next) => {
  try {
    let { name, note } = req.body;
    let newNote = new Note({
      name: name,
      note: note,
      created_at: new Date(),
    });
    await newNote.save();
    res.redirect("/notes");
  } catch (err) {
    next(err);
  }
});

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

//NEW - Show Route
app.get(
  "/notes/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let notes = await Note.findById(id);
    if (!notes) {
      return next(new ExpressError(404, "Note not found"));
    }
    res.render("show.ejs", { notes });
  })
);

//EDIT ROUTE
app.get(
  "/notes/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let notes = await Note.findById(id);
    res.render("edit.ejs", { notes });
  })
);

// UPDATE ROUTE
app.put(
  "/notes/:id",
  asyncWrap(async (req, res) => {
    let { note } = req.body;
    let { id } = req.params;

    // Set updated_at to current date
    let updated_at = new Date();

    let updated_Note = await Note.findByIdAndUpdate(
      id,
      { note: note, updated_at: updated_at },
      { runValidators: true, new: true }
    );

    res.redirect("/notes");
  })
);

// DELETE ROUTE
app.delete(
  "/notes/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    let deleted_Note = await Note.findByIdAndDelete({ _id: id });
    res.redirect("/notes");
  })
);

app.get("/", (req, res) => {
  res.send("Working Root");
});

const handleValidationError = (err) => {
  console.log("Validation Error Occured");
  return err;
};

//Middleware for Validation Error
app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name == "ValidationError") {
    err = handleValidationError(err);
  }
  next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "SOME ERROR" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`app is listening to ${port}`);
});
