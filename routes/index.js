var express = require("express");
var router = express.Router();


//HOMEPAGE
router.get("/", function (req, res) {
    res.render("home");
});
router.get("/contact", function (req, res) {
    res.render("contact");
});
router.get("/courses", function (req, res) {
    res.render("courses");
});
router.get("/admissions", function (req, res) {
    res.render("admissions");
});
router.get("/grades", function (req, res) {
    res.render("grades");
});
router.get("/login", function (req, res) {
    res.render("login");
});
//SHOW- DISPLAY MORE INFO ABOUT CLICKED CG
router.get("/about", function (req, res) {

    let members = [
        {
            'id': '1',
            'name': 'Ryan Tillaman',
        },
        {
            'id': '2',
            'name': 'Kirby Llano',
        },
        {
            'id': '3',
            'name': 'Clark Ramones',
        },
    ]
    res.render("about", { members: members })




});
router.get("*", function (req, res) {
    res.send("404 error not found");
});

module.exports = router;