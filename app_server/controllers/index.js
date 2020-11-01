
/* GET homepage */
const home = (req, res) => {
  res.render('home', { title: 'Express'});
}

const restrauntInfo = (req, res) => {
  res.render('home', { title: 'Restraunt info' });
}

module.exports = {
  home,
  restrauntInfo
}