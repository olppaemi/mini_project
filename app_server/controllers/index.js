
/* GET homepage */
const home = (req, res) => {
  res.render('home', { 
    restraunts: [
      {
        name: "bhc",
        rating: 3.5,
        menu: 
        [
          {
            name: "양념치킨",
            price: "16000",
            description: "맛있는 양념치킨"
          },
          {
            name: "후라이드 치킨",
            price: "15000",
            description: "맛있는 후라이드치킨"
          }
        ]
      },
    ]
  });
}

const restrauntInfo = (req, res) => {
  res.render('home', { title: 'Restraunt info' });
}

module.exports = {
  home,
  restrauntInfo
}