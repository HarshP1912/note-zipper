const mongoose = require("mongoose");
const Note = require("./models/note.js");

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

let allNotes = [
  {
    name: "DSA",
    note: "Data Structures and Algorithms (DSA) refer to the study of methods for organizing and storing data and the design of procedures (algorithms) for solving problems, which operate on these data structures. DSA is one of the most important skills that every computer science student must have. It is often seen that people with good knowledge of these technologies are better programmers than others and thus, crack the interviews of almost every tech giant. This DSA tutorial aims to help you learn Data Structures and Algorithms (DSA) quickly and easily.",
    created_at: new Date(),
  },
  {
    name: "MERN Stack",
    note: "Web development refers to the creating, building, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. One of the most famous stack that is used for Web Development is MERN stack. This stack provides an end-to-end framework for the developers to work in and each of these technologies play a big part in the development of web applications.",
    created_at: new Date(),
  },
  {
    name: "C++",
    note: "C++ is the most used and most popular programming language developed by Bjarne Stroustrup. C++ is a high-level and object-oriented programming language. This language allows developers to write clean and efficient code for large applications and software development, game development, and operating system programming. It is an expansion of the C programming language to include Object Oriented Programming(OOPs) and is used to develop programs for computers. This C++ Tutorial will cover all the basic to advanced topics of C++ like C++ basics, C++ functions, C++ classes, OOPs and STL concepts.",
    created_at: new Date(),
  },
];

Note.insertMany(allNotes);

// Note.deleteMany({})
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
